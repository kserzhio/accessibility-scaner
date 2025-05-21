'use client'

import { useState } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from 'components/ui/accordion'
import { Loader2 } from 'lucide-react'

interface Props {
    violation: {
        id: string
        impact: string
        description: string
        helpUrl: string
        selector: string
    }
}

export function ViolationAccordionItem({ violation }: Props) {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState<{
        fixHtml: string
        why: string
        impactSummary: string
    } | null>(null)

    const fetchDetails = async () => {
        if (content || loading) return
        setLoading(true)
        try {
            const res = await fetch(`/api/deque-info?url=${encodeURIComponent(violation.helpUrl)}`)
            const data = await res.json()
            setContent(data)
        } catch (err) {
            console.error('Parse error:', err)
        }
        setLoading(false)
    }
    const getImpactColor = (impact: string) => {
        switch (impact.toUpperCase()) {
            case 'CRITICAL':
            case 'SERIOUS':
                return 'text-red-600'
            case 'MODERATE':
                return 'text-yellow-600'
            case 'MINOR':
                return 'text-green-600'
            default:
                return 'text-gray-600'
        }
    }
    return (
        <AccordionItem value={violation.id} onClick={fetchDetails}>
            <AccordionTrigger className="no-underline hover:no-underline cursor-pointer hover:bg-muted/50 transition-colors px-2">
                <div className="text-left w-full">
                    <div className={`text-sm font-medium ${getImpactColor(violation.impact)}`}>
                        {violation.impact}
                    </div>
                    <div className="text-sm text-gray-800 dark:text-gray-100">{violation.description}</div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                {loading && (
                    <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                    </div>
                )}
                {!loading && content && (
                    <div className="space-y-4 text-sm text-gray-800 dark:text-gray-100 p-2">
                        <div>
                            <div
                                className="prose dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: content.fixHtml }}
                            />
                        </div>
                        <div>
                            <p className="whitespace-pre-wrap">{content.why}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1">Compliance Data & Impact</h4>
                            <p className="whitespace-pre-wrap text-muted-foreground">{content.impactSummary}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1">CSS Selector</h4>
                            <pre className="bg-muted rounded-md p-2 text-xs text-black dark:text-white overflow-x-auto">
                                {violation.selector}
                            </pre>
                        </div>
                    </div>
                )}
            </AccordionContent>
        </AccordionItem>
    )
}
