
import { NextRequest } from 'next/server';
import { ProjectAccessService } from 'services/db/ProjectAccessService';

export async function GET(
    req: NextRequest,
    { params }: { params: { projectId: string } }
) {
    const members = await ProjectAccessService.getProjectMembers(params.projectId);
    return Response.json({ members });
}
