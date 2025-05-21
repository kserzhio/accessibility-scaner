import { NextResponse } from 'next/server'
import { projectService } from 'services/projectService'

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const project = await projectService.createProject(data)

        return NextResponse.json({ project }, { status: 201 })
    } catch (error: any) {
        if (error?.format) {
            return NextResponse.json({ error: error.format() }, { status: 400 })
        }

        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}