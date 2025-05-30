'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuditAccordion } from 'components/audit/AuditAccordion';
import { AuditSidebar } from 'components/audit/AuditSidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAuditCriteria, updateAuditCriterion } from 'services/api/projectService';

export interface Criterion {
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

type OutcomeUpdate = {
    outcome: string;
    observations: string;
};

export default function AuditPage() {
    const pathname = usePathname();
    const projectId = pathname.split('/').pop();
    const [levelFilter, setLevelFilter] = useState<'A' | 'AA' | 'AAA' | 'ALL'>('ALL');

    const queryClient = useQueryClient();

    const {
        data: criteria = [],
        isLoading,
        error,
    } = useQuery<Criterion[]>({
        queryKey: ['auditCriteria', projectId],
        queryFn: () => fetchAuditCriteria(projectId!),
        enabled: !!projectId,
    });

    const mutation = useMutation({
        mutationFn: ({ id, update }: { id: string; update: OutcomeUpdate }) =>
            updateAuditCriterion(projectId!, id, update),
        onMutate: async ({ id, update }) => {
            await queryClient.cancelQueries({ queryKey: ['auditCriteria', projectId] });

            const previous = queryClient.getQueryData<Criterion[]>(['auditCriteria', projectId]);

            queryClient.setQueryData<Criterion[]>(['auditCriteria', projectId], (old = []) =>
                old.map(c => (c.id === id ? { ...c, ...update } : c))
            );

            return { previous };
        },
        onError: (_err, _vars, context) => {
            toast.error('Error saving');
            if (context?.previous) {
                queryClient.setQueryData(['auditCriteria', projectId], context.previous);
            }
        },
        onSuccess: () => {
            toast.success('Saved successfully');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['auditCriteria', projectId] });
        },
    });

    const handleUpdate = (id: string, update: OutcomeUpdate) => {
        mutation.mutate({ id, update });
    };

    const filteredCriteria = criteria.filter(
        c => levelFilter === 'ALL' || c.level === levelFilter
    );

    const calculateStats = () => {
        const stats: Record<Criterion['principle'], number> & { total: number; completed: number } = {
            PERCEIVABLE: 0,
            OPERABLE: 0,
            UNDERSTANDABLE: 0,
            ROBUST: 0,
            total: criteria.length,
            completed: 0,
        };

        for (const c of criteria) {
            if (c.outcome && c.outcome !== 'NOT_CHECKED') {
                stats[c.principle]++;
                stats.completed++;
            }
        }

        return stats;
    };

    if (isLoading) return <div className="p-6">Loading audit criteria...</div>;
    if (error) return <div className="p-6 text-red-600">Error loading audit data</div>;

    return (
        <div className="flex gap-6">
            <div className="w-full md:w-2/3 lg:w-3/4">
                <div className="mb-4">
                    <Select
                        defaultValue={levelFilter}
                        onValueChange={value => setLevelFilter(value as 'A' | 'AA' | 'AAA' | 'ALL')}
                    >
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
                <AuditSidebar stats={calculateStats()} projectId={projectId!} />
            </div>
        </div>
    );
}