
import { NextResponse } from 'next/server';
import { getClientPageScanDetails } from 'services/client/getClientPageScanDetails';

export async function GET(
    req: Request,
    { params }: { params: { pageId: string } }
) {
    const pageId = params.pageId;

    try {
        const scanResult = await getClientPageScanDetails(pageId);
        return NextResponse.json({ scanResult });
    } catch (error) {
        console.error('[SCAN_DETAILS_ERROR]', error);
        return new NextResponse('Not Found', { status: 404 });
    }
}