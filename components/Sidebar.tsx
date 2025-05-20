// components/Sidebar.tsx

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from 'lib/utils'
import { Home, Users, LayoutDashboard } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Create Projects', href: '/admin/projects/create', icon: Home },
  { label: 'Projects', href: '/admin/projects', icon: Home },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white min-h-screen p-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
                isActive
                  ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
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
