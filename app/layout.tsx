import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
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
    "Rudy Monga — Senior full-stack engineer at Stan, building for YouTube creators. Previously Co-Founder & CTO of VantEdge, the platform for building AI-native internal applications. Host of Not A Minimum Viable Podcast. Guinness World Record holder. Toronto.",
  openGraph: {
    type: 'website',
    url: 'https://whyismynamerudy.tech',
    title: 'Rudy Monga — Building things that compound.',
    description:
      "Senior @ Stan. Previously Co-Founder & CTO @ VantEdge. Host of Not A Minimum Viable Podcast.",
    siteName: 'Rudy Monga',
    images: [{ url: '/rudy-portrait.jpg', width: 1600, height: 2400, alt: 'Rudy Monga' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rudy Monga — Building things that compound.',
    description:
      "Senior @ Stan. Previously Co-Founder & CTO @ VantEdge. Host of Not A Minimum Viable Podcast.",
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
        'Senior full-stack engineer at Stan, building for YouTube creators. Previously Co-Founder & CTO of VantEdge, the platform for building AI-native internal applications. Host of Not A Minimum Viable Podcast.',
      worksFor: [
        { '@type': 'Organization', name: 'Stan', url: 'https://stan.store' },
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
      <body>
        <div className="site-shell">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
