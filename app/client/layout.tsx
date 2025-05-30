'use client'
import { Sidebar } from 'components/navigations/Sidebar'
import { Topbar } from 'components/navigations/Topbar'
import { ReactNode } from 'react'
import { BarChart, FileText, Lightbulb, ListChecks } from 'lucide-react';
import { ClientProjectProvider } from 'context/ClientProjectContext';
const clientSidebarItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/client', icon: BarChart },
    { id: 'pages', label: 'Pages', href: '/client/pages', icon: ListChecks },
    { id: 'reports', label: 'Reports', href: '/client/reports', icon: FileText },
    { id: 'recommendations', label: 'Recommendations', href: '/client/recommendations', icon: Lightbulb },
];

export default function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <ClientProjectProvider>
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Sidebar title="Client Panel" items={clientSidebarItems} />;
                <div className="flex-1 flex flex-col">
                    <Topbar />
                    <main className="flex-1 mt-16 p-6 bg-gray-50 dark:bg-gray-900">
                        {children}
                    </main>
                </div>
            </div>
        </ClientProjectProvider>
    )
}