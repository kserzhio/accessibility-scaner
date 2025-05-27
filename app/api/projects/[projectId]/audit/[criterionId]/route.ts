import { NextRequest, NextResponse } from 'next/server';
import { saveAuditResult } from 'services/auditService';

export async function POST(
  req: NextRequest,
  { params }: { params: { projectId: string; criterionId: string } }
) {
  try {
    const projectId = params.projectId;
    const criterionId = params.criterionId;
    const { outcome, observations } = await req.json();

    const result = await saveAuditResult({
      projectId,
      criterionId,
      outcome,
      observations
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('[POST /api/projects/[projectId]/audit/[criterionId]]', error);
    return NextResponse.json({ success: false, error: 'Failed to save audit result' }, { status: 500 });
  }
}