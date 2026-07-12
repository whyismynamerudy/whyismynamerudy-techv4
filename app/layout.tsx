import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
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
    "The archive of everything I've built, contributed to, and shipped. CTO of VantEdge. Host of Not A Minimum Viable Podcast.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${fraunces.variable} archive-body antialiased`}
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
