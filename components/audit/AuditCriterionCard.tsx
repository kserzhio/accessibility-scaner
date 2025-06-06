import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AuditCriterionCardProps {
  id: string;
  title: string;
  level: 'A' | 'AA' | 'AAA';
  description: string;
  understandingUrl: string;
  howToMeetUrl: string;
  outcome?: string;
  observations?: string;
  onChange: (update: { outcome: string; observations: string }) => void;
}
const getOutcomeBadgeColor = (outcome: string) => {
  switch (outcome) {
    case 'PASSED': return 'bg-green-200 text-green-800';
    case 'FAILED': return 'bg-red-200 text-red-800';
    case 'CANT_TELL': return 'bg-yellow-200 text-yellow-800';
    case 'NOT_PRESENT': return 'bg-gray-200 text-gray-800';
    case 'NOT_CHECKED': return 'bg-neutral-200 text-neutral-700';
    default: return 'bg-neutral-100 text-neutral-700';
  }
};
const getOutcomeBorderColor = (outcome: string) => {
  switch (outcome) {
    case 'PASSED': return 'border-green-500';
    case 'FAILED': return 'border-red-500';
    case 'CANT_TELL': return 'border-yellow-500';
    case 'NOT_PRESENT': return 'border-gray-400';
    case 'NOT_CHECKED': return 'border-neutral-300';
    default: return 'border-neutral-200';
  }
};

export const AuditCriterionCard = ({
  id,
  title,
  level,
  description,
  understandingUrl,
  howToMeetUrl,
  outcome = 'NOT_CHECKED',
  observations = '',
  onChange
}: AuditCriterionCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [localObservations, setLocalObservations] = useState(observations);

  return (
    <div className={`relative rounded-xl p-4 bg-white dark:bg-gray-900 shadow-md space-y-4 border-l-4 pl-5 ${getOutcomeBorderColor(outcome)}`}>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {id}: {title} <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-800 rounded-full">Level {level}</span>
        </h3>
        <div className="flex gap-3 items-center">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getOutcomeBadgeColor(outcome)}`}>{outcome.replace('_', ' ')}</span>
          <Link href={understandingUrl} target="_blank" className="text-sm text-blue-600 hover:underline inline-flex items-center">
            Understanding <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
          <Link href={howToMeetUrl} target="_blank" className="text-sm text-blue-600 hover:underline inline-flex items-center">
            How to meet <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300">
        {showFullDescription ? description : `${description.slice(0, 200)}${description.length > 200 ? '...' : ''}`}
        {description.length > 200 && (
          <button
            onClick={() => setShowFullDescription(prev => !prev)}
            className="ml-2 text-blue-500 hover:underline text-xs"
          >
            {showFullDescription ? 'Show less' : 'Show full description'}
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="flex flex-col w-full lg:w-1/2">
          <label htmlFor={`outcome-${id}`} className="text-sm font-medium mb-1">
            Outcome:
          </label>
          <Select
            defaultValue={outcome}
            onValueChange={(value) => onChange({ outcome: value, observations })}
          >
            <SelectTrigger id={`outcome-${id}`}>
              <SelectValue placeholder="Select outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PASSED">Passed</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
              <SelectItem value="CANT_TELL">Cannot tell</SelectItem>
              <SelectItem value="NOT_PRESENT">Not present</SelectItem>
              <SelectItem value="NOT_CHECKED">Not checked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full lg:w-1/2">
          <label htmlFor={`observations-${id}`} className="text-sm font-medium mb-1">
            Observations:
          </label>
          <Textarea
            id={`observations-${id}`}
            value={localObservations}
            onChange={(e) => setLocalObservations(e.target.value)}
            placeholder="Add notes, examples, or context..."
            className="min-h-[80px]"
          />
          <Button
            variant="secondary"
            size="sm"
            className="mt-2 cursor-pointer"
            onClick={() => onChange({ outcome, observations: localObservations })}
          >
            Save Observations
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="link" size="sm" className="text-sm px-0">
          View in report
        </Button>
      </div>
    </div>
  );
};
