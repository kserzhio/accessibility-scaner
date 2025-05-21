import { NextResponse } from 'next/server'
import { projectService } from 'services/projectService'

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const summary = await projectService.getProjectSummary(params.projectId)
    return NextResponse.json(summary)
  } catch (error) {
    console.error('Summary API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
