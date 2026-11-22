// Content for the personal site. The middle of the page is organized as a
// small number of intentional sections (Show → Company → Notable Ships →
// Now → Follow) rather than a flat archive, so hierarchy reads clearly:
// the podcast is the primary conversion surface, VantEdge is the flagship,
// and past standouts sit downstream as supporting evidence.

export type ThreadLink = {
  label: string
  url: string
}

export type ThreadMetric = {
  value: string
  label: string
}

export type Card = {
  title: string
  eyebrow?: string
  hook: string
  date?: string
  metric?: ThreadMetric
  links: ThreadLink[]
}

export type FlagshipEntry = {
  title: string
  role: string
  dateRange: string
  description: string
  links: ThreadLink[]
}

// Retained for future reuse; currently unused after the refactor.
export type FoundationItem = {
  title: string
  date: string
  detail?: string
}

/** Hero content. */
export const HERO = {
  headline: 'Building things that compound.',
  elevator:
    "Senior full-stack engineer at Stan, building Stanley, an AI assistant you can text. Previously Co-Founder & CTO of VantEdge, the platform for building AI-native internal applications. Host of Not A Minimum Viable Podcast, where I sit down with operators for the behind-the-scenes of how tech companies actually get built, scaled, and sold. Guinness World Record holder. Hip-hop nerd. Toronto.",
  portrait: '/rudy-portrait.jpg',
}

/** Small credential-stack line rendered directly under the H1 in the hero. */
export const HERO_CREDENTIALS =
  'SWE @ STAN  ·  CO-FOUNDER & CTO @ VANTEDGE  ·  PREV @ AWS  ·  TORONTO'

/** Hero stats displayed in the strip below the intro. */
export type HeroStat = {
  target: number
  display: string
  label: string
}

export const HERO_STATS: HeroStat[] = [
  { target: 700000, display: '700K+', label: 'Views across my posts' },
  { target: 10000, display: '10K+', label: 'Reactions across my posts' },
  { target: 2000, display: '2,000+', label: 'DAUs on open-source tools' },
  { target: 63, display: '63', label: 'Public GitHub repositories' },
  { target: 20, display: '20+', label: 'Shipped projects' },
  { target: 1, display: '1', label: 'Guinness World Record' },
]

/* ------------------------------------------------------------------ */
/* THE SHOW — dominant middle section, primary conversion surface     */
/* ------------------------------------------------------------------ */

export const SHOW: {
  title: string
  name: string
  tagline: string
  primaryLinks: ThreadLink[]
  episodeCountMeta: string
  cards: Card[]
} = {
  title: 'The Show.',
  name: 'Not A Minimum Viable Podcast',
  tagline: 'Conversations with people building things that compound.',
  primaryLinks: [
    {
      label: 'Watch on YouTube',
      url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
    },
  ],
  episodeCountMeta: '18 episodes · Season 2 in progress',
  cards: [
    {
      title: 'Gaurav Verma',
      eyebrow: 'EP · CMO / MARKETING ENGINEER',
      hook:
        "The next $500K role that doesn't exist in most org charts. On why prompt engineers are done and the marketing engineer is coming.",
      date: 'AUG 2026',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Shawn Gong',
      eyebrow: 'EP · EX-TINDER',
      hook:
        'Monetization loops that fuel growth. 14 years of paywalls that work.',
      date: 'JUL 2026',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Archit Anand',
      eyebrow: 'EP · GTM',
      hook:
        'The $0-$1M enterprise sales playbook. Built three GTM engines from scratch.',
      date: 'JUN 2026',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Phil Miller & Theo Ephraim',
      eyebrow: 'EP · VARLOCK / DMNO',
      hook:
        'Open source as company-building strategy. On MIT-licensed distribution.',
      date: 'MAY 2026',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Rowan',
      eyebrow: 'EP · AI STARTUP',
      hook:
        'Why he shut down his AI startup with thousands of users. On when the numbers don\'t save you.',
      date: 'SEP 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Yacine',
      eyebrow: 'EP · NEUROSCIENCE',
      hook:
        'Is your ego killing your startup? A neuroscientist\'s ego-free approach.',
      date: 'AUG 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Ming',
      eyebrow: 'EP · WATERLOO → BIG TECH',
      hook:
        'Student founder to Big Tech. Why this Waterloo grad chose both paths.',
      date: 'AUG 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'OpenSesame',
      eyebrow: 'EP · A16Z-BACKED',
      hook:
        'From zero to A16z backing. The speed-first philosophy behind OpenSesame.',
      date: 'JUL 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Anderson Yang',
      eyebrow: 'EP · SUPPLY CHAIN',
      hook:
        'Being 20 no\'s away from a yes is worth it. On perseverance in supply chain.',
      date: 'JUL 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Hussam',
      eyebrow: 'EP · EARLY-STAGE PRODUCT',
      hook:
        'The truth about building products at early-stage startups.',
      date: 'JUN 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Adib',
      eyebrow: 'EP · AI RESEARCH',
      hook:
        'From Iranian biology champion to AI genius at 20.',
      date: 'JUN 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Sid',
      eyebrow: 'EP · AI UNICORN',
      hook:
        'What it\'s really like inside an AI unicorn during the ChatGPT explosion.',
      date: 'MAY 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Omar',
      eyebrow: 'EP · DESIGN ENGINEERING',
      hook:
        'Design engineering and balancing tech with creative pursuits.',
      date: 'MAY 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Flo',
      eyebrow: 'EP · NEO TORONTO',
      hook:
        'Waterloo BME dropout turned independent designer. On personal software as love language.',
      date: 'MAY 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Kelindi',
      eyebrow: 'EP · WEB3 / USER-CONTROLLED DATA',
      hook:
        'Full-stack engineer prioritizing creativity over conventional tools. On user-controlled data layers.',
      date: 'APR 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Sergiy',
      eyebrow: 'EP · FRONTEND / FOUNDING ENG',
      hook:
        'Frontend developer and founding engineer at Actual. Ukraine to Toronto, community building along the way.',
      date: 'MAR 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Josh',
      eyebrow: 'EP · TEMPO LABS (YC23)',
      hook:
        'Commerce student with consulting background now driving growth at Tempo Labs.',
      date: 'MAR 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
    {
      title: 'Mitul',
      eyebrow: 'EP · PHOTOGRAPHY / DESIGN',
      hook:
        'Photographer turned design engineer. On the creative journey through tech and community building in Toronto.',
      date: 'FEB 2025',
      links: [
        {
          label: 'YouTube',
          url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
        },
      ],
    },
  ],
}

/* ------------------------------------------------------------------ */
/* THE WORK — unified career section                                  */
/* ------------------------------------------------------------------ */

export type CareerEntry = {
  title: string
  role: string
  dateRange: string
  description: string
  links?: ThreadLink[]
}

/** Reverse-chronological career. Current entries render prominently as
 *  current work; subsequent entries render as a compact "Previously" list. */
export const CAREER_CURRENT: CareerEntry[] = [
  {
    title: 'Stan',
    role: 'Senior Full-Stack Software Engineer',
    dateRange: 'Aug 2026 → present',
    description:
      'Building Stanley, an AI assistant that helps creators draft, schedule, and publish social posts through chat. I work on making it something people keep coming back to, and finding ways to make the AI behind it faster and less expensive to run. I also help take new product ideas from early experiments to their first customers.',
    links: [{ label: 'stan.store', url: 'https://stan.store' }],
  },

]

export const CAREER_PREVIOUS: CareerEntry[] = [
  {
    title: 'VantEdge',
    role: 'Co-Founder & CTO',
    dateRange: '2025',
    description:
      'The platform for building AI-native internal applications. UofT AI/ML spinout.',
    links: [{ label: 'vantedge.run', url: 'https://vantedge.run' }],
  },
  {
    title: 'Amazon Web Services',
    role: 'Software Engineer Intern',
    dateRange: 'May–Aug 2025',
    description: 'Anomaly detection.',
  },
  {
    title: 'Intact Insurance',
    role: 'Infrastructure Operations',
    dateRange: '2023–2024',
    description:
      '150% parallel build capacity. 97% release cycle acceleration.',
  },
  {
    title: 'University of Toronto',
    role: 'ML Research (Prof. Ashton Anderson)',
    dateRange: '2022–2024',
    description: 'RAG for knowledge-graph query answering.',
  },
  {
    title: 'Speech Classification Paper',
    role: 'Published Research',
    dateRange: 'April 2020',
    description:
      'Particle Swarm Optimization applied to speech classification.',
  },
]

/** Retained for backwards compat if any external ref lingers. */
export const COMPANY: FlagshipEntry = CAREER_PREVIOUS[0] as FlagshipEntry

/* ------------------------------------------------------------------ */
/* NOTABLE SHIPS — past standouts (2 items, 2-col grid)               */
/* ------------------------------------------------------------------ */

export const NOTABLE_SHIPS: Card[] = [
  {
    title: 'Visight',
    eyebrow: 'COMPUTER VISION',
    hook:
      'F1 sponsor exposure. Fine-tuned YOLOv8, TensorRT quantization, 86 brands detected frame-by-frame.',
    date: 'MAR 2026',
    metric: { value: '650K views', label: '9.5K reactions' },
    links: [
      {
        label: 'Writeup',
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7402760209376673792/',
      },
    ],
  },
  {
    title: 'Claude Folder Upload Helper',
    eyebrow: 'CHROME EXTENSION',
    hook:
      'Folder uploads to Claude projects. Live and actively used across the developer community.',
    date: '2024 → NOW',
    metric: { value: '2,000+', label: 'DAUs' },
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/whyismynamerudy/claude-folder-upload',
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* NOW — voice-y statement, first sentence styled prominent           */
/* ------------------------------------------------------------------ */

export const NOW_STATEMENT =
  "I like to make things. Currently: senior at Stan building Stanley, an AI assistant you can text. Recording Season 2 of Not A Minimum Viable Podcast — topically-focused conversations with operators I'd learn from anyway. Toronto."

/** Split forms of NOW_STATEMENT used by the Now section layout. The lead
 *  hangs off the left edge as a large Fraunces pull-quote; the body is the
 *  remaining paragraph that sits under the section header on the right. */
export const NOW_LEAD = 'I like to make things.'
export const NOW_BODY =
  "Currently: senior at Stan building Stanley, an AI assistant you can text. Recording Season 2 of Not A Minimum Viable Podcast — topically-focused conversations with operators I'd learn from anyway. Toronto."

/* ------------------------------------------------------------------ */
/* FOLLOW — LinkedIn foregrounded, everything else secondary          */
/* ------------------------------------------------------------------ */

/** External links surfaced in the Follow section. LinkedIn is primary. */
export const FOLLOW_LINKS: { label: string; href: string }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rudraksh-monga/' },
  {
    label: 'Podcast',
    href: 'https://www.youtube.com/@NotAMinimumViablePodcast',
  },
  { label: 'GitHub', href: 'https://github.com/whyismynamerudy' },
]

export const FOLLOW_INTRO =
  'Following along is the easiest way to see what compounds. New episodes drop on the podcast, and updates go up on LinkedIn.'

export const CONTACT_EMAIL = 'rudy@vantedge.run'
