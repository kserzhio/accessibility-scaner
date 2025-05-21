// components/Sidebar.tsx

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from 'lib/utils'
import { Home, Users, LayoutDashboard } from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { id: 'users', label: 'Users', href: '/admin/users', icon: Users },
  { id: 'Create Projects', label: 'Create Projects', href: '/admin/projects/create', icon: Home },
  { id: 'Projects', label: 'Projects', href: '/admin/projects', icon: Home },
]

export function Sidebar() {
  const pathname = usePathname()
  const activeItem = navItems
    .filter(item => pathname.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0]

  return (
    <aside className="w-64 bg-white min-h-screen p-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ id, label, href, icon: Icon }, index) => {
          const isActive = activeItem?.id === id
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
                isActive
                  ? 'bg-red-100 dark:bg-gray-800 text-red-600 dark:text-white'
                  : 'text-neutral-500 dark:text-gray-400 hover:text-red-600 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
