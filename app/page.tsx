import { CAREER_CURRENT, CAREER_PREVIOUS, NOTABLE_SHIPS, SHOW } from './data'

export default function Home() {
  return (
    <div className="home">
      <section className="home-intro">
        <h1>Hi, I’m Rudy.</h1>
        <p>Engineer, founder, and curious person in Toronto.<br />I like to make things.</p>
      </section>
      <section>
        <h2 className="section-label">Currently</h2>
        {CAREER_CURRENT.map(entry => (
          <div className="entry" key={entry.title}>
            <h3><a href={entry.links?.[0]?.url}>{entry.title}</a></h3>
            <p className="meta">{entry.role}</p>
            <p>{entry.description}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="section-label">Previous</h2>
        {CAREER_PREVIOUS.map(entry => (
          <div className="entry" key={entry.title}>
            <h3>{entry.links?.[0] ? <a href={entry.links[0].url}>{entry.title}</a> : entry.title}</h3>
            <p className="meta">{entry.role}</p>
            <p>{entry.description}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="section-label">Selected projects</h2>
        <ul className="plain-list">{NOTABLE_SHIPS.map(project => (
          <li key={project.title}><h3><a href={project.links[0].url}>{project.title}</a></h3><p>{project.hook}</p></li>
        ))}</ul>
      </section>
      <section>
        <h2 className="section-label">Podcast</h2>
        <h3><a href={SHOW.primaryLinks[0].url}>{SHOW.name}</a></h3>
        <p>Conversations with operators about how tech companies get built, scaled, and sold.</p>
        <p className="meta">{SHOW.episodeCountMeta}</p>
      </section>
      <section className="elsewhere">
        <h2 className="section-label">Say hello</h2>
        <p>Find me on <a href="https://github.com/whyismynamerudy">GitHub</a> and <a href="https://www.linkedin.com/in/rudraksh-monga/">LinkedIn</a>.</p>
      </section>
    </div>
  )
}
