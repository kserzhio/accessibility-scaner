import { z } from 'zod'

export const createProjectSchema = z.object({
    name: z.string().min(3, 'Project name is required'),
    slug: z.string().min(3, 'Slug is required'),
    client: z.string().min(2, 'Client is required'),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH'], {
        required_error: 'Priority is required',
    }),
    type: z.string().min(2, 'Type is required'),
    endDate: z.string().refine(
        (date) => !isNaN(Date.parse(date)),
        { message: 'End date must be a valid date' }
    ),
    pages: z.array(z.string().url('Invalid URL')).min(1, 'Add at least one page'),
});

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>