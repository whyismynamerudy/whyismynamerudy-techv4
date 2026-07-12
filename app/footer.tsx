'use client'
import { ThemeSwitch } from './theme-switch'

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[color:var(--archive-border)]">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-8 sm:px-8 lg:px-12">
        <span className="meta-line">© 2026 Rudy Monga</span>
        <ThemeSwitch />
      </div>
    </footer>
  )
}
