import { projectService } from 'services/projectService'
import Link from 'next/link'
import { Badge } from 'components/ui/badge'

export default async function ProjectsPage() {
    const projects = await projectService.getAllProjects()

    return (
        <div className="max-w-5xl mx-auto mt-10 space-y-6">
            <h1 className="text-2xl font-semibold">All Projects</h1>

            {projects.length === 0 ? (
                <p className="text-muted-foreground">No projects found.</p>
            ) : (
                <div className="grid gap-4">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/admin/projects/${project.id}/pages`}
                            className="block border border-border p-4 rounded-md hover:bg-muted transition"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">{project.name}</h2>
                                    <p className="text-sm text-muted-foreground">/{project.slug}</p>
                                </div>
                                <Badge variant="outline">
                                    {project.pages.length} page{project.pages.length !== 1 && 's'}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Created at: {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
