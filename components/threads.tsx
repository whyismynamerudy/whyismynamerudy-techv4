'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import type {
  Card as CardData,
  FlagshipEntry as FlagshipEntryData,
  FoundationItem,
  ThreadLink,
} from '@/app/data'

const EASE = [0.22, 1, 0.36, 1] as const

/* ------------------------------------------------------------------ */
/* Shared link renderer                                                */
/* ------------------------------------------------------------------ */

/**
 * Renders links iterated from a `links[]` array. The first link is the
 * "primary" (rendered as a small pill with border and arrow). Subsequent
 * links render as secondary text-only chips separated by a middle-dot.
 * This is intentionally NOT hardcoded per-label — when new link types are
 * appended to the data (Substack, live demo, etc.), they show up here
 * automatically.
 */
export function LinkRow({
  links,
  className = '',
}: {
  links: ThreadLink[]
  className?: string
}) {
  if (links.length === 0) return null
  const [primary, ...rest] = links

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}>
      <a
        key={primary.url}
        href={primary.url}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-1.5 rounded-full border border-[color:var(--archive-border)] px-3 py-1 font-geist text-[12px] font-medium text-[color:var(--archive-text)] transition-all duration-200 hover:border-[color:var(--archive-text)] hover:gap-2"
      >
        {primary.label}
        <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
      </a>

      {rest.map((link, i) => (
        <span
          key={link.url}
          className="inline-flex items-center gap-3 font-geist text-[12px] text-[color:var(--archive-muted)]"
        >
          {i === 0 && <span aria-hidden className="text-[color:var(--archive-border)]">·</span>}
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 transition-colors duration-200 hover:text-[color:var(--archive-text)]"
          >
            {link.label}
            <ArrowUpRight className="h-3 w-3" />
          </a>
          {i < rest.length - 1 && <span aria-hidden className="text-[color:var(--archive-border)]">·</span>}
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Flagship entry (used by The Company section)                       */
/* ------------------------------------------------------------------ */

export function FlagshipEntry({ entry }: { entry: FlagshipEntryData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
    >
      <h3 className="font-fraunces text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-tight tracking-tight text-[color:var(--archive-text)]">
        {entry.title}
      </h3>
      <div className="meta-line mt-2">
        {entry.role} · {entry.dateRange}
      </div>
      <p className="prose-body mt-5 max-w-[40rem] text-[1.0625rem] leading-[1.7] text-[color:var(--archive-text)]">
        {entry.description}
      </p>
      <LinkRow links={entry.links} className="mt-6" />
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Card — used inside the podcast shelf and the Notable Ships grid    */
/* ------------------------------------------------------------------ */

export function Card({
  card,
  index,
  layout = 'shelf',
}: {
  card: CardData
  index: number
  /**
   * 'shelf' — fixed-width horizontal scroll item (default).
   * 'grid'  — fills the grid cell, auto height, used for Notable Ships.
   */
  layout?: 'shelf' | 'grid'
}) {
  const isShelf = layout === 'shelf'
  const sizingClasses = isShelf
    ? 'shelf-snap h-[19rem] w-[260px] shrink-0 sm:h-72 sm:w-[280px]'
    : 'h-full w-full min-h-[16rem]'

  return (
    <motion.article
      initial={{ opacity: 0, x: isShelf ? 20 : 0, y: isShelf ? 0 : 12 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        ease: EASE,
        delay: index * 0.06,
      }}
      className={`group relative flex ${sizingClasses} flex-col overflow-hidden rounded-lg border border-[color:var(--archive-border)] bg-[color:var(--archive-bg)] p-5 shadow-none transition-all duration-200 hover:-translate-y-[1px] hover:scale-[1.015] hover:border-[color:var(--archive-muted)] hover:shadow-[0_6px_20px_-8px_rgba(31,27,22,0.15)]`}
    >
      {card.eyebrow && (
        <div className="meta-line line-clamp-2 text-[10.5px]">{card.eyebrow}</div>
      )}

      <h4 className="mt-2 font-fraunces text-[1.125rem] font-medium leading-snug tracking-tight text-[color:var(--archive-text)] sm:text-[1.1875rem]">
        {card.title}
      </h4>

      <p
        className={`prose-body mt-2 text-[13.5px] leading-[1.5] text-[color:var(--archive-muted)] ${
          isShelf ? 'line-clamp-3' : 'sm:text-[14px]'
        }`}
      >
        {card.hook}
      </p>

      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
        <div className="flex flex-col gap-1">
          {card.date && (
            <span className="font-geist text-[11px] uppercase tracking-[0.12em] text-[color:var(--archive-muted)]">
              {card.date}
            </span>
          )}
          {card.links.length > 0 && (
            <div className="mt-1">
              <LinkRow links={card.links} />
            </div>
          )}
        </div>
        {card.metric && (
          <div className="flex flex-col items-end text-right">
            <span className="font-geist-mono text-[13px] font-medium tabular-nums text-[color:var(--archive-text)]">
              {card.metric.value}
            </span>
            <span className="font-geist text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--archive-muted)]">
              {card.metric.label}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  )
}

/* ------------------------------------------------------------------ */
/* Library shelf — horizontal scroll card track (used by The Show)    */
/* ------------------------------------------------------------------ */

export function LibraryShelf({
  cards,
}: {
  cards: CardData[]
}) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [atEnd, setAtEnd] = useState(false)
  const [scrollable, setScrollable] = useState(false)

  const updateChevron = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    const canScroll = maxScroll > 4
    setScrollable(canScroll)
    setAtEnd(!canScroll || el.scrollLeft >= maxScroll - 4)
  }, [])

  useEffect(() => {
    updateChevron()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateChevron, { passive: true })
    window.addEventListener('resize', updateChevron)
    return () => {
      el.removeEventListener('scroll', updateChevron)
      window.removeEventListener('resize', updateChevron)
    }
  }, [updateChevron, cards.length])

  const advance = useCallback((dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    // Card width + gap-6 (24px). Match the widths defined in Card.
    const isDesktop =
      typeof window !== 'undefined' && window.innerWidth >= 640
    const step = (isDesktop ? 280 : 260) + 24
    el.scrollBy({ left: step * dir, behavior: 'smooth' })
  }, [])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        advance(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        advance(-1)
      }
    },
    [advance],
  )

  return (
    <div>
      {/* Shelf: negative-margin to bleed slightly past the container so the
          edge fade doesn't clip the first card visually. */}
      <div className="relative -mx-5 sm:-mx-8 lg:-mx-12">
        <div className="shelf-fade">
          <div
            ref={trackRef}
            tabIndex={0}
            role="region"
            aria-label="Scrollable card shelf"
            onKeyDown={onKeyDown}
            className="shelf-track flex gap-6 overflow-x-auto scroll-smooth px-5 py-2 focus:outline-none focus-visible:outline-none sm:px-8 lg:px-12"
          >
            {cards.map((card, i) => (
              <Card key={card.title} card={card} index={i} />
            ))}
            {/* Trailing spacer so the last card can snap flush and the fade
                mask lands cleanly. */}
            <div aria-hidden className="w-2 shrink-0" />
          </div>
        </div>

        {/* Right chevron indicator — fades out when the shelf is at end. */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: scrollable && !atEnd ? 1 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 sm:right-4 lg:right-6"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--archive-border)] bg-[color:var(--archive-bg)] text-[color:var(--archive-muted)] shadow-[0_2px_8px_-2px_rgba(31,27,22,0.1)]">
            <ChevronRight className="h-4 w-4" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Foundation list — unused after refactor, retained for future reuse */
/* ------------------------------------------------------------------ */

// TODO: unused after refactor — retained in case a Foundation-style dense
// list is reintroduced later.
export function FoundationList({
  intro,
  items,
}: {
  intro: string
  items: FoundationItem[]
}) {
  return (
    <div>
      <p className="prose-body max-w-[36rem] text-[color:var(--archive-muted)]">
        {intro}
      </p>

      <ul className="mt-8 border-t border-[color:var(--archive-border)]">
        {items.map((item, i) => (
          <motion.li
            key={`${item.title}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: EASE, delay: Math.min(i * 0.02, 0.2) }}
            className="grid gap-1 border-b border-[color:var(--archive-border)] py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
          >
            <div>
              <div className="font-fraunces text-[1.0625rem] font-medium leading-snug tracking-tight text-[color:var(--archive-text)]">
                {item.title}
              </div>
              {item.detail && (
                <div className="prose-body mt-1 text-[14px] text-[color:var(--archive-muted)]">
                  {item.detail}
                </div>
              )}
            </div>
            <div className="meta-line whitespace-nowrap sm:pt-1 sm:text-right">
              {item.date}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
