
import { NextResponse } from 'next/server'
import { prisma } from 'lib/prisma'
import { analyzeWithCache } from 'services/scanService'


export async function POST(
    req: Request,
    { params }: { params: { pageId: string } }
) {
    try {
        const page = await prisma.page.findUnique({
            where: { id: params.pageId },
            include: { project: true },
        })

        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 })
        }

        const result = await analyzeWithCache(page, page.project.slug)
        return NextResponse.json({ result })
    } catch (error) {
        console.error('Single page scan error:', error)
        return NextResponse.json({ error: 'Scan failed' }, { status: 500 })
    }
}
