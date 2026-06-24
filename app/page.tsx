import Nav from "@/components/Nav";
import HeroMAnim from "@/components/HeroMAnim";
import Team, { TeamMember } from "@/components/Team";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollFX from "@/components/ScrollFX";
import ContactForm from "@/components/ContactForm";
import { client } from "@/sanity/lib/client";
import {
  settingsQuery,
  teamQuery,
  servicesQuery,
  storiesQuery,
} from "@/sanity/lib/queries";

export const revalidate = 60;

const A = "/assets/"; // fixed brand assets (logos, video) live in code

// fallbacks so the page renders even before Sanity is seeded
const DEFAULT_HEADLINE =
  "Building identity through choice, voice, and independence.";
const DEFAULT_EMAIL = "info@momentummentoring.co";
const DEFAULT_LOCATION = "Plympton, SA, 5038.";
const DEFAULT_MAPS = "https://maps.google.com/?q=Plympton+SA+5038";
const DEFAULT_INTRO =
  "For inquiries, appointments, or to learn more about Momentum Mentoring and NDIS services, fill in the form below, or contact us directly!";
const DEFAULT_FOOTER =
  "At Momentum Mentoring, we are committed to providing disability services through National Disability Insurance Scheme (NDIS) that includes mentoring for younger males. Based in Adelaide, South Australia, we strive to ensure our website is accessible to people with disabilities. Please note that you are responsible for ensuring that your site's statement meets the requirements of the local laws in your area or region.";

export default async function Home() {
  let settings: any = {};
  let team: any[] = [];
  let services: any[] = [];
  let stories: any[] = [];
  try {
    [settings, team, services, stories] = await Promise.all([
      client.fetch(settingsQuery),
      client.fetch(teamQuery),
      client.fetch(servicesQuery),
      client.fetch(storiesQuery),
    ]);
  } catch (e) {
    console.error("Sanity fetch failed (is it seeded?):", e);
  }
  settings = settings || {};

  const members: TeamMember[] = (team || []).map((t: any) => ({
    _id: t._id,
    name: t.name,
    role: t.role,
    full: t.fullBio || [],
    photo: t.photo,
    s: t.photoZoom ?? 1,
    y: t.photoOffsetY ?? 0,
  }));

  const email = settings.email || DEFAULT_EMAIL;
  const location = settings.location || DEFAULT_LOCATION;
  const mapsUrl = settings.mapsUrl || DEFAULT_MAPS;

  return (
    <>
      <SmoothScroll />
      <ScrollFX />
      <Nav />
      <HeroMAnim />

      {/* HERO */}
      <header className="hero2" id="top">
        <div className="hero2__inner">
          <div className="hero2__brand">
            <img className="hero2__mark" src={`${A}svg/LM2_1.svg`} alt="Momentum Mentoring" />
            <img className="hero2__ndis" src={`${A}B0jo87FLvVYTrBJcqCC6zOFBnpY.png`} alt="NDIS Registered Provider" />
          </div>
          <h1 className="hero2__headline">
            {settings.heroHeadline || DEFAULT_HEADLINE}
          </h1>
          <a className="draw-link hero2__cta" href="#contact">
            Contact us
            <svg className="hero2__cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
        </div>

        <div className="hero2__logoart" aria-hidden="true">
          <img className="hero2__outlineM" src={`${A}svg/lm-line.svg`} alt="" />
          <div className="hero2__videomask">
            <video className="hero2__video" src={`${A}hero-video.min.mp4`} autoPlay muted loop playsInline />
            <span className="hero2__videotint" />
          </div>
        </div>

        <div className="hero2__veil" aria-hidden="true" />
      </header>

      {/* TEAM */}
      <Team members={members} />

      {/* SERVICES */}
      <section className="sec sec--services" id="services">
        <div className="wrap">
          <h2 className="sec__head">Our Services</h2>
          <div className="services">
            {(services || []).map((s: any) => (
              <article className="service" key={s._id}>
                <div className="service__illus">
                  {s.illustration && <img src={s.illustration} alt="" />}
                </div>
                <h3 className="service__title">{s.title}</h3>
                <p className="service__desc">{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="sec sec--stories" id="stories">
        <div className="wrap">
          <h2 className="sec__head">Making a Difference</h2>
          <div className="stories">
            {(stories || []).map((st: any) => (
              <article className="story2" key={st._id}>
                <div className="story2__photo">
                  {st.photo && <img src={st.photo} alt={st.title} />}
                </div>
                <div className="story2__body">
                  <h3 className="story2__title">{st.title}</h3>
                  {st.clientName && (
                    <p className="story2__client">{st.clientName}</p>
                  )}
                  <p className="story2__text">{st.story}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec sec--contact" id="contact">
        <div className="wrap">
          <h2 className="sec__head">Contact Us</h2>
          <p className="contact__intro">{settings.contactIntro || DEFAULT_INTRO}</p>
          <p className="contact__direct">
            <a className="draw-link" href={`mailto:${email}`}>
              {email}
            </a>
            <br />
            <a className="draw-link" href={mapsUrl} target="_blank" rel="noopener">
              {location}
            </a>
          </p>
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer2">
        <div className="wrap footer2__grid">
          <div className="footer2__left">
            <div className="footer2__logos">
              <img className="footer2__mlogo" src={`${A}svg/tKW6w9ldUBZKXmoOfzOe2ER9Yw.svg`} alt="Momentum Mentoring" />
              <img className="footer2__ndis" src={`${A}svg/LCuuNV6sIk1wn0QQ80Wwvy7qKHc.svg`} alt="NDIS" />
            </div>
            <p className="footer2__info">
              <a href={`mailto:${email}`}>{email}</a>
              <br />
              <a href={mapsUrl} target="_blank" rel="noopener">
                {location}
              </a>
            </p>
          </div>

          <div className="footer2__vr" aria-hidden="true" />

          <div className="footer2__right">
            <p className="footer2__statement">
              {settings.footerStatement || DEFAULT_FOOTER}
            </p>
            <div className="footer2__credit-row">
              <span className="footer2__heart" aria-hidden="true">
                ♡
              </span>
              <p className="footer2__credit">
                WEB DESIGN AND DEVELOPMENT{" "}
                <a href="https://www.finbar.studio" target="_blank" rel="noopener">
                  FINBAR.STUDIO
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
