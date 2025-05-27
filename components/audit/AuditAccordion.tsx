import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { AuditCriterionCard } from './AuditCriterionCard';

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

interface AuditAccordionProps {
  criteria: Criterion[];
  onChange: (id: string, update: { outcome: string; observations: string }) => void;
}

const PRINCIPLE_LABELS: Record<string, string> = {
  PERCEIVABLE: 'Perceivable',
  OPERABLE: 'Operable',
  UNDERSTANDABLE: 'Understandable',
  ROBUST: 'Robust'
};

export const AuditAccordion = ({ criteria, onChange }: AuditAccordionProps) => {
  const grouped = criteria.reduce<Record<string, Criterion[]>>((acc, curr) => {
    if (!acc[curr.principle]) acc[curr.principle] = [];
    acc[curr.principle].push(curr);
    return acc;
  }, {});

  return (
    <Accordion type="multiple" className="space-y-4">
      {Object.entries(grouped).map(([principle, items]) => (
        <AccordionItem key={principle} value={principle} className="border rounded-xl bg-muted/30">
          <AccordionTrigger className="text-lg font-semibold px-4 py-3 cursor-pointer">
            {PRINCIPLE_LABELS[principle]}
          </AccordionTrigger>
          <AccordionContent className="p-4 space-y-4">
            {items.map((criterion) => (
              <AuditCriterionCard
                key={criterion.id}
                {...criterion}
                onChange={(update) => onChange(criterion.id, update)}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
