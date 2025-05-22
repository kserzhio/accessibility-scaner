import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

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
  onViewReport?: () => void;
}

export const AuditSidebar = ({ stats, onViewReport }: AuditSidebarProps) => {
  const getLabel = (key: keyof Stats) => key.charAt(0) + key.slice(1).toLowerCase();

  return (
    <Card className="w-full max-w-xs bg-white dark:bg-gray-950 p-4 shadow-md sticky top-6">
      <CardContent className="space-y-4">
        <div className="text-lg font-semibold">Progress</div>

        {(['PERCEIVABLE', 'OPERABLE', 'UNDERSTANDABLE', 'ROBUST'] as const).map((key) => (
          <div key={key} className="text-sm">
            <div className="flex justify-between">
              <span>{getLabel(key)}</span>
              <span>
                {stats[key]} of {/* could enhance with real total */}
                {key === 'PERCEIVABLE' ? 20 : key === 'OPERABLE' ? 20 : key === 'UNDERSTANDABLE' ? 13 : 5}
              </span>
            </div>
            <Progress value={(stats[key] / (key === 'PERCEIVABLE' ? 20 : key === 'OPERABLE' ? 20 : key === 'UNDERSTANDABLE' ? 13 : 5)) * 100} />
          </div>
        ))}

        <Separator />

        <div className="text-sm font-medium">
          Total completed: {stats.completed} / {stats.total}
        </div>

        <Button onClick={onViewReport} className="w-full mt-2">
          View report
        </Button>
      </CardContent>
    </Card>
  );
};
