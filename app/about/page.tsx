import type { Metadata } from 'next'
import { CONTACT_EMAIL } from '../data'

export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: '/about' },
}

export default function About() {
  return (
    <article className="document">
      <h1>About me</h1>
      <p>I’m Rudy, a software engineer, founder, and podcast host based in Toronto.</p>
      <p>I like making things and understanding how other people make theirs. That curiosity led me to start <a href="https://www.youtube.com/@NotAMinimumViablePodcast">Not A Minimum Viable Podcast</a>, where I talk with operators about how tech companies actually get built.</p>
      <p>Outside of tech, I’m a hip-hop nerd. I also hold a Guinness World Record.</p>
      <p>You can find me on <a href="https://github.com/whyismynamerudy">GitHub</a> and <a href="https://www.linkedin.com/in/rudraksh-monga/">LinkedIn</a>, or say hello at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </article>
  )
}
