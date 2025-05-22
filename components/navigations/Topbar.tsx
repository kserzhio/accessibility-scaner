'use client'

import { ThemeToggle } from '../ui/ThemeToggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Bell, MessageCircle } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white  px-6 flex items-center justify-between z-50">
      <div className="text-lg font-semibold">Dashboard</div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className='cursor-pointer'>
            <MessageCircle className="w-5 h-5" />
          </Button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full px-1.5">
            3
          </span>
        </div>

        <div className="relative">
          <Button variant="ghost" size="icon" className='cursor-pointer'>
            <Bell className="w-5 h-5" />
          </Button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full px-1.5">
            5
          </span>
        </div>
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
