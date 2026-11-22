import Link from 'next/link'

export function Header() {
  return (
    <header className="site-header">
      <Link className="site-name" href="/">Rudy Monga</Link>
      <nav aria-label="Main navigation">
        <Link href="/about">About</Link>
      </nav>
    </header>
  )
}
