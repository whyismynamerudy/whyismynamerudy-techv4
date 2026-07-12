'use client'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const THEMES_OPTIONS = [
  {
    label: 'Light',
    id: 'light',
    icon: <SunIcon className="h-3.5 w-3.5" />,
  },
  {
    label: 'Dark',
    id: 'dark',
    icon: <MoonIcon className="h-3.5 w-3.5" />,
  },
  {
    label: 'System',
    id: 'system',
    icon: <MonitorIcon className="h-3.5 w-3.5" />,
  },
]

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Reserve space to avoid layout shift on mount.
  if (!mounted) {
    return <div className="h-7 w-[84px]" aria-hidden />
  }

  return (
    <div className="rounded-full border border-[color:var(--archive-border)] p-0.5">
      <AnimatedBackground
        className="pointer-events-none rounded-full bg-[color:var(--archive-hover)]"
        defaultValue={theme}
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.25,
        }}
        enableHover={false}
        onValueChange={(id) => {
          setTheme(id as string)
        }}
      >
        {THEMES_OPTIONS.map((t) => (
          <button
            key={t.id}
            className="relative inline-flex h-7 w-7 items-center justify-center text-[color:var(--archive-muted)] transition-colors duration-150 data-[checked=true]:text-[color:var(--archive-text)]"
            type="button"
            aria-label={`Switch to ${t.label} theme`}
            data-id={t.id}
          >
            {t.icon}
          </button>
        ))}
      </AnimatedBackground>
    </div>
  )
}
