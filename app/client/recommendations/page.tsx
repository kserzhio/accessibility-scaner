'use client';

import { Lightbulb, ListChecks, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const recommendations = [
  {
    id: 'contrast',
    title: 'Ensure sufficient color contrast',
    description: 'Make sure text and background colors have enough contrast for readability.',
    link: 'https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum',
  },
  {
    id: 'labels',
    title: 'Add labels to all form fields',
    description: 'Every form element (input, textarea, select) must have an associated label.',
    link: 'https://dequeuniversity.com/rules/axe/4.7/label',
  },
  {
    id: 'focus-order',
    title: 'Ensure logical focus order',
    description: 'Interactive elements should be navigable in a logical order via keyboard.',
    link: 'https://www.w3.org/WAI/WCAG21/quickref/#focus-order',
  },
  {
    id: 'aria',
    title: 'Use ARIA only when necessary',
    description: 'Prefer native HTML elements. Use ARIA attributes only when needed.',
    link: 'https://w3.org/TR/wai-aria-practices/',
  },
];

export default function ClientRecommendations() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" /> Recommendations
      </h2>
      <p className="text-muted-foreground text-sm">
        Based on the audit results, we suggest prioritizing the following improvements:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <Card key={rec.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-red-500" />
                {rec.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2 text-muted-foreground">{rec.description}</p>
              <a
                href={rec.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                Learn more <ExternalLink className="w-3 h-3" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
