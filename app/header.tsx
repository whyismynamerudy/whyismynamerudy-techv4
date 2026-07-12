'use client'
import Link from 'next/link'
import { ThemeSwitch } from './theme-switch'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[color:var(--archive-border)] bg-[color:var(--archive-bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-fraunces text-[15px] font-medium tracking-tight text-[color:var(--archive-text)]"
        >
          Rudy Monga
        </Link>
        <ThemeSwitch />
      </div>
    </header>
  )
}
