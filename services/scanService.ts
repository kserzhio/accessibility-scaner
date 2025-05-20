// lib/services/scanService.ts

import { prisma } from 'lib/prisma'
import { Page, Violation, ImpactLevel } from '@prisma/client'
import path from 'path'
import fs from 'fs/promises'
import { launch } from 'puppeteer'

function getScreenshotPath(projectSlug: string, pageSlug: string, timestamp: string, i: number): string {
    return path.join(
        'public',
        'screenshots',
        projectSlug,
        pageSlug,
        timestamp,
        `error-${i}.png`
    )
}

export async function analyzeWithCache(page: Page, projectSlug: string) {
    const browser = await launch()
    const pageInstance = await browser.newPage()

    try {
        await pageInstance.goto(page.url, { waitUntil: 'networkidle2' })

        await pageInstance.addScriptTag({
            url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js',
        })

        const results = await pageInstance.evaluate(async () => {
            // @ts-ignore
            return await window.axe.run(document)
        })

        const current = results.violations.map(v => ({
            impact: v.impact?.toUpperCase() as ImpactLevel,
            description: v.description,
            helpUrl: v.helpUrl,
            selector: typeof v.nodes[0].target?.[0] === 'string'
                ? v.nodes[0].target[0]
                : JSON.stringify(v.nodes[0].target?.[0] ?? 'unknown'),
        }))

        const latestScan = await prisma.scanResult.findFirst({
            where: { pageId: page.id },
            orderBy: { createdAt: 'desc' },
            include: { violations: true },
        })

        const isSame =
            latestScan &&
            JSON.stringify(latestScan.violations.map(v => v.selector).sort()) ===
            JSON.stringify(current.map(v => v.selector).sort())

        if (isSame) {
            console.log(`No changes for ${page.url}`)
            return null
        }

        const timestamp = Date.now().toString()
        const screenshotDir = path.join('public', 'screenshots', projectSlug, page.slug, timestamp)
        await fs.mkdir(screenshotDir, { recursive: true })

        const scanResult = await prisma.scanResult.create({
            data: {
                pageId: page.id,
                screenshotPath: screenshotDir,
                complianceScore: 0, // TODO: compute compliance
                violations: {
                    create: await Promise.all(
                        current.map(async (v, i) => {
                            const screenshotPath = getScreenshotPath(projectSlug, page.slug, timestamp, i)
                            await pageInstance.screenshot({ path: screenshotPath })

                            return {
                                screenshotPath,
                                impact: v.impact,
                                description: v.description,
                                helpUrl: v.helpUrl,
                                selector: v.selector,
                            }
                        })
                    ),
                },
            },
        })

        return scanResult
    } catch (error) {
        console.error(`Error scanning page ${page.url}:`, error)
        throw error
    } finally {
        await browser.close()
    }
}

export async function scanProjectPages(projectId: string) {
    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: { pages: true },
        })
        if (!project) throw new Error('Project not found')

        const results = []
        for (const page of project.pages) {
            try {
                const result = await analyzeWithCache(page, project.slug)
                if (result) results.push(result)
            } catch (e) {
                console.error(`Failed to scan ${page.url}`, e)
            }
        }

        return results
    } catch (error) {
        console.error('scanProjectPages error:', error)
        throw error
    }
}