import { NextResponse } from 'next/server'
import { projectService } from 'services/projectService'

export async function GET(
    req: Request,
    { params }: { params: { projectId: string; pageId: string } }
) {
    try {
        const scanResult = await projectService.getPageScanDetails(params.pageId)
        return NextResponse.json({ scanResult })
    } catch (error) {
        console.error('Error loading scan details:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
