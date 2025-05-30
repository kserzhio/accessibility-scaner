// components/Sidebar.tsx

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from 'lib/utils'

export type SidebarItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
};

type SidebarProps = {
  title?: string;
  items: SidebarItem[];
};

export function Sidebar({ items, title = 'Navigation' }: SidebarProps) {
  const pathname = usePathname();
  const activeItem = items
    .filter((item) => pathname.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0];

  return (
    <aside className="w-64 bg-white min-h-screen p-4 border-r">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">{title}</h2>
      <nav className="flex flex-col gap-2">
        {items.map(({ id, label, href, icon: Icon }) => {
          const isActive = activeItem?.id === id;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-red-100 dark:bg-gray-800 text-red-600 dark:text-white'
                  : 'text-neutral-500 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}