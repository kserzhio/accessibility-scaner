
import { NextResponse } from 'next/server';
import { getClientProjectSummary } from 'services/client/projectSummaryService';

export async function GET(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    const projectId = params.projectId;

    try {
        const summary = await getClientProjectSummary(projectId);
        return NextResponse.json(summary);
    } catch (error) {
        console.error('[SUMMARY_ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}