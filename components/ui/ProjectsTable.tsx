'use client'
import { useState, useMemo } from 'react';
import { MoreVertical } from 'lucide-react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Project {
    id: string;
    name: string;
    client?: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
    type?: string;
    createdAt?: string;
    endDate?: string;
    status: 'in_progress' | 'completed';
}

interface ProjectsTableProps {
    projects: Project[];
}
const formatStatus = (status: string) => {
    switch (status) {
        case 'in_progress':
            return 'In Progress';
        case 'completed':
            return 'Completed';
        default:
            return status;
    }
};
const statusBarColor = {
    in_progress: 'bg-yellow-500',
    completed: 'bg-green-500',
};
export function ProjectsTable({ projects }: ProjectsTableProps) {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    const filteredProjects = useMemo(() => {
        return projects.filter((p) => {
            const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                (p.client?.toLowerCase().includes(search.toLowerCase()) ?? false);
            const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [projects, search, statusFilter]);

    const statusColor = {
        in_progress: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-green-100 text-green-800',
    };
    const handleEdit = (id: string) => {
        router.push(`/admin/projects/${id}/edit`);
    };
    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <Input
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                <div className='flex gap-2 items-baseline'>
                    <span>Filter By:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border px-3 py-2 rounded text-sm"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredProjects.map((p) => (
                        <TableRow key={p.id}>
                            <TableCell>
                                <Link href={`/admin/projects/${p.id}`} className="text-blue-600 hover:underline font-medium">
                                    {p.name}
                                </Link>
                            </TableCell>
                            <TableCell>{p.client || '-'}</TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={p.priority === 'HIGH' ? 'text-red-700' : p.priority === 'MEDIUM' ? 'text-yellow-700' : 'text-green-700'}
                                >
                                    {p.priority || '-'}
                                </Badge>
                            </TableCell>
                            <TableCell>{p.type || '-'}</TableCell>
                            <TableCell>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '-'}</TableCell>
                            <TableCell>{p.endDate ? new Date(p.endDate).toLocaleDateString() : '-'}</TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <div className="text-xs font-medium">
                                        {formatStatus(p.status)}
                                    </div>
                                    <div className={`rounded-full w-[70px] h-[5px] ${statusBarColor[p.status] || 'bg-gray-300'}`} />
                                </div>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="text-muted-foreground hover:text-black">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleEdit(p.id)}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => alert('Delete ' + p.id)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
