import { ProjectAccessService } from "services/db/ProjectAccessService";

export async function POST(req: Request) {
    const { userId, projectId } = await req.json();
    const result = await ProjectAccessService.assignUserToProject(userId, projectId);
    return Response.json({ success: true, result });
}
export async function DELETE(req: Request) {
    const { userId, projectId } = await req.json();
    await ProjectAccessService.removeUserFromProject(userId, projectId);
    return Response.json({ success: true });
}