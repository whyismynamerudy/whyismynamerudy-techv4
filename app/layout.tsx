import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Fraunces, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF8F3',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://whyismynamerudy.tech/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Rudy Monga — Building things that compound.',
    template: '%s | Rudy Monga',
  },
  description:
    "Rudy Monga — Senior full-stack engineer at Stan, building for YouTube creators. Co-Founder & CTO of VantEdge, the platform for building AI-native internal applications. Host of Not A Minimum Viable Podcast. Guinness World Record holder. Toronto.",
  openGraph: {
    type: 'website',
    url: 'https://whyismynamerudy.tech',
    title: 'Rudy Monga — Building things that compound.',
    description:
      "Senior @ Stan. Co-Founder & CTO @ VantEdge. Host of Not A Minimum Viable Podcast.",
    siteName: 'Rudy Monga',
    images: [{ url: '/rudy-portrait.jpg', width: 1600, height: 2400, alt: 'Rudy Monga' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rudy Monga — Building things that compound.',
    description:
      "Senior @ Stan. Co-Founder & CTO @ VantEdge. Host of Not A Minimum Viable Podcast.",
    images: ['/rudy-portrait.jpg'],
  },
  authors: [{ name: 'Rudraksh Monga', url: 'https://whyismynamerudy.tech' }],
  creator: 'Rudraksh Monga',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://whyismynamerudy.tech/#person',
      name: 'Rudraksh Monga',
      alternateName: ['Rudy Monga', 'whyismynamerudy'],
      url: 'https://whyismynamerudy.tech',
      image: 'https://whyismynamerudy.tech/rudy-portrait.jpg',
      jobTitle: 'Senior Full-Stack Software Engineer',
      description:
        'Senior full-stack engineer at Stan, building for YouTube creators. Co-Founder & CTO of VantEdge, the platform for building AI-native internal applications. Host of Not A Minimum Viable Podcast.',
      worksFor: [
        { '@type': 'Organization', name: 'Stan', url: 'https://stan.store' },
        { '@id': 'https://vantedge.run/#organization' },
      ],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Toronto',
        url: 'https://www.utoronto.ca',
      },
      knowsAbout: [
        'Autonomous AI agents',
        'Applied artificial intelligence',
        'Large language model agents',
        'Machine learning',
        'AI for the physical economy',
      ],
      award: 'Guinness World Record',
      homeLocation: {
        '@type': 'Place',
        name: 'Toronto, Canada',
      },
      sameAs: [
        'https://www.linkedin.com/in/rudraksh-monga/',
        'https://github.com/whyismynamerudy',
        'https://whyismynamerudy.substack.com/',
        'https://www.youtube.com/@NotAMinimumViablePodcast',
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://vantedge.run/#organization',
      name: 'VantEdge',
      url: 'https://vantedge.run',
      description:
        'The platform for building AI-native internal applications. University of Toronto AI/ML spinout.',
      founder: { '@id': 'https://whyismynamerudy.tech/#person' },
    },
    {
      '@type': 'PodcastSeries',
      '@id': 'https://whyismynamerudy.tech/#podcast',
      name: 'Not A Minimum Viable Podcast',
      alternateName: 'Not A MVP',
      description:
        'Conversations with people building things that compound. Host Rudy Monga sits down with operators for the behind-the-scenes of how tech companies actually get built, scaled, and sold.',
      url: 'https://www.youtube.com/@NotAMinimumViablePodcast',
      author: { '@id': 'https://whyismynamerudy.tech/#person' },
      inLanguage: 'en',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://whyismynamerudy.tech/#website',
      name: 'Rudy Monga',
      url: 'https://whyismynamerudy.tech',
      author: { '@id': 'https://whyismynamerudy.tech/#person' },
      inLanguage: 'en',
    },
  ],
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

// Fraunces — variable font. Omitting `weight` loads the full variable range
// (which lets us use font-weight 400/500/600 in CSS), and `axes: ['opsz']`
// enables optical size variation so display sizes get the display-optimized cut.
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${fraunces.variable} ${instrumentSerif.variable} archive-body antialiased`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
