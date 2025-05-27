'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuditAccordion } from 'components/audit/AuditAccordion';
import { AuditSidebar } from 'components/audit/AuditSidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';

interface Criterion {
    id: string;
    title: string;
    level: 'A' | 'AA' | 'AAA';
    principle: 'PERCEIVABLE' | 'OPERABLE' | 'UNDERSTANDABLE' | 'ROBUST';
    description: string;
    understandingUrl: string;
    howToMeetUrl: string;
    outcome?: string;
    observations?: string;
}

export default function AuditPage() {
    const pathname = usePathname();
    const projectId = pathname.split('/').pop();

    const [criteria, setCriteria] = useState<Criterion[]>([]);
    const [levelFilter, setLevelFilter] = useState<'A' | 'AA' | 'AAA' | 'ALL'>('ALL');

    useEffect(() => {
        if (!projectId) return;
        fetch(`/api/projects/${projectId}/audit`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setCriteria(data.criteria);
            });
    }, [projectId]);

    const handleUpdate = async (id: string, update: { outcome: string; observations: string }) => {
        setCriteria(prev => prev.map(c => c.id === id ? { ...c, ...update } : c));

        try {
            await fetch(`/api/projects/${projectId}/audit/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(update),
            });
            toast.success('Saved successfully');
        } catch (error) {
            toast.error('Error successfully');
            console.error('Failed to save audit result:', error);
        }
    };

    const filteredCriteria = criteria.filter(c => levelFilter === 'ALL' || c.level === levelFilter);

    const calculateStats = () => {
        const stats = {
            PERCEIVABLE: 0,
            OPERABLE: 0,
            UNDERSTANDABLE: 0,
            ROBUST: 0,
            total: criteria.length,
            completed: 0,
        };
        for (const c of criteria) {
            if (c.outcome && c.outcome !== 'NOT_CHECKED') {
                stats[c.principle] += 1;
                stats.completed += 1;
            }
        }
        return stats;
    };

    return (
        <div className="flex gap-6">
            <div className="w-full md:w-2/3 lg:w-3/4">
                <div className="mb-4">
                    <Select defaultValue={levelFilter} onValueChange={(value) => setLevelFilter(value as any)}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Levels</SelectItem>
                            <SelectItem value="A">Level A</SelectItem>
                            <SelectItem value="AA">Level AA</SelectItem>
                            <SelectItem value="AAA">Level AAA</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <AuditAccordion criteria={filteredCriteria} onChange={handleUpdate} />
            </div>
            <div className="hidden md:block md:w-1/3 lg:w-1/4">
                <AuditSidebar stats={calculateStats()} projectId={projectId!}/>
            </div>
        </div>
    );
}
