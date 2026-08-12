'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  type Variants,
} from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import {
  CAREER_CURRENT,
  CAREER_PREVIOUS,
  FOLLOW_INTRO,
  FOLLOW_LINKS,
  HERO,
  HERO_CREDENTIALS,
  HERO_STATS,
  NOTABLE_SHIPS,
  NOW_BODY,
  NOW_LEAD,
  SHOW,
  type CareerEntry,
} from './data'
import {
  Card,
  LibraryShelf,
  LinkRow,
} from '@/components/threads'

/* ------------------------------------------------------------------ */
/* Utilities                                                          */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const

/* ------------------------------------------------------------------ */
/* Stat count-up                                                      */
/* ------------------------------------------------------------------ */

function StatCounter({
  target,
  display,
  label,
  delay = 0,
}: {
  target: number
  display: string
  label: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const raw = useMotionValue(0)
  const [text, setText] = useState<string>('0')

  // Format the animating value so its visual token matches the final display.
  const formatter = useMemo(() => {
    // Thousand-abbreviated forms: 650K+, 9.5K
    if (/K\+?$/.test(display)) {
      const suffix = display.endsWith('+') ? 'K+' : 'K'
      const oneDecimal = /\.\d/.test(display)
      return (n: number) => {
        const v = n / 1000
        return `${
          oneDecimal ? v.toFixed(1) : Math.round(v).toString()
        }${suffix}`
      }
    }
    // Plain integer with optional "+" suffix: 1,000+, 63, 20+, 1
    const suffix = display.endsWith('+') ? '+' : ''
    return (n: number) => `${Math.round(n).toLocaleString()}${suffix}`
  }, [display])

  useEffect(() => {
    const unsub = raw.on('change', (latest) => setText(formatter(latest)))
    return () => unsub()
  }, [raw, formatter])

  useEffect(() => {
    if (!inView) return
    const controls = animate(raw, target, {
      duration: 1.5,
      delay,
      ease: 'easeOut',
    })
    return () => controls.stop()
  }, [inView, raw, target, delay])

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="stat-number tabular-nums">{text}</div>
      <div className="meta-line text-[10.5px] leading-snug">{label}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section header (with animated underline)                           */
/* ------------------------------------------------------------------ */

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASE },
          },
        }}
        className="section-h"
      >
        {children}
      </motion.h2>
      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          show: {
            scaleX: 1,
            transition: { duration: 0.7, ease: EASE, delay: 0.05 },
          },
        }}
        style={{ originX: 0 }}
        className="mt-4 h-px w-16 bg-[color:var(--archive-text)]"
      />
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

const heroTextStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const heroTextLine: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

function Hero() {
  return (
    <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12">
        {/* Photo — bleeds into cream, no border, no shadow */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative aspect-[4/5] w-full max-w-[300px] overflow-hidden md:max-w-none"
        >
          <Image
            src={HERO.portrait}
            alt="Rudy Monga"
            fill
            priority
            sizes="(max-width: 768px) 300px, 40vw"
            className="object-cover object-center [mask-image:radial-gradient(120%_120%_at_50%_45%,black_65%,transparent_100%)]"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={heroTextStagger}
          className="flex flex-col"
        >
          <motion.h1 variants={heroTextLine} className="hero-h1">
            Building things that compound
            <span
              role="button"
              aria-hidden="true"
              onClick={() => {
                window.open(
                  'https://youtu.be/dQw4w9WgXcQ?si=NgIaHvJybQUtj-_w',
                  '_blank',
                  'noopener,noreferrer',
                )
              }}
              className="cursor-pointer"
            >.</span>
          </motion.h1>
          <motion.div
            variants={heroTextLine}
            className="meta-line mt-4 mb-6 text-[11px]"
          >
            {HERO_CREDENTIALS}
          </motion.div>
          <motion.p
            variants={heroTextLine}
            className="prose-body max-w-[36rem] text-[1.125rem] leading-[1.8] text-[color:var(--archive-muted)] md:text-[1.3125rem] md:leading-[1.75]"
          >
            {HERO.elevator}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Stats strip                                                        */
/* ------------------------------------------------------------------ */

function StatsStrip() {
  return (
    <section className="border-y border-[color:var(--archive-border)] py-10 sm:py-12">
      <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-3 sm:gap-x-12 lg:grid-cols-6 lg:gap-x-16">
        {HERO_STATS.map((s, i) => (
          <StatCounter
            key={s.label}
            target={s.target}
            display={s.display}
            label={s.label}
            delay={i * 0.08}
          />
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* The Show — dominant middle section, primary conversion surface     */
/* ------------------------------------------------------------------ */

function ShowSection() {
  const [primary, secondary] = SHOW.primaryLinks

  return (
    <section>
      <SectionHeader>{SHOW.title}</SectionHeader>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-3 font-fraunces text-[1.375rem] font-medium leading-snug tracking-tight text-[color:var(--archive-text)] md:text-[1.5rem]"
      >
        {SHOW.name}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
        className="mt-2 max-w-2xl font-fraunces text-[1.0625rem] font-normal italic leading-snug tracking-tight text-[color:var(--archive-muted)] md:text-[1.125rem]"
      >
        {SHOW.tagline}
      </motion.p>

      {/* Row: episode-count meta left, CTAs right */}
      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="meta-line text-[10.5px]"
        >
          {SHOW.episodeCountMeta}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 sm:gap-4"
        >
          {primary && (
            <a
              href={primary.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--archive-text)] bg-[color:var(--archive-text)] px-6 py-3 font-geist text-[14px] font-medium text-[color:var(--archive-bg)] transition-all duration-200 hover:gap-3 hover:opacity-90 sm:text-[15px]"
            >
              {primary.label}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
            </a>
          )}
          {secondary && (
            <a
              href={secondary.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--archive-text)] px-6 py-3 font-geist text-[14px] font-medium text-[color:var(--archive-text)] transition-all duration-200 hover:gap-3 hover:bg-[color:var(--archive-hover)] sm:text-[15px]"
            >
              {secondary.label}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
            </a>
          )}
        </motion.div>
      </div>

      {/* Shelf below — contained within container width, no right bleed. */}
      <div className="mt-10">
        <LibraryShelf cards={SHOW.cards} />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* The Work — unified career section                                  */
/* ------------------------------------------------------------------ */

function CurrentEntry({ entry, index }: { entry: CareerEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.05 + index * 0.08 }}
    >
      <h3 className="font-fraunces text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-tight tracking-tight text-[color:var(--archive-text)]">
        {entry.title}
      </h3>
      <div className="meta-line mt-2">
        {entry.role} · {entry.dateRange}
      </div>
      <p className="prose-body mt-4 max-w-[40rem] text-[1.0625rem] leading-[1.7] text-[color:var(--archive-text)]">
        {entry.description}
      </p>
      {entry.links && entry.links.length > 0 && (
        <LinkRow links={entry.links} className="mt-5" />
      )}
    </motion.div>
  )
}

function PreviousEntry({ entry, index }: { entry: CareerEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.03 + index * 0.05 }}
      className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)]"
    >
      <div>
        <div className="font-fraunces text-[1.0625rem] font-medium leading-snug text-[color:var(--archive-text)]">
          {entry.title}
        </div>
        <div className="meta-line mt-1 text-[10.5px]">{entry.dateRange}</div>
      </div>
      <div className="flex flex-col gap-1 pt-0.5 sm:pt-1">
        <div className="font-geist text-[13px] font-medium text-[color:var(--archive-text)]">
          {entry.role}
        </div>
        <p className="prose-body text-[13.5px] leading-[1.55] text-[color:var(--archive-muted)]">
          {entry.description}
        </p>
      </div>
    </motion.div>
  )
}

function WorkSection() {
  return (
    <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,240px)] md:gap-16 lg:gap-24">
      <div className="flex flex-col gap-4 md:order-2">
        <SectionHeader>The Work.</SectionHeader>
        <div className="meta-line text-[10.5px] text-[color:var(--archive-muted)]">
          2020 → present
        </div>
      </div>

      <div className="flex flex-col gap-14 md:order-1">
        {/* Current — full flagship treatment for each */}
        <div className="flex flex-col gap-12">
          {CAREER_CURRENT.map((entry, i) => (
            <CurrentEntry key={entry.title} entry={entry} index={i} />
          ))}
        </div>

        {/* Previously — compact list */}
        {CAREER_PREVIOUS.length > 0 && (
          <div className="flex flex-col gap-6 border-t border-[color:var(--archive-border)] pt-8">
            <div className="meta-line text-[10.5px] text-[color:var(--archive-muted)]">
              Previously
            </div>
            <div className="flex flex-col gap-5">
              {CAREER_PREVIOUS.map((entry, i) => (
                <PreviousEntry key={entry.title} entry={entry} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Notable Ships — 2-item supporting-cast grid                        */
/* ------------------------------------------------------------------ */

function NotableShipsSection() {
  return (
    <section>
      {/* Header row spans full width */}
      <div className="mb-8 flex flex-col gap-3">
        <SectionHeader>Standouts.</SectionHeader>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="max-w-md font-fraunces text-[1.125rem] font-normal italic leading-snug tracking-tight text-[color:var(--archive-muted)]"
        >
          Past work that keeps compounding.
        </motion.p>
      </div>

      {/* Cards spread across the full 1200px */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {NOTABLE_SHIPS.map((card, i) => (
          <Card key={card.title} card={card} index={i} layout="grid" />
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Now                                                                */
/* ------------------------------------------------------------------ */

function NowSection() {
  return (
    <section>
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-12 lg:gap-16">
        {/* LEFT (desktop): giant pull-quote of the voice line.
            Mobile order: appears second (after the header block) via source
            order combined with md:order-1 on desktop. We want header-first on
            mobile for scannability, so the pull-quote block gets md:order-1
            while sitting second in the JSX. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="order-2 md:order-1"
        >
          <blockquote className="font-fraunces text-[color:var(--archive-text)] font-medium leading-[1.05] tracking-[-0.02em] text-[clamp(2.5rem,6vw,4.5rem)]">
            {NOW_LEAD}
          </blockquote>
        </motion.div>

        {/* RIGHT (desktop): section header + body paragraph. Appears FIRST on
            mobile for scannability. */}
        <div className="order-1 flex flex-col gap-4 md:order-2">
          <SectionHeader>Now.</SectionHeader>
          <p className="prose-body max-w-[36rem] text-[color:var(--archive-muted)]">
            {NOW_BODY}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Follow                                                             */
/* ------------------------------------------------------------------ */

function FollowSection() {
  const [primary, ...secondary] = FOLLOW_LINKS

  return (
    <section>
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-12 lg:gap-16">
        {/* LEFT: header + intro + secondary links + email. Renders first on
            both mobile and desktop (source order = mobile order). */}
        <div>
          <SectionHeader>Follow.</SectionHeader>
          <p className="prose-body mt-4 mb-8 max-w-[36rem] text-[color:var(--archive-muted)]">
            {FOLLOW_INTRO}
          </p>

          {/* Secondary row — compact, dot-separated. Skips LinkedIn (primary). */}
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-geist text-[13px] text-[color:var(--archive-muted)]">
            {secondary.map((link, i) => {
              const isInternal = link.href.startsWith('/')
              const linkClass =
                'inline-flex items-center gap-1 transition-colors duration-200 hover:text-[color:var(--archive-text)]'
              const inner = (
                <>
                  {link.label}
                  <ArrowUpRight className="h-3 w-3" />
                </>
              )
              return (
                <span
                  key={link.href}
                  className="inline-flex items-center gap-3"
                >
                  {isInternal ? (
                    <Link href={link.href} className={linkClass}>
                      {inner}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={linkClass}
                    >
                      {inner}
                    </a>
                  )}
                  {i < secondary.length - 1 && (
                    <span
                      aria-hidden
                      className="text-[color:var(--archive-border)]"
                    >
                      ·
                    </span>
                  )}
                </span>
              )
            })}
          </div>

        </div>

        {/* RIGHT: LinkedIn "ad module" — bordered, tinted, self-contained. */}
        {primary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-2xl border border-[color:var(--archive-border)] bg-[color:var(--archive-hover)] p-6 sm:p-8"
          >
            <div className="meta-line mb-3 text-[10.5px] text-[color:var(--archive-muted)]">
              PRIMARY
            </div>
            <h3 className="mb-4 font-fraunces text-2xl font-medium leading-tight text-[color:var(--archive-text)]">
              Follow on {primary.label}.
            </h3>
            <p className="prose-body mb-6 text-[color:var(--archive-muted)] text-sm">
              Where the daily build-in-public happens.
            </p>
            <a
              href={primary.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--archive-text)] px-5 py-3 font-geist text-sm font-medium text-[color:var(--archive-bg)] transition-transform duration-200 hover:scale-[1.02] hover:gap-3"
            >
              Follow
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
      <Hero />
      <StatsStrip />

      {/* Editorial two-column section stack */}
      <div className="flex flex-col gap-24 pt-24 sm:gap-28 sm:pt-28 lg:gap-32 lg:pt-32">
        <ShowSection />
        <WorkSection />
        <NotableShipsSection />
        <NowSection />
        <FollowSection />
      </div>
    </div>
  )
}
