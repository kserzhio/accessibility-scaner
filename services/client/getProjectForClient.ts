import { prisma } from 'lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function getProjectForClient(req: NextRequest) {
    const token = await getToken({ req });
    const userEmail = token?.email;

    if (!userEmail) throw new Error('Unauthorized');

    const access = await prisma.projectAccess.findFirst({
        where: { user: { email: userEmail } },
        include: {
            project: true,
        },
    });

    if (!access) throw new Error('No project assigned');

    return {
        projectId: access.project.id,
        projectName: access.project.name,
        status: access.project.status,
    };
}
