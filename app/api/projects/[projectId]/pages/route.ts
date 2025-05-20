// app/api/projects/[projectId]/pages/route.ts

import { prisma } from 'lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const pages = await prisma.page.findMany({
            where: { projectId: params.projectId },
            orderBy: { createdAt: 'asc' },
        })

        return NextResponse.json({ pages })
    } catch (e) {
        return NextResponse.json({ error: 'Failed to load pages' }, { status: 500 })
    }
}
