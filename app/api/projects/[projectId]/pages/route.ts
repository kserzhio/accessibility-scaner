import { prisma } from 'lib/prisma'
import { NextResponse } from 'next/server'
import { projectService } from 'services/projectService'

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
export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const body = await req.json()
    const { url } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    const page = await projectService.addPageToProject(params.projectId, url)
    return NextResponse.json({ page })
  } catch (error) {
    console.error('Failed to add page:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
