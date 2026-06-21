import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  settingsQuery,
  teamQuery,
  servicesQuery,
  storiesQuery,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  let settings: any = null,
    team: any[] = [],
    services: any[] = [],
    stories: any[] = [];
  try {
    [settings, team, services, stories] = await Promise.all([
      client.fetch(settingsQuery),
      client.fetch(teamQuery),
      client.fetch(servicesQuery),
      client.fetch(storiesQuery),
    ]);
  } catch (e) {
    console.error("Sanity fetch failed (is the project seeded?):", e);
  }

  const s = settings || {};

  return (
    <>
      {/* NAV */}
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="nav-logo">
            {s.logo ? (
              <img src={urlFor(s.logo).height(80).url()} alt="Momentum Mentoring" />
            ) : (
              "Momentum"
            )}
          </a>
          <nav className="nav-links">
            <a href="#team">Team</a>
            <a href="#services">Services</a>
            <a href="#stories">Stories</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="container">
          <span className="badge">{s.badgeText || "Registered Provider"}</span>
          <h1>
            {s.heroHeadline ||
              "Building identity through choice, voice, and independence."}
          </h1>
          <div className="hero-contact">
            {s.email && <a href={`mailto:${s.email}`}>{s.email}</a>}
            {s.location && <span>{s.location}</span>}
          </div>
          {s.heroImage && (
            <div className="hero-img">
              <img src={urlFor(s.heroImage).width(2000).url()} alt="" />
            </div>
          )}
        </div>
      </section>

      {/* TEAM */}
      <section id="team">
        <div className="container">
          <p className="eyebrow">Our Team</p>
          <h2 className="section-tagline">
            {s.teamTagline ||
              "Let's turn challenges into wins, one goal at a time."}
          </h2>
          <div className="team-grid">
            {team?.map((m: any) => (
              <article className="team-card" key={m._id}>
                <div className="team-photo">
                  {m.photo && (
                    <img
                      src={urlFor(m.photo).width(500).height(500).fit("crop").url()}
                      alt={m.name}
                    />
                  )}
                </div>
                <div className="team-body">
                  <h3>{m.name}</h3>
                  <p className="team-role">{m.role}</p>
                  {m.quote && <p className="team-quote">“{m.quote}”</p>}
                  {m.bio && <p className="team-bio">{m.bio}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <p className="eyebrow">What We Do</p>
          <h2 className="section-tagline">Our Services</h2>
          <div className="services-grid">
            {services?.map((sv: any) => (
              <article className="service-card" key={sv._id}>
                <div className="service-illus">
                  {sv.illustration && (
                    <img src={urlFor(sv.illustration).width(300).url()} alt="" />
                  )}
                </div>
                <h3>{sv.title}</h3>
                <p>{sv.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section id="stories">
        <div className="container">
          <p className="eyebrow">Success Stories</p>
          <h2 className="section-tagline">Real progress, real wins.</h2>
          {stories?.map((st: any) => (
            <article className="story" key={st._id}>
              <div className="story-photo">
                {st.photo && (
                  <img src={urlFor(st.photo).width(560).url()} alt={st.title} />
                )}
              </div>
              <div>
                <h3>{st.title}</h3>
                {st.clientName && (
                  <p className="story-client">{st.clientName}</p>
                )}
                <p>{st.story}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container contact-grid">
          <h2>Let’s start the journey together.</h2>
          <div>
            {s.email && (
              <p className="contact-detail">
                <a href={`mailto:${s.email}`}>{s.email}</a>
              </p>
            )}
            {s.location && <p className="contact-detail">{s.location}</p>}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container footer-inner">
          <p className="footer-text">
            {s.footerText ||
              "Momentum Mentoring is committed to providing NDIS disability services for younger males in Adelaide, South Australia, accessible to people with disabilities."}
          </p>
          {s.ndisLogo && (
            <div className="footer-ndis">
              <img src={urlFor(s.ndisLogo).height(96).url()} alt="NDIS Registered Provider" />
            </div>
          )}
        </div>
        <div className="container">
          <p className="footer-credit">
            Website by <a href="https://finbar.studio">Finbar.Studio</a>
          </p>
        </div>
      </footer>
    </>
  );
}
