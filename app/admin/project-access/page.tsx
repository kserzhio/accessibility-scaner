'use client'
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { fetchProjects, fetchProjectMembers, removeUserFromProject, assignUserToProject } from 'services/api/projectService';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export default function ProjectAccessPage() {
    const [selectedProject, setSelectedProject] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');

    const {
        data: projects = [],
        isLoading: loadingProjects,
    } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
    });

    const {
        data: members = [],
        isLoading: loadingMembers,
        refetch: refetchMembers,
    } = useQuery({
        queryKey: ['projectMembers', selectedProject],
        queryFn: () => fetchProjectMembers(selectedProject),
        enabled: !!selectedProject,
    });

    const handleAdd = async () => {
        if (!selectedProject || !userEmail) return;

        try {
            await assignUserToProject(selectedProject, userEmail);
            toast.success('User added');
            setUserEmail('');
            await refetchMembers();
        } catch (error: any) {
            toast.error(error.message || 'Failed to add user');
        }
    };

    const handleRemove = async (userId: string) => {
        try {
            await removeUserFromProject(selectedProject, userId);
            toast.success('Remove User Success');
            await refetchMembers();
        } catch (error: any) {
            toast.error(error.message || 'Failed to remove user');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Add user to the project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select onValueChange={setSelectedProject}>
                            <SelectTrigger>
                                <SelectValue placeholder="Виберіть проєкт" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.map(project => (
                                    <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Input
                            type="email"
                            placeholder="Email User"
                            value={userEmail}
                            onChange={e => setUserEmail(e.target.value)}
                        />

                        <Button onClick={handleAdd} disabled={!selectedProject || !userEmail}>
                            Add User
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {selectedProject && (
                <Card>
                    <CardHeader>
                        <CardTitle>Project participants</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.length > 0 ? members.map(({ user }) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.name || "—"}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="destructive" size="sm" onClick={() => handleRemove(user.id)}>
                                                Remove User
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center">Empty</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
