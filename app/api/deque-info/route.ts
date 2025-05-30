import { NextRequest, NextResponse } from 'next/server'
import { dequeService } from 'services/db/dequeService'

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url')

    if (!url) {
        return NextResponse.json({ error: 'Invalid or missing URL' }, { status: 400 })
    }

    try {
        const data = await dequeService.parseDequePage(url)
        return NextResponse.json(data)
    } catch (error) {
        console.error('Deque parser error:', error)
        return NextResponse.json({ error: 'Failed to parse content' }, { status: 500 })
    }
}
