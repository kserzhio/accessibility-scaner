'use client'
import { Sidebar } from 'components/navigations/Sidebar'
import { Topbar } from 'components/navigations/Topbar'
import { Home, LayoutDashboard, ShieldCheck, Users } from 'lucide-react'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const navItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { id: 'project-access', label: 'Project Access', href: '/admin/project-access', icon: Users },
  { id: 'Projects', label: 'Projects', href: '/admin/projects', icon: Home },
  { id: 'Audit', label: 'Audit', href: '/admin/audit', icon: ShieldCheck },
]
const queryClient = new QueryClient();
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Sidebar title="Admin Panel" items={navItems} />;
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 mt-16 p-6 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  )
}