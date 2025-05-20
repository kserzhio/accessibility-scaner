// app/admin/projects/[projectId]/pages/page.tsx

'use client'

import { useEffect, useState, useTransition } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'

interface Page {
  id: string
  url: string
  slug: string
  createdAt: string
}

export default function ProjectPagesPage() {
  const { projectId } = useParams()
  const [pages, setPages] = useState<Page[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const fetchPages = async () => {
      const res = await fetch(`/api/projects/${projectId}/pages`)
      const data = await res.json()
      setPages(data.pages || [])
    }
    fetchPages()
  }, [projectId])

  const handleScan = () => {
    startTransition(async () => {
      const res = await fetch(`/api/projects/${projectId}/scan`, {
        method: 'POST',
      })

      if (!res.ok) {
        toast.error('Scan failed')
        return
      }

      const result = await res.json()
      toast.success(`Scanned ${result.results.length} pages`) // можна замінити на violations count
    })
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Project Pages</h1>
        <Button onClick={handleScan} disabled={isPending}>
          {isPending ? 'Scanning...' : 'Scan All Pages'}
        </Button>
      </div>

      <ul className="space-y-3">
        {pages.map((page) => (
          <li
            key={page.id}
            className="p-4 border border-border rounded-md bg-muted"
          >
            <p className="font-medium text-sm">{page.url}</p>
            <p className="text-xs text-muted-foreground">
              Added: {new Date(page.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
