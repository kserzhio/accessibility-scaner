'use client'
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useParams } from 'next/navigation';

export default function EditProjectPage() {
    const { projectId } = useParams() as { projectId: string; }

    const [form, setForm] = useState({
        name: '',
        client: '',
        type: '',
        priority: 'MEDIUM',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (!projectId) return;
        fetch(`/api/projects/${projectId}`)
            .then(res => res.json())
            .then(data => setForm(data.project));
    }, [projectId]);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        await fetch(`/api/projects/${projectId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        router.push('/admin/projects');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
            <h1 className="text-2xl font-semibold">Edit Project</h1>

            <Input
                placeholder="Project name"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
            />

            <Input
                placeholder="Client name"
                value={form.client}
                onChange={e => handleChange('client', e.target.value)}
            />

            <Input
                placeholder="Project type"
                value={form.type}
                onChange={e => handleChange('type', e.target.value)}
            />

            <Select value={form.priority} onValueChange={value => handleChange('priority', value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                </SelectContent>
            </Select>

            <Input
                type="date"
                value={form.startDate?.split('T')[0]}
                onChange={e => handleChange('startDate', e.target.value)}
            />

            <Input
                type="date"
                value={form.endDate?.split('T')[0]}
                onChange={e => handleChange('endDate', e.target.value)}
            />

            <Button onClick={handleSave}>Save</Button>
        </div>
    );
}
