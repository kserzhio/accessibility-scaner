'use client'

import { useEffect, useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { toast } from 'react-toastify'
import { CheckCircle, XCircle, Loader2, Plus, ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { z } from 'zod'



interface Page {
  id: string
  url: string
  slug: string
  createdAt: string
  status: 'PENDING' | 'SUCCESS' | 'ERROR'
}
const urlSchema = z.string().url({ message: 'Invalid URL format' })
export default function ProjectPagesPage() {
  const { projectId } = useParams()
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [scanningAll, startTransition] = useTransition()
  const [scanningPageId, setScanningPageId] = useState<string | null>(null)
  const [newUrl, setNewUrl] = useState('')
  const [adding, setAdding] = useState(false)
  const completed = pages.filter(p => p.status === 'SUCCESS').length

  const fetchPages = async () => {
    const res = await fetch(`/api/projects/${projectId}/pages`)
    const data = await res.json()
    setPages(data.pages || [])
  }

  useEffect(() => {
    fetchPages()
  }, [projectId])

  const handleScanAll = () => {
    startTransition(async () => {
      const res = await fetch(`/api/projects/${projectId}/scan`, { method: 'POST' })
      if (!res.ok) {
        toast.error('Scan failed')
        return
      }
      const result = await res.json()
      toast.success(`Scanned ${result.results.length} pages`)
      fetchPages()
    })
  }

  const handleScanOne = async (pageId: string) => {
    setScanningPageId(pageId)
    const res = await fetch(`/api/pages/${pageId}/scan`, { method: 'POST' })
    if (!res.ok) {
      toast.error('Scan failed')
    } else {
      toast.success('Page scanned')
      fetchPages()
    }
    setScanningPageId(null)
  }

  const handleAddPage = async () => {
    const parsed = urlSchema.safeParse(newUrl.trim())
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message)
      return
    }

    setAdding(true)
    const res = await fetch(`/api/projects/${projectId}/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: parsed.data }),
    })

    if (!res.ok) {
      toast.error('Failed to add page')
    } else {
      toast.success('Page added')
      setNewUrl('')
      fetchPages()
    }
    setAdding(false)
  }
  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/projects/${projectId}`)} className='cursor-pointer'>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Project
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Project Pages</h1>
        <Button onClick={handleScanAll} disabled={scanningAll} className='cursor-pointer'>
          {scanningAll ? 'Scanning...' : 'Scan All Pages'}
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Enter page URL to add"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <Button onClick={handleAddPage} disabled={adding || !newUrl.trim()}>
          <Plus className="w-4 h-4 mr-1" /> Add Page
        </Button>
      </div>
      <Progress value={(completed / pages.length) * 100} />

      <div className="overflow-x-auto">
        <table className="w-full mt-4 text-sm border">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-2">URL</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-t">
                <td className="p-2 text-blue-600 truncate max-w-xs">{page.url}</td>
                <td className="p-2 flex items-center gap-2">
                  {page.status === 'SUCCESS' && (
                    <><CheckCircle className="text-green-600 w-4 h-4" /> <span>Success</span></>
                  )}
                  {page.status === 'ERROR' && (
                    <><XCircle className="text-red-600 w-4 h-4" /> <span>Error</span></>
                  )}
                  {page.status === 'PENDING' && (
                    <><Loader2 className="animate-spin text-yellow-600 w-4 h-4" /> <span>Pending</span></>
                  )}
                </td>
                <td className="p-2">
                  <Button
                    size="sm"
                    className='cursor-pointer'
                    variant="outline"
                    onClick={() => handleScanOne(page.id)}
                    disabled={scanningPageId === page.id}
                  >
                    {scanningPageId === page.id ? 'Scanning...' : 'Scan'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}