
import { NextResponse } from 'next/server';
import { getClientPagesWithScore } from 'services/client/getClientPagesWithScore';

export async function GET(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    const projectId = params.projectId;

    try {
        const pages = await getClientPagesWithScore(projectId);
        return NextResponse.json({ pages });
    } catch (error) {
        console.error('[PAGES_API_ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}