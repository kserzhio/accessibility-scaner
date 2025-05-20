'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from 'lib/utils'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-md bg-muted border border-border">
      <button
        onClick={() => setTheme('light')}
        className={cn(
          'p-1.5 rounded-md transition-colors cursor-pointer',
          !isDark
            ? 'bg-green-500 text-white'
            : 'text-muted-foreground hover:bg-accent'
        )}
      >
        <Sun className="w-4 h-4" />
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={cn(
          'p-1.5 rounded-md transition-colors cursor-pointer',
          isDark
            ? 'bg-gray-800 text-white'
            : 'text-muted-foreground hover:bg-accent'
        )}
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  )
}
