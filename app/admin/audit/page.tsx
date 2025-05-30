'use client'
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from 'services/api/projectService';

export default function AuditProjectsListPage() {
    const { data: projects = [], isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
    });

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-600">Error loading projects</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Accessibility Audit</h1>
            <p className="text-muted-foreground">Select a project to begin auditing its accessibility conformance.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="p-4 flex flex-col justify-between">
                        <CardContent className="space-y-2">
                            <h3 className="text-lg font-semibold">{project.name}</h3>
                            <p className="text-sm text-muted-foreground">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                            <Button asChild className="mt-2 w-full justify-between">
                                <Link href={`/admin/audit/${project.id}`}>
                                    Audit this project <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}