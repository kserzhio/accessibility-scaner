'use client'
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "react-toastify"
interface Project {
    id: string
    name: string
}

interface User {
    id: string
    email: string
    name: string | null
}

interface ProjectMember {
    user: User
}
export default function ProjectAccessPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [selectedProject, setSelectedProject] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("")
    const [members, setMembers] = useState<ProjectMember[]>([])

    useEffect(() => {
        fetch("/api/projects")
            .then(res => res.json())
            .then(data => setProjects(data.projects))
    }, [])

    useEffect(() => {
        if (!selectedProject) return
        fetch(`/api/projects/${selectedProject}/members`)
            .then(res => res.json())
            .then(data => setMembers(data.members))
    }, [selectedProject])

    const handleAdd = async () => {
        if (!selectedProject || !userEmail) return

        const res = await fetch("/api/projects/access/assign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projectId: selectedProject, userEmail })
        })

        if (res.ok) {
            toast.success('User added')
            setUserEmail("")
            const updated = await res.json()
            setMembers(prev => [...prev, updated.result])
        } else {
            toast.error('Failed to add user')
        }
    }

    const handleRemove = async (userId: string) => {
        const res = await fetch("/api/projects/access/remove", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projectId: selectedProject, userId })
        })

        if (res.ok) {
            toast.success('Remove User Success')
            setMembers(prev => prev.filter(m => m.user.id !== userId))
        } else {
            toast.error('Failed to remove user')
        }
    }

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
