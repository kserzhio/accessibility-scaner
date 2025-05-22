import { prisma } from 'lib/prisma'


export const ProjectAccessService = {
    async getAllProjects() {
        return await prisma.project.findMany({
            select: { id: true, name: true }
        });
    },

    async getProjectMembers(projectId: string) {
        return await prisma.projectAccess.findMany({
            where: { projectId },
            include: { user: true },
        });
    },

    async assignUserToProject(projectId: string, userEmail: string) {
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });
        if (!user) throw new Error('User not found');

        const existing = await prisma.projectAccess.findFirst({
            where: { userId: user.id, projectId },
        });
        if (existing) throw new Error('User already has access');

        return await prisma.projectAccess.create({
            data: { userId: user.id, projectId },
            include: { user: true },
        });
    },

    async removeUserFromProject(projectId: string, userId: string) {
        return await prisma.projectAccess.deleteMany({
            where: { projectId, userId },
        });
    }
};