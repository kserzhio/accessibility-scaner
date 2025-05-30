'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { ArrowLeft, Plus } from 'lucide-react'
import { ProjectLineChart } from 'components/charts/ProjectLineChart'
import { ProjectPieChart } from 'components/charts/ProjectPieChart'
import { useQuery } from '@tanstack/react-query'
import { fetchProjectSummary } from 'services/api/projectService'

export default function ProjectPage() {
    const { projectId } = useParams() as { projectId: string }
    const { data = null, isLoading, error } = useQuery({
        queryKey: ['projectSummary', projectId],
        queryFn: () => fetchProjectSummary(projectId),
        enabled: !!projectId,
    });

    if (isLoading) return <div className="p-4">Loading summary...</div>;

    const { project, stats } = data
    const getColor = (score: number) => {
        if (score < 50) return 'bg-red-500'
        if (score < 75) return 'bg-yellow-400'
        return 'bg-green-500'
    }
    return (
        <div className="max-w-7xl mx-auto mt-10 space-y-10 pb-8">
            <div className="flex justify-between items-left gap-3">
                <Link href="/admin/projects">
                    <Button variant="ghost" size="sm" className='cursor-pointer'>
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to all projects
                    </Button>
                </Link>
                <Link href={`/admin/projects/${project.id}/pages`}>
                    <Button variant="outline" size="sm" className='cursor-pointer'>
                        <Plus /> Add Page To The Project
                    </Button>
                </Link>
            </div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProjectLineChart data={stats.history} />
                <div className="space-y-4 bg-white dark:bg-gray-950 p-4 rounded-md shadow-sm flex items-start">
                    <div className='w-full'>
                        <ProjectPieChart data={stats.violationsByImpact} />
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-2 py-4 w-2xs">
                        {Object.entries(stats.violationsByImpact).map(([impact, count]) => (
                            <li key={impact}>
                                <span className="font-medium">{impact}:</span> {count} violations
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <div className="bg-muted p-4 rounded-md">
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Project slug:</span> {project.slug}
                </p>
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Total pages:</span> {project.pages.length}
                </p>
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Created:</span>{' '}
                    {new Date(project.createdAt).toLocaleDateString()}
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Page Compliance</h2>
                <table className="w-full text-sm border">
                    <thead className="bg-muted">
                        <tr>
                            <th className="text-left p-2">Page URL</th>
                            <th className="text-left p-2">Score</th>
                            <th className="text-left p-2">Issues</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.pages.map((p: any) => (
                            <tr key={p.id} className="border-t">
                                <td className="p-2 max-w-md truncate text-blue-600">{p.url}</td>
                                <td className="p-2">
                                    <div className="flex items-center gap-2">
                                        <div className="relative w-full max-w-[120px] h-3 bg-gray-200 rounded">
                                            <div
                                                className={`absolute top-0 left-0 h-full rounded ${getColor(p.complianceScore)}`}
                                                style={{ width: `${p.complianceScore}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium w-10 text-right">
                                            {p.complianceScore}%
                                        </span>
                                    </div>
                                </td>
                                <td className="p-2">{p.issuesCount}</td>
                                <td className="p-2">
                                    <Link href={`/admin/projects/${projectId}/pages/${p.id}`}>Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
