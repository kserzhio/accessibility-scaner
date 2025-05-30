import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Eye, MousePointerClick, BookOpen, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  PERCEIVABLE: number;
  OPERABLE: number;
  UNDERSTANDABLE: number;
  ROBUST: number;
  total: number;
  completed: number;
}

interface AuditSidebarProps {
  stats: Stats;
  projectId: string;
}

const groupInfo = [
  { key: 'PERCEIVABLE', label: 'Perceivable', total: 20, icon: Eye },
  { key: 'OPERABLE', label: 'Operable', total: 20, icon: MousePointerClick },
  { key: 'UNDERSTANDABLE', label: 'Understandable', total: 13, icon: BookOpen },
  { key: 'ROBUST', label: 'Robust', total: 5, icon: ShieldCheck },
];

const getProgressColor = (value: number, total: number) => {
  const percent = (value / total) * 100;
  if (percent >= 90) return 'bg-green-500';
  if (percent >= 50) return 'bg-yellow-400';
  return 'bg-red-400';
};

export const AuditSidebar = ({ stats, projectId }: AuditSidebarProps) => {
  return (
    <Card className="w-full max-w-xs bg-white dark:bg-gray-950 p-4 shadow-lg sticky top-6 border border-gray-200 dark:border-gray-800">
      <CardContent className="space-y-4">
        <div className="text-lg font-bold text-center">Audit Progress</div>

        {groupInfo.map(({ key, label, total, icon: Icon }) => {
          const value = stats[key as keyof Stats];
          const progress = (value / total) * 100;
          const bar = getProgressColor(value, total);

          return (
            <div key={key} className="text-sm space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span>{label}</span>
                </div>
                <span className="font-medium">{value}/{total}</span>
              </div>
              <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-800">
                <div className={`h-2 rounded ${bar}`} style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          );
        })}

        <Separator />

        <div className="text-sm text-center font-medium">
          Total completed: <span className="font-semibold">{stats.completed}</span> / {stats.total}
        </div>

        <Button asChild className="w-full mt-2">
          <Link href={`/admin/audit/${projectId}/report`}>View report</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
