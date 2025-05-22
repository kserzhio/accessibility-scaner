'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Accordion } from '@/components/ui/accordion'
import { ViolationAccordionItem } from 'components/violation/ViolationAccordionItem'

export default function ScanDetailsPage() {
    const { projectId, pageId } = useParams() as { projectId: string; pageId: string }
    const router = useRouter()
    const [scan, setScan] = useState<any>(null)

    useEffect(() => {
        fetch(`/api/projects/${projectId}/pages/${pageId}/details`)
            .then(res => res.json())
            .then(data => setScan(data.scanResult))
    }, [projectId, pageId])

    if (!scan) return <div className="p-6">Loading...</div>

    const { page, score, totalIssues, violations } = scan
    const getColor = (score: number) => {
        if (score < 50) return 'bg-red-500'
        if (score < 75) return 'bg-yellow-400'
        return 'bg-green-500'
    }
    return (
        <div className="max-w-6xl mx-auto mt-10 space-y-8">
            <div className="flex flex-col items-left gap-2">
                <div>
                    <Button variant="ghost" size="sm" className='cursor-pointer' onClick={() => router.push(`/admin/projects/${projectId}`)}>
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </Button>
                </div>

                <h1 className="text-2xl font-bold">{page.url}</h1>
            </div>

            <div className="space-y-2">
                <p className="text-muted-foreground text-sm">
                    Last scanned: {new Date(scan.createdAt).toLocaleString()}
                </p>
                <div className="flex flex-col items-left gap-4">
                    <div className="flex w-full">
                        <div className="relative w-full  h-3 bg-gray-200 rounded">
                            <div
                                className={`absolute top-0 left-0 h-full rounded ${getColor(score)}`}
                                style={{ width: `${score}%` }}
                            />
                        </div>
                        <span className="text-xs font-medium w-10 text-right">
                            {score}%
                        </span>

                    </div>
                    <div className="text-sm font-medium">Issues: {totalIssues}</div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Violations</h2>
                <div className="text-sm">
                    <Accordion type="multiple">
                        {violations.map((v: any) => (
                            <ViolationAccordionItem key={v.id} violation={v} />
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
