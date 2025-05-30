'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useClientProject } from 'context/ClientProjectContext';

const getBadgeColor = (impact: string) => {
  switch (impact.toUpperCase()) {
    case 'CRITICAL': return 'bg-red-600 text-white';
    case 'SERIOUS': return 'bg-orange-500 text-white';
    case 'MODERATE': return 'bg-yellow-400 text-black';
    case 'MINOR': return 'bg-green-500 text-white';
    default: return 'bg-gray-300';
  }
};
export default function ClientScanDetails() {
  const { project, loading } = useClientProject();
  const { pageId } = useParams();
  const [scanResult, setScanResult] = useState<any>(null);

  useEffect(() => {
    async function load() {
      if (!pageId || loading) return;

      try {
        const res = await fetch(`/api/client/pages/${pageId}/details`, { credentials: 'include' });
        const data = await res.json();
        setScanResult(data.scanResult);
        console.log(data.scanResult)
      } catch (err) {
        console.error('Failed to load scan details', err);
      }
    }
    if (pageId) load();
  }, [pageId, project, loading]);

  if (loading) return <div>Loading...</div>;
  if (!scanResult) return <div>No data found</div>;
  const impactCounts: Record<string, number> = {};
  scanResult.violations.forEach((v: any) => {
    const impact = v.impact.toUpperCase();
    impactCounts[impact] = (impactCounts[impact] || 0) + 1;
  });
  return (
    <div className="space-y-6">
      <Link href={'/client/pages'} className="cursor-pointer">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to project
      </Link>
      <div className="text-2xl font-semibold">Page: {scanResult.page.url}</div>
      <div className="flex gap-6 items-center flex-wrap">
        <div>
          <strong>Total Issues:</strong> {scanResult.totalIssues}
        </div>
        <div className="flex flex-col">
          <strong className="mb-1">Score:</strong>
          <Progress value={scanResult.score} className="h-4 w-48" />
          <div className="text-sm mt-1 text-gray-600">{scanResult.score}% compliant</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Impact Summary</h3>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(impactCounts).map(([impact, count]) => (
            <div key={impact} className={`px-3 py-1 rounded text-sm font-medium ${getBadgeColor(impact)}`}>
              {impact}: {count}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Violations</h3>
        {scanResult.violations.length === 0 ? (
          <div className="text-green-600">No violations found 🎉</div>
        ) : (
          scanResult.violations.map((v: any, i: number) => (
            <div
              key={v.id || i}
              className="border rounded p-4 space-y-2 bg-white shadow-sm dark:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getBadgeColor(v.impact)}`}>
                  {v.impact}
                </span>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">
                  {v.description}
                </div>
              </div>
              <div className="text-xs text-gray-500 font-mono break-all">{v.selector}</div>
              <a
                href={v.helpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline"
              >
                Learn how to fix
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
