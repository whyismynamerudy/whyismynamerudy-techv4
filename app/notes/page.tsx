import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Notes',
  description:
    'Essays and reflections by Rudy Monga. On building, discipline, anxiety, and the work behind the work.',
  alternates: { canonical: '/notes' },
}

type Note = {
  slug: string
  title: string
  description: string
  publishedAt: string
}

const NOTES: Note[] = [
  {
    slug: 'identity-within-discipline',
    title: 'The Identity Within Discipline',
    description:
      "True discipline isn't about rigid schedules or perfect streaks — it's about aligning your actions with who you are and who you want to become.",
    publishedAt: '2024-11-03',
  },
  {
    slug: 'hidden-drive-behind-my-hustle',
    title: 'The Hidden Drive Behind My Hustle',
    description:
      'On anxiety as the engine of achievement, and the quiet cost of never letting yourself celebrate.',
    publishedAt: '2024-09-14',
  },
]

const FMT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export default function NotesIndex() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <header className="mb-12 sm:mb-16">
        <h1 className="font-fraunces text-[clamp(2rem,4.5vw,3rem)] font-medium leading-tight tracking-tight text-[color:var(--archive-text)]">
          Notes
        </h1>
        <p className="prose-body mt-4 max-w-[36rem] text-[color:var(--archive-muted)]">
          Essays and reflections. On building, discipline, anxiety, and the
          work behind the work.
        </p>
      </header>

      <ul className="border-t border-[color:var(--archive-border)]">
        {NOTES.map((n) => (
          <li
            key={n.slug}
            className="border-b border-[color:var(--archive-border)]"
          >
            <Link
              href={`/notes/${n.slug}`}
              className="group block py-6 transition-colors duration-200 hover:bg-[color:var(--archive-hover)]"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="font-fraunces text-[1.375rem] font-medium leading-snug tracking-tight text-[color:var(--archive-text)] sm:text-[1.5rem]">
                  {n.title}
                </h2>
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-[color:var(--archive-muted)] transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                />
              </div>
              <p className="prose-body mt-2 text-[15px] leading-[1.65] text-[color:var(--archive-muted)]">
                {n.description}
              </p>
              <div className="meta-line mt-3">
                {FMT.format(new Date(n.publishedAt))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
