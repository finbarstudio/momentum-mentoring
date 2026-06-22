"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Member = {
  name: string;
  role: string;
  photo: string;
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
    s: 1,
    y: 0,
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
    photo: "gSwMsUjNK2zKjELl4XuKQF8tqdg.png",
    s: 1.0,
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
    s: 1,
    y: 0,
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
    full: [
      "Bilingual in English and Arabic (Iraqi dialect), bringing an extra layer of accessibility to her mentoring.",
      "Holds accreditations in Responding to Abuse and Neglect, Through Their Eyes, and Trauma Informed Care.",
      "Cooking and sports are her go-to hobbies, with a strong belief that a healthy body supports healthier mental wellbeing.",
      "Final-year Speech Pathology student working as a mentor and therapy assistant, passionate about helping others communicate their best.",
    ],
  },
];

export default function Team() {
  const [open, setOpen] = useState<number | null>(null);
  const [closing, setClosing] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  // measure one column width (→ fixes the headshot + bio columns) and lock
  // every slot to the tallest card so heights are uniform and nothing shifts
  useLayoutEffect(() => {
    const team = teamRef.current;
    if (!team) return;
    const compute = () => {
      const members = Array.from(
        team.querySelectorAll<HTMLElement>(".member")
      );
      if (!members.length) return;
      // mobile: simple stacked accordion cards — no fixed heights / slide-over
      if (window.innerWidth <= 768) {
        members.forEach((m) => (m.style.minHeight = ""));
        return;
      }
      const col = members[0].getBoundingClientRect().width;
      const a4 = (col - 28) * (297 / 210); // headshot A4 height
      const cardH = a4 + 70 + 28; // + name/role + padding
      team.style.setProperty("--col", `${col}px`);
      team.style.setProperty("--card-h", `${cardH}px`);
      members.forEach((m) => (m.style.minHeight = `${cardH}px`));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  function toggle(i: number) {
    if (timer.current) clearTimeout(timer.current);
    if (open === i) {
      setClosing(i);
      setOpen(null);
    } else {
      if (open !== null) setClosing(open);
      setOpen(i);
    }
    // keep the closing card elevated until its width transition finishes
    timer.current = setTimeout(() => setClosing(null), 1000);
  }

  return (
    <section className="sec sec--team" id="team">
      <div className="wrap">
        <h2 className="sec__head">Your Team</h2>
        <p className="sec__sub">
          Let's turn challenges into wins, one goal at a time.
        </p>
        <div className="team" ref={teamRef}>
          {TEAM.map((m, i) => {
            const isOpen = open === i;
            const elevated = open === i || closing === i;
            const rcol = i % 3 === 2;
            return (
              <div
                className={`member${rcol ? " member--rcol" : ""}`}
                key={m.name}
              >
                <div
                  className={`member__card${isOpen ? " is-open" : ""}${
                    elevated ? " is-elevated" : ""
                  }`}
                >
                  <div className="member__main">
                    <figure className="member__photo">
                      {m.photo && (
                        <img
                          src={`${A}${m.photo}`}
                          alt={m.name}
                          style={
                            {
                              "--s": m.s ?? 1,
                              "--y": `${m.y ?? 0}%`,
                            } as React.CSSProperties
                          }
                        />
                      )}
                    </figure>
                    <div className="member__meta">
                      <div className="member__names">
                        <h3 className="member__name">{m.name}</h3>
                        <p className="member__role">{m.role}</p>
                      </div>
                      <button
                        className="member__toggle member__toggle--mob"
                        onClick={() => toggle(i)}
                        aria-expanded={isOpen}
                      >
                        <span className="member__roll">
                          <span>Read More</span>
                          <span>Collapse</span>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="member__bio">
                    <div className="member__biohead">
                      <span className="bh-line">
                        <span>{m.name}</span>
                      </span>
                      <span className="bh-line bh-role">
                        <span>{m.role}</span>
                      </span>
                    </div>
                    {m.full.map((p, k) => (
                      <p key={k}>{p}</p>
                    ))}
                  </div>

                  <button
                    className="member__toggle member__toggle--desk"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span className="member__roll">
                      <span>Read More</span>
                      <span>Collapse</span>
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
