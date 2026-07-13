'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollProgress
        className="fixed top-0 z-50 h-0.5 bg-[color:var(--archive-text)]"
        springOptions={{ bounce: 0 }}
      />

      <article className="mx-auto w-full max-w-[720px] px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        <Link
          href="/notes"
          className="meta-line inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[color:var(--archive-text)]"
        >
          <ArrowLeft className="h-3 w-3" />
          Notes
        </Link>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert prose-headings:font-fraunces prose-headings:font-medium prose-headings:tracking-tight prose-h1:text-[clamp(1.875rem,4vw,2.5rem)] prose-h1:leading-tight prose-h1:mb-2 prose-h2:mt-10 prose-h2:text-[1.375rem] prose-p:text-[color:var(--archive-text)] prose-p:leading-[1.75] prose-strong:font-medium prose-a:text-[color:var(--archive-text)] prose-a:underline-offset-4 prose-li:text-[color:var(--archive-text)] prose-li:leading-[1.75]">
          {children}
        </div>
      </article>
    </>
  )
}
