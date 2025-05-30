'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { completeAudit, fetchAuditCriteria } from 'services/api/projectService';

const outcomeColor = {
    PASSED: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
    CANT_TELL: 'bg-yellow-100 text-yellow-800',
    NOT_PRESENT: 'bg-gray-100 text-gray-800',
    NOT_CHECKED: 'bg-neutral-100 text-neutral-700',
};

export default function ViewReportPage() {
    const { projectId } = useParams() as { projectId: string };
    const [filter, setFilter] = useState<string>('ALL');

    const {
        data: criteria = [],
        isLoading,
        error,
    } = useQuery<Criterion[]>({
        queryKey: ['auditCriteria', projectId],
        queryFn: () => fetchAuditCriteria(projectId),
        enabled: !!projectId,
    });

    const filtered = filter === 'ALL' ? criteria : criteria.filter(c => c.outcome === filter);
    const hasUnchecked = criteria.some(c => !c.outcome || c.outcome === 'NOT_CHECKED');
    const handleExport = () => {
        const dataStr = JSON.stringify(criteria, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-report-${projectId}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleExportPdf = () => {
        const doc = new jsPDF();
        doc.text(`Accessibility Report for Project ${projectId}`, 10, 10);
        autoTable(doc, {
            startY: 20,
            head: [['ID', 'Title', 'Level', 'Outcome', 'Observations']],
            body: filtered.map(c => [
                c.id,
                c.title,
                c.level,
                c.outcome || 'NOT_CHECKED',
                c.observations || ''
            ])
        });
        doc.save(`audit-report-${projectId}.pdf`);
    };
    const mutation = useMutation({
        mutationFn: () => completeAudit(projectId),
        onSuccess: () => toast.success('Save success'),
        onError: () => toast.error('Save Error'),
    });
    const handleCompleteAudit = () => {
        mutation.mutate();
    };
    if (isLoading) return <div className="p-6">Loading audit report...</div>;
    if (error) return <div className="p-6 text-red-600">Error loading report</div>;
    return (
        <div className="space-y-6">
            <div className="rounded-lg bg-muted p-4 flex flex-wrap justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Criteria</p>
                    <p className="text-lg font-semibold">{criteria.length}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Passed</p>
                    <p className="text-lg font-semibold">{criteria.filter(c => c.outcome === 'PASSED').length}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Failed</p>
                    <p className="text-lg font-semibold">{criteria.filter(c => c.outcome === 'FAILED').length}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Unverified</p>
                    <p className="text-lg font-semibold">{criteria.filter(c => !c.outcome || c.outcome === 'NOT_CHECKED').length}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Accessibility Audit Report</h1>
                    <p className="text-muted-foreground">
                        Overview of all criteria results for project: <span className="font-mono">{projectId}</span>
                    </p>
                </div>

                <div className="flex gap-2 flex-wrap items-baseline">
                    <select
                        className="border rounded px-3 py-1 text-sm cursor-pointer"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value="ALL">All</option>
                        <option value="PASSED">Passed</option>
                        <option value="FAILED">Failed</option>
                        <option value="CANT_TELL">Cannot tell</option>
                        <option value="NOT_PRESENT">Not present</option>
                        <option value="NOT_CHECKED">Not checked</option>
                    </select>

                    <Button variant="outline" onClick={handleExport} className="gap-1 cursor-pointer">
                        <Download className="w-4 h-4" /> Export JSON
                    </Button>
                    <Button variant="outline" onClick={handleExportPdf} className="gap-1 cursor-pointer">
                        <Download className="w-4 h-4" /> Export PDF
                    </Button>
                    <div className="flex flex-col items-start">
                        <Button onClick={handleCompleteAudit} disabled={hasUnchecked} className="gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Завершити аудит
                        </Button>
                        {hasUnchecked && (
                            <p className="text-sm text-red-500 mt-1">Перевір усі критерії перед завершенням.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {filtered.map((c) => (
                    <Card key={c.id} className="border-l-4 p-4 shadow-sm">
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-md font-semibold">{c.id}: {c.title}</h3>
                                    <span className="text-xs text-muted-foreground">Level {c.level}</span>
                                </div>
                                <Badge className={outcomeColor[c.outcome as keyof typeof outcomeColor] || 'bg-neutral-100 text-neutral-700'}>
                                    {c.outcome || 'NOT_CHECKED'}
                                </Badge>
                            </div>
                            {c.observations && (
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    <strong>Observations:</strong> {c.observations}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
