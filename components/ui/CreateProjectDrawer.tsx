'use client';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createProject } from 'services/api/projectService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateProjectFormValues, createProjectSchema } from 'lib/validators/createProjectSchema';


export function CreateProjectDrawer({ onCreated }: { onCreated: () => void }) {
    const queryClient = useQueryClient();
    const form = useForm<CreateProjectFormValues>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: '',
            slug: '',
            client: '',
            priority: 'LOW',
            type: '',
            endDate: '',
            pages: [],
        },
    });

    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('');
    const pages = form.watch('pages') || [];

    const addPage = () => {
        if (url && !pages.includes(url)) {
            form.setValue('pages', [...pages, url]);
            setUrl('');
        }
    };

    const removePage = (index: number) => {
        const newPages = [...pages];
        newPages.splice(index, 1);
        form.setValue('pages', newPages);
    };

    const mutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            toast.success('Project created');
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (error: any) => {
            toast.error(error.message || 'Error creating project');
        },
    });

    const onSubmit = (data: CreateProjectFormValues) => {
        mutation.mutate(data);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>+ New Project</Button>
            </SheetTrigger>

            <SheetContent side="right" className="p-4 min-w-[750px]">
                <SheetHeader>
                    <SheetTitle>Create New Project</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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

                            <FormField control={form.control} name="client" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="priority" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <FormControl>
                                        <select {...field} className="border rounded px-3 py-2 w-full">
                                            <option value="LOW">Low</option>
                                            <option value="MEDIUM">Medium</option>
                                            <option value="HIGH">High</option>
                                        </select>
                                    </FormControl>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="type" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="endDate" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl><Input type="date" {...field} /></FormControl>
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
                            </div>

                            <Button type="submit" className="w-full">Create Project</Button>
                        </form>
                    </Form>
                </div>

            </SheetContent>
        </Sheet>
    );
}
