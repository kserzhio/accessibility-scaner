import { NextResponse } from 'next/server';
import { projectService } from 'services/db/projectService';


export async function POST(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        const projectId = params.projectId;
        const result = await projectService.completeProject(projectId);
        return NextResponse.json({ success: true, project: result });
    } catch (error) {
        console.error('[POST /api/projects/[projectId]/complete]', error);
        return NextResponse.json({ success: false, error: 'Failed to complete project' }, { status: 500 });
    }
}
