// lib/services/projectService.ts
import { prisma } from 'lib/prisma'
import { createProjectSchema } from 'lib/validators/createProjectSchema'

export const projectService = {
    async createProject(data: unknown) {
        const parsed = createProjectSchema.safeParse(data)
        if (!parsed.success) {
            throw parsed.error
        }

        const { name, slug, pages } = parsed.data

        return await prisma.project.create({
            data: {
                name,
                slug,
                pages: {
                    create: pages.map((url) => ({
                        url,
                        slug: url.replace(/https?:\/\//, '').replace(/[^\w]/g, '-'),
                    })),
                },
            },
            include: { pages: true },
        })
    },

    async getAllProjects() {
        return prisma.project.findMany({
            include: { pages: true },
            orderBy: { createdAt: 'desc' },
        })
    },

    async getProjectById(projectId: string) {
        return prisma.project.findUnique({
            where: { id: projectId },
            include: { pages: true },
        })
    },

    async getProjectBySlug(slug: string) {
        return prisma.project.findUnique({
            where: { slug },
            include: { pages: true },
        })
    },

    async deleteProject(projectId: string) {
        return prisma.project.delete({
            where: { id: projectId },
        })
    },
}
