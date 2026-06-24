"use client";

import { useLayoutEffect, useRef, useState } from "react";

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  full: string[];
  photo?: string | null;
  s?: number;
  y?: number;
};

export default function Team({ members }: { members: TeamMember[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [closing, setClosing] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const team = teamRef.current;
    if (!team) return;
    const compute = () => {
      const els = Array.from(team.querySelectorAll<HTMLElement>(".member"));
      if (!els.length) return;
      if (window.innerWidth <= 768) {
        els.forEach((m) => (m.style.minHeight = ""));
        return;
      }
      const col = els[0].getBoundingClientRect().width;
      const a4 = (col - 28) * (297 / 210);
      const cardH = a4 + 70 + 28;
      team.style.setProperty("--col", `${col}px`);
      team.style.setProperty("--card-h", `${cardH}px`);
      els.forEach((m) => (m.style.minHeight = `${cardH}px`));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [members.length]);

  function toggle(i: number) {
    if (timer.current) clearTimeout(timer.current);
    if (open === i) {
      setClosing(i);
      setOpen(null);
    } else {
      if (open !== null) setClosing(open);
      setOpen(i);
    }
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
          {members.map((m, i) => {
            const isOpen = open === i;
            const elevated = open === i || closing === i;
            const rcol = i % 3 === 2;
            const roll = (
              <span className="member__roll">
                <span>Read More</span>
                <span>Collapse</span>
              </span>
            );
            return (
              <div
                className={`member${rcol ? " member--rcol" : ""}`}
                key={m._id}
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
                          src={m.photo}
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
                        {roll}
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
                    {(m.full || []).map((p, k) => (
                      <p key={k}>{p}</p>
                    ))}
                  </div>

                  <button
                    className="member__toggle member__toggle--desk"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    {roll}
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
