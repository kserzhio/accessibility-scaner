// app/api/projects/[projectId]/scan/route.ts

import { NextResponse } from 'next/server'
import { scanProjectPages } from 'services/scanService'

export async function POST(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const results = await scanProjectPages(params.projectId)
        return NextResponse.json({ results })
    } catch (error) {
        return NextResponse.json({ error: 'Scan failed' }, { status: 500 })
    }
}
