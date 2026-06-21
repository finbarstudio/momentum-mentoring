"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

type Member = {
  name: string;
  role: string;
  photo: string;
  short: string;
  full: string[];
  s?: number;
  y?: number;
};

const A = "/assets/";

const TEAM: Member[] = [
  {
    name: "Lachie",
    role: "Co-Director / Service Manager",
    photo: "uoY4pAEwUPiQzpQWulknSBm2uM.png",
    s: 1.05,
    short:
      "Four and a half years of Educational Support experience at Saint John Bosco Primary School, leading 1:1 and group mentoring across Momentum.",
    full: [
      "Trained across ASD, ADHD, speech disorders, ODD, PDA, and Trauma.",
      "Long sporting background in cricket, football, and basketball at high levels, with an active lifestyle to match.",
      "Co-Director and Service Manager who uses every bit of his experience to help each client reach their specific goals.",
      "Four and a half years of Educational Support experience at Saint John Bosco Primary School, leading 1:1 and group mentoring across Momentum.",
    ],
  },
  {
    name: "Aryan",
    role: "Co-Director / Business Management",
    photo: "y1xwLfg07gux4gNOCdAtip7DElY.png",
    s: 1.0,
    short:
      "Holds a Masters of Physiotherapy with ongoing studies in Neurological Physiotherapy, bringing deep expertise in functional movement.",
    full: [
      "Screens and matches participants with the right mentor to ensure goals are met holistically.",
      "Met Lachie in 2012 through representative sport and has shared the active lifestyle ever since.",
      "Combines clinical knowledge with a people-first approach to business management.",
      "Holds a Masters of Physiotherapy with ongoing studies in Neurological Physiotherapy, bringing deep expertise in functional movement.",
    ],
  },
  {
    name: "Andrea",
    role: "Mentor",
    photo: "aMqXFpFgqn4juw5zZ1ipxZmRiQ4.png",
    s: 1.0,
    short:
      "Compassionate and bubbly with a year of experience as a Student Support Officer and a strong passion for wellbeing.",
    full: [
      "Studying a Bachelor of Education (Health and Physical Education) at Flinders University.",
      "Has played, umpired, and coached basketball and netball, with strong community ties to her hometown of Bordertown.",
      "Believes motivation is the key to growth and uses her supportive personality to help participants reach their goals.",
      "Compassionate and bubbly with a year of experience as a Student Support Officer and a strong passion for wellbeing.",
    ],
  },
  {
    name: "Ned",
    role: "Mentor",
    photo: "UrSADaAy7Qiyg1GJM4vAWcSSuPs.png",
    s: 0.82,
    y: 3,
    short:
      "Brings two years of Support Work experience and a real passion for helping clients live as their truest selves.",
    full: [
      "Currently undertaking a Master's in Psychology at Flinders University, deepening his understanding of mindset and wellbeing.",
      "Punctual, hardworking, and high-quality in everything he does.",
      "Combines persistence with genuine support to guide clients in a positive direction.",
      "Brings two years of Support Work experience and a real passion for helping clients live as their truest selves.",
    ],
  },
  {
    name: "Harry",
    role: "Mentor",
    photo: "",
    short:
      "Bordertown local studying at Flinders University to become a secondary PE, Health, and Maths teacher.",
    full: [
      "Empathetic, personable, and organised, with a natural ability to connect and have a chat.",
      "Trained as a lifeguard, making him a standout in our hydrotherapy space.",
      "Loves the outdoors — recently returned from an 11-day trek in Nepal, reaching over 5000m above sea level.",
      "Bordertown local studying at Flinders University to become a secondary PE, Health, and Maths teacher.",
    ],
  },
  {
    name: "Owen",
    role: "Mentor",
    photo: "pDtxC165o0f9FCscciA7lgj9HiU.png",
    s: 1.0,
    short:
      "Fresh off two years travelling and working across Australia and Japan, bringing a worldly perspective to the team.",
    full: [
      "Known for his contagious smile, kind nature, and a soft but motivating touch.",
      "Has a real talent for pushing people to become the best version of themselves.",
      "A great worker and an even better human — a massive get for Momentum.",
      "Fresh off two years travelling and working across Australia and Japan, bringing a worldly perspective to the team.",
    ],
  },
  {
    name: "Arjun (Junny)",
    role: "Mentor",
    photo: "8VVARIsr7g50aJvW07geeiQK0.png",
    s: 1.45,
    y: 2,
    short:
      "Currently working as an ESO at Sacred Heart Middle School with Year 7–9 students across a range of disabilities.",
    full: [
      "Approachable and respectful, with strong leadership traits built through a big sporting background.",
      "Studying a double degree in Physiotherapy and Business at UniSA, deepening his understanding of how the body moves best.",
      "Committed to helping clients use their body actively, safely, and with confidence.",
      "Currently working as an ESO at Sacred Heart Middle School with Year 7–9 students across a range of disabilities.",
    ],
  },
  {
    name: "Logan",
    role: "Mentor",
    photo: "fOcz1d0GFiUiLt4bWb9aWyOlW4.png",
    s: 1.22,
    y: 2,
    short:
      "Driven, hardworking mentor with a deep passion for sport, teamwork, and helping participants tick off their goals.",
    full: [
      "Represented South Australia in cricket from Under 12 through to Under 19 level.",
      "Uses a gentle, non-authoritarian approach with strong attention to detail.",
      "Believes in the power of competition and constant self-improvement, both on and off the field.",
      "Driven, hardworking mentor with a deep passion for sport, teamwork, and helping participants tick off their goals.",
    ],
  },
  {
    name: "Jacob",
    role: "Mentor",
    photo: "lPtQHhYwZ9m7iSuRg6JrPIKMOU.png",
    s: 1.08,
    short:
      "The newest member of the Momentum team, based north of Adelaide and a great fit for participants up that way.",
    full: [
      "Recently took on an SSO role at a local primary school to keep building his skillset.",
      "Enjoys the gym, soccer, and console gaming, helping mentees see the benefits of staying active.",
      "Brings fresh energy and a focus on physical wellbeing into every session.",
      "The newest member of the Momentum team, based north of Adelaide and a great fit for participants up that way.",
    ],
  },
  {
    name: "Durar",
    role: "Mentor",
    photo: "OGUQIqPx8bENquTHzlADXZTzQ.png",
    s: 1.0,
    short:
      "Final-year Speech Pathology student working as a mentor and therapy assistant, passionate about helping others communicate their best.",
    full: [
      "Bilingual in English and Arabic (Iraqi dialect), bringing an extra layer of accessibility to her mentoring.",
      "Holds accreditations in Responding to Abuse and Neglect, Through Their Eyes, and Trauma Informed Care.",
      "Cooking and sports are her go-to hobbies, with a strong belief that a healthy body supports healthier mental wellbeing.",
      "Final-year Speech Pathology student working as a mentor and therapy assistant, passionate about helping others communicate their best.",
    ],
  },
];

function Photo({ m }: { m: Member }) {
  return (
    <figure className="member__photo">
      {m.photo && (
        <img
          src={`${A}${m.photo}`}
          alt={m.name}
          style={{ transform: `scale(${m.s ?? 1}) translateY(${m.y ?? 0}%)` }}
        />
      )}
    </figure>
  );
}

function MemberCard({
  m,
  open,
  onToggle,
  rcol,
}: {
  m: Member;
  open: boolean;
  onToggle: () => void;
  rcol: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    let tl: gsap.core.Timeline;
    const ctx = gsap.context(() => {
      const fullEl = panel.querySelector<HTMLElement>(".member__full");
      const nameEl = panel.querySelector<HTMLElement>(".member__name");
      const photoFig = panel.querySelector<HTMLElement>(".member__photo");
      const collapseEl = panel.querySelector<HTMLElement>(".member__toggle");

      const split = new SplitText(fullEl, { type: "lines", mask: "lines" });

      gsap.set(split.lines, { yPercent: 120 });
      gsap.set(collapseEl, { autoAlpha: 0, y: 10 });
      gsap.set(photoFig, { scale: 1, transformOrigin: "center center" });

      tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut" } });
      tl
        // slide the panel open (clip wipe)
        .to(
          panel,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.55,
            ease: "power3.inOut",
          },
          0
        )
        // headshot grows a touch
        .to(photoFig, { scale: 1.06, duration: 0.6, ease: "power2.out" }, 0)
        // name wipes out then back in
        .to(nameEl, { clipPath: "inset(0 0 0 100%)", duration: 0.16, ease: "power2.in" }, 0.05)
        .set(nameEl, { clipPath: "inset(0 100% 0 0)" })
        .to(nameEl, { clipPath: "inset(0 0% 0 0)", duration: 0.32, ease: "power2.out" })
        // bio reveals line by line
        .to(
          split.lines,
          { yPercent: 0, stagger: 0.055, duration: 0.5, ease: "power3.out" },
          0.3
        )
        // collapse slides in at the bottom
        .to(collapseEl, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, ">-0.1");

      tlRef.current = tl;
    }, panel);
    return () => ctx.revert();
  }, [rcol]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) tl.play();
    else tl.reverse();
  }, [open]);

  return (
    <article
      className={`member${open ? " is-open" : ""}${rcol ? " member--rcol" : ""}`}
    >
      {/* collapsed bordered card */}
      <div className="member__inner">
        <Photo m={m} />
        <div className="member__meta">
          <div>
            <h3 className="member__name">{m.name}</h3>
            <p className="member__role">{m.role}</p>
          </div>
          <button className="member__toggle" onClick={onToggle}>
            Read More
          </button>
        </div>
      </div>

      {/* expanded bordered card (always mounted; clipped closed) */}
      <div className="member__expand" ref={panelRef}>
        <Photo m={m} />
        <div className="member__exbody">
          <div className="member__meta">
            <div>
              <h3 className="member__name">{m.name}</h3>
              <p className="member__role">{m.role}</p>
            </div>
          </div>
          <div className="member__full">
            {m.full.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <button className="member__toggle member__collapse" onClick={onToggle}>
            Collapse
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Team() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="sec sec--team" id="team">
      <div className="wrap">
        <h2 className="sec__head">Your Team</h2>
        <p className="sec__sub">
          Let's turn challenges into wins, one goal at a time.
        </p>
        <div className="team">
          {TEAM.map((m, i) => (
            <MemberCard
              key={m.name}
              m={m}
              rcol={i % 3 === 2}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
