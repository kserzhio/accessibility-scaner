'use client'
import { useQuery } from '@tanstack/react-query';
import { ProjectsTable } from "components/ui/ProjectsTable";
import { CreateProjectDrawer } from "components/ui/CreateProjectDrawer";
import { Skeleton } from '@/components/ui/skeleton';
import { fetchProjects } from 'services/api/projectService';
export default function ProjectsPage() {
    const { data: projects, isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
    });
    if (isLoading) {
        return (
            <div className="p-4 space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        );
    }
    if (error) {
        return (
            <div className="p-4 text-red-600">⚠️ Error loading projects. Try again later.</div>
        );
    }
    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Projects</h1>
                <CreateProjectDrawer onCreated={() => window.location.reload()} />
            </div>
            <ProjectsTable projects={projects} />
        </div>
    );
}
