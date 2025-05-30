'use client';

import { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useClientProject } from 'context/ClientProjectContext';

const getBadgeColor = (status: string) => {
  switch (status) {
    case 'Compliant':
      return 'bg-green-100 text-green-700';
    case 'Not Compliant':
      return 'bg-red-100 text-red-700';
    case 'Partial':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function ClientPagesTable() {
  const { project, loading } = useClientProject();
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      if (!project) return;
      try {
        const pagesRes = await fetch(`/api/client/projects/${project.projectId}/pages`, { credentials: 'include' });
        const data = await pagesRes.json();
        setPages(data.pages);
        console.log(data.pages)
      } catch (err) {
        console.error('Failed to load pages', err);
      }
    }
    load();
  }, [project]);
  if (loading || !pages) return <p className="p-6">Loading...</p>;
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Scanned Pages</h2>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Issues</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell>{page.url}</TableCell>
                <TableCell>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getBadgeColor(page.status)}`}>
                    {page.status}
                  </span>
                </TableCell>
                <TableCell>{page.score}%</TableCell>
                <TableCell>{page.issues}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/client/pages/${page.id}`}>
                      View <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
