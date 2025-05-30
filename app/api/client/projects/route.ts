
import { NextRequest, NextResponse } from 'next/server';
import { getProjectForClient } from 'services/client/getProjectForClient';

export async function GET(req: NextRequest) {
    try {
        const project = await getProjectForClient(req);
        return NextResponse.json(project);
    } catch (error) {
        console.error('[CLIENT_PROJECT_ERROR]', error);
        return new NextResponse('Unauthorized', { status: 401 });
    }
}