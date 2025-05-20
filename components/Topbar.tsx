'use client'

import { ThemeToggle } from './ThemeToggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react'

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white  px-6 flex items-center justify-between z-50">
      <div className="text-lg font-semibold">Dashboard</div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/avatar.png" alt="user avatar" />
              <AvatarFallback>{session?.user?.name?.[0] ?? 'U'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>
              {session?.user?.email}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Вийти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
