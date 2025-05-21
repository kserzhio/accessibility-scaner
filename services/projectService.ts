import { prisma } from 'lib/prisma'
import { createProjectSchema } from 'lib/validators/createProjectSchema'

export const projectService = {
    async createProject(data: unknown) {
        const parsed = createProjectSchema.safeParse(data)
        if (!parsed.success) {
            throw parsed.error
        }

        const { name, slug, pages } = parsed.data

        return await prisma.project.create({
            data: {
                name,
                slug,
                pages: {
                    create: pages.map((url) => ({
                        url,
                        slug: url.replace(/https?:\/\//, '').replace(/[^\w]/g, '-'),
                    })),
                },
            },
            include: { pages: true },
        })
    },
    async addPageToProject(projectId: string, url: string) {
        const slug = url.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-')

        return await prisma.page.create({
            data: {
                url,
                slug,
                status: 'PENDING',
                projectId,
            },
        })
    },
    async getAllProjects() {
        return prisma.project.findMany({
            include: { pages: true },
            orderBy: { createdAt: 'desc' },
        })
    },

    async getProjectById(projectId: string) {
        return prisma.project.findUnique({
            where: { id: projectId },
            include: { pages: true },
        })
    },

    async getProjectBySlug(slug: string) {
        return prisma.project.findUnique({
            where: { slug },
            include: { pages: true },
        })
    },

    async deleteProject(projectId: string) {
        return prisma.project.delete({
            where: { id: projectId },
        })
    },
    async getProjectSummary(projectId: string) {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                pages: {
                    include: {
                        scanResults: {
                            include: { violations: true },
                            orderBy: { createdAt: 'desc' },
                            take: 1,
                        },
                    },
                },
            },
        })

        if (!project) throw new Error('Project not found')

        const pages = project.pages.map((page) => {
            const latest = page.scanResults[0]
            const issuesCount = latest?.violations.length || 0

            const impactWeights: Record<string, number> = {
                CRITICAL: 4,
                SERIOUS: 3,
                MODERATE: 2,
                MINOR: 1,
            }

            const totalWeight = latest?.violations.reduce((sum, v) => sum + (impactWeights[v.impact] || 0), 0) || 0
            const complianceScore = Math.max(0, 100 - totalWeight * 2)

            return {
                id: page.id,
                url: page.url,
                complianceScore,
                issuesCount,
                scanDate: latest?.createdAt || null,
            }
        })

        const history = pages.map((p) => ({
            url: p.url,
            date: p.scanDate,
            compliance: p.complianceScore,
        })).filter((d) => d.date)

        const violationsByImpact = project.pages.flatMap((p) => p.scanResults[0]?.violations || [])
            .reduce((acc: Record<string, number>, v) => {
                acc[v.impact] = (acc[v.impact] || 0) + 1
                return acc
            }, {})

        return {
            project: {
                id: project.id,
                name: project.name,
                slug: project.slug,
                createdAt: project.createdAt,
                pages: project.pages,
            },
            stats: {
                pages,
                history,
                violationsByImpact,
            },
        }
    },
    async getPageScanDetails(pageId: string) {
        const page = await prisma.page.findUnique({
            where: { id: pageId },
            include: {
                scanResults: {
                    include: { violations: true },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        })

        if (!page || !page.scanResults[0]) {
            throw new Error('Scan not found')
        }

        const scan = page.scanResults[0]

        const impactWeights: Record<string, number> = {
            CRITICAL: 4,
            SERIOUS: 3,
            MODERATE: 2,
            MINOR: 1,
        }

        const totalWeight = scan.violations.reduce((sum, v) => sum + (impactWeights[v.impact] || 0), 0)
        const score = Math.max(0, 100 - totalWeight * 2)

        return {
            id: scan.id,
            createdAt: scan.createdAt,
            page: { id: page.id, url: page.url },
            totalIssues: scan.violations.length,
            score,
            violations: scan.violations,
        }
    },
}
