import { z } from 'zod'

export const createProjectSchema = z.object({
    name: z.string().min(3, 'Project name is required'),
    slug: z.string().min(3, 'Slug is required'),
    pages: z.array(z.string().url('Invalid URL')).min(1, 'Add at least one page'),
})

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>