import Nav from "@/components/Nav";
import HeroMAnim from "@/components/HeroMAnim";
import Team from "@/components/Team";
import SmoothScroll from "@/components/SmoothScroll";

const SERVICES = [
  { title: "Group Activities", desc: "Community engagement and active collaboration to bring out the best qualities in every participant.", img: "qBMjbvtQSrmTZQjLwalb6fOiqSo.png" },
  { title: "Goal Setting Based Approach", desc: "We consult with clients and families to help each young person fulfil their complete potential.", img: "bJNkd0te1agtsu6g0CadBptjs.png" },
  { title: "One-on-One Mentoring", desc: "Tailored sessions aligned with NDIS categories 01, 04, 09 and Therapy Assist, drawing on Self Care, Access Community, and Therapy Assist services.", img: "bLeWVrJ7ZzVc7GPSnUwkbJrWpHQ.png" },
];

const STORIES = [
  { title: "Riding a Bike", client: "Abhay", photo: "289vep1HQVyCdDE8xmATQjAmCZw.png", story: "Abhay achieved bike riding proficiency in approximately one month. He progressed from needing significant support to riding with minimal supervision, and can now ride independently from home to the park and back." },
  { title: "Obtaining L Plates", client: "Jackson", photo: "VtoOJ2BEovuwlX9CsKHhKNLUt0.png", story: "After celebrating his 16th birthday, Jackson was very keen to sit his learners test at Service SA. After undertaking numerous practice modules, Jackson felt he was ready to have a go at the real thing. We were super proud that he aced the test first go and received his L's straight away. We are now working alongside Jackson to help him build road safety awareness and become a more proficient driver behind the wheel!" },
];

const A = "/assets/";

export default function Home() {
  return (
    <>
      <SmoothScroll />
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
            Building identity through choice, voice, and independence.
          </h1>
          <a className="draw-link hero2__cta" href="#contact">
            Contact us
            <span className="hero2__cta-arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="hero2__logoart" aria-hidden="true">
          {/* outline M (dark blue) — will animate forward/down on scroll */}
          <img className="hero2__outlineM" src={`${A}svg/lm-line.svg`} alt="" />
          {/* video clipped into the M, with a blue overlay — animates back/up */}
          <div className="hero2__videomask">
            <video
              className="hero2__video"
              src={`${A}hero-video.min.mp4`}
              autoPlay
              muted
              loop
              playsInline
            />
            <span className="hero2__videotint" />
          </div>
        </div>

        {/* darken layer for the "fall away" recede */}
        <div className="hero2__veil" aria-hidden="true" />
      </header>

      {/* TEAM */}
      <Team />

      {/* SERVICES */}
      <section className="sec sec--services" id="services">
        <div className="wrap">
          <h2 className="sec__head">Our Services</h2>
          <div className="services">
            {SERVICES.map((s) => (
              <article className="service" key={s.title}>
                <div className="service__illus">
                  <img src={`${A}${s.img}`} alt="" />
                </div>
                <h3 className="service__title">{s.title}</h3>
                <p className="service__desc">{s.desc}</p>
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
            {STORIES.map((st) => (
              <article className="story2" key={st.title}>
                <div className="story2__photo">
                  <img src={`${A}${st.photo}`} alt={st.title} />
                </div>
                <div className="story2__body">
                  <h3 className="story2__title">{st.title}</h3>
                  <p className="story2__client">{st.client}</p>
                  <p className="story2__text">{st.story}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="sec sec--contact" id="contact">
        <div className="wrap contact2">
          <h2 className="contact2__head">Let's start the journey together.</h2>
          <div className="contact2__details">
            <a className="sq-link" href="mailto:info@momentummentoring.co">info@momentummentoring.co</a>
            <p>Plympton, SA, 5038</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer2">
        <div className="wrap footer2__inner">
          <img className="footer2__mark" src={`${A}svg/logo-white.svg`} alt="Momentum Mentoring" />
          <p className="footer2__text">
            Momentum Mentoring is committed to providing NDIS disability services for younger
            males in Adelaide, South Australia, and is accessible to people with disabilities.
          </p>
          <img className="footer2__ndis" src={`${A}B0jo87FLvVYTrBJcqCC6zOFBnpY.png`} alt="NDIS Registered Provider" />
        </div>
        <div className="wrap footer2__credit">
          <span>© Momentum Mentoring</span>
          <a href="https://finbar.studio">Website by Finbar.Studio</a>
        </div>
      </footer>
    </>
  );
}
