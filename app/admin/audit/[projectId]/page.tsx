'use client';

import { useEffect, useState } from 'react';
import { AuditAccordion } from 'components/audit/AuditAccordion';
import { AuditSidebar } from 'components/audit/AuditSidebar';

// Тип критерію
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

// Сторінка аудиту для конкретного проекту
export default function AuditPage() {
    const [criteria, setCriteria] = useState<Criterion[]>([]);

    // Фейкові дані для демонстрації
    useEffect(() => {
        // Тут зробити fetch з API
        setCriteria([
            {
                id: '1.1.1',
                title: 'Non-text Content',
                level: 'A',
                principle: 'PERCEIVABLE',
                description: 'Provide text alternatives for any non-text content...',
                understandingUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/1-1-1.html',
                howToMeetUrl: 'https://www.w3.org/WAI/WCAG22/quickref/#non-text-content',
                outcome: 'NOT_CHECKED',
                observations: '',
            },
            {
                id: '2.4.7',
                title: 'Focus Visible',
                level: 'AA',
                principle: 'OPERABLE',
                description: 'Ensure that keyboard focus is visible for all UI elements.',
                understandingUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html',
                howToMeetUrl: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-visible',
                outcome: 'PASSED',
                observations: 'Focus ring is visible on all buttons.',
            }
        ]);
    }, []);

    const handleUpdate = (id: string, update: { outcome: string; observations: string }) => {
        setCriteria((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...update } : c))
        );
    };

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
                <AuditAccordion criteria={criteria} onChange={handleUpdate} />
            </div>
            <div className="hidden md:block md:w-1/3 lg:w-1/4">
                <AuditSidebar stats={calculateStats()} />
            </div>
        </div>
    );
}
