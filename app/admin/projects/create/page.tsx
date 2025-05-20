'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { createProjectSchema, CreateProjectFormValues } from 'lib/validators/createProjectSchema'
import { toast } from 'react-toastify'

export default function CreateProjectPage() {
    const form = useForm<CreateProjectFormValues>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: { name: '', slug: '', pages: [] },
    })

    const router = useRouter()
    const [url, setUrl] = useState('')
    const pages = form.watch('pages')

    const addPage = () => {
        if (url && !pages.includes(url)) {
            form.setValue('pages', [...pages, url])
            setUrl('')
        }
    }

    const removePage = (index: number) => {
        const newPages = [...pages]
        newPages.splice(index, 1)
        form.setValue('pages', newPages)
    }

    const onSubmit = async (data: CreateProjectFormValues) => {
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            toast.error('Error creating project')
            return
        }

        const result = await res.json()
        toast.success('Project created successfully!')
        router.push(`/admin/projects/${result.project.id}/pages`)
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
            <h1 className="text-2xl font-semibold">Create New Project</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="slug" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Project Pages (URLs)</label>
                        <div className="flex gap-2">
                            <Input
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com/page"
                            />
                            <Button type="button" onClick={addPage}>Add</Button>
                        </div>
                        <ul className="space-y-1">
                            {pages.map((p, i) => (
                                <li key={i} className="flex justify-between items-center px-3 py-2 bg-muted rounded">
                                    <span className="text-sm truncate">{p}</span>
                                    <button type="button" onClick={() => removePage(i)} className="text-red-500 text-xs">Remove</button>
                                </li>
                            ))}
                        </ul>
                        <FormMessage>{form.formState.errors.pages?.message}</FormMessage>
                    </div>

                    <Button type="submit" className="w-full">Create Project</Button>
                </form>
            </Form>
        </div>
    )
}
