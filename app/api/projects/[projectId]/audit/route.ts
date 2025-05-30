import { NextRequest, NextResponse } from 'next/server';
import { getAuditCriteriaForProject } from 'services/db/auditService';

export async function GET(
    req: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        const projectId = params.projectId;
        const data = await getAuditCriteriaForProject(projectId);
        return NextResponse.json({ success: true, criteria: data });
    } catch (error) {
        console.error('[GET /api/projects/[projectId]/audit]', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch audit data' }, { status: 500 });
    }
}
