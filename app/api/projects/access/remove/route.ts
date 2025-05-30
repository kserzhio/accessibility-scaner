
import { NextRequest } from 'next/server';
import { ProjectAccessService } from 'services/db/ProjectAccessService';

export async function DELETE(req: NextRequest) {
    const { projectId, userId } = await req.json();
    await ProjectAccessService.removeUserFromProject(projectId, userId);
    return Response.json({ success: true });
}
