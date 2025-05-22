
import { NextRequest } from 'next/server';
import { ProjectAccessService } from 'services/ProjectAccessService';

export async function POST(req: NextRequest) {
    try {
        const { projectId, userEmail } = await req.json();
        const access = await ProjectAccessService.assignUserToProject(projectId, userEmail);
        return Response.json({ result: access });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
        });
    }
}