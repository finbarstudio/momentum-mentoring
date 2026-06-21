"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// logotype aspect ratios from the source SVG viewBoxes
const VB_W = 39.17;
const MOM_H = 9.02; // LT1.2 (MOMENTUM)
const SUB_H = 3.6; // LT-mentoring (MENTORING)
const GAP_U = 2.83; // vertical gap between the two lines, in viewBox units

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLImageElement>(null);
  const subRef = useRef<HTMLImageElement>(null);
  const navLogoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current!;
    const wrap = wrapRef.current!;
    const lockup = lockupRef.current!;
    const wordImg = wordRef.current!;
    const subImg = subRef.current!;
    const navLogo = navLogoRef.current!;
    const nav = document.querySelector<HTMLElement>(".nav");

    const ctx = gsap.context(() => {
      // ---- size the logotype: MOMENTUM spans full width ----
      const targetW = stage.clientWidth - 64; // 2rem padding each side
      const scaleU = targetW / VB_W;
      wordImg.style.width = `${targetW}px`;
      wordImg.style.height = `${MOM_H * scaleU}px`;
      subImg.style.width = `${targetW}px`;
      subImg.style.height = `${SUB_H * scaleU}px`;
      lockup.style.gap = `${GAP_U * scaleU}px`;

      // ---- measure (block anchored at the bottom via CSS) ----
      const mRect = wordImg.getBoundingClientRect();
      const blockRect = lockup.getBoundingClientRect();
      const nr = nav?.getBoundingClientRect();
      const navH = nr ? nr.height : 56;
      const navCenterX = nr ? nr.left + nr.width / 2 : window.innerWidth / 2;
      const navCenterY = nr ? nr.top + nr.height / 2 : 40;

      const naturalCx = blockRect.left + blockRect.width / 2;
      const naturalCy = blockRect.top + blockRect.height / 2;

      // push the block down so MOMENTUM sits flush at the bottom on load
      // (the hidden MENTORING line spills just below the viewport)
      const pushDown = window.innerHeight - 16 - mRect.bottom;

      const dockScale = (navH * 0.6) / blockRect.height; // fit into nav
      // shrink target: block centred in the page
      const centerX = window.innerWidth / 2 - naturalCx;
      const centerY = window.innerHeight / 2 - naturalCy;
      // dock target: block centred in the nav
      const dockX = navCenterX - naturalCx;
      const dockY = navCenterY - naturalCy;

      // crisp native-size SVG that the motion hands off to in the nav
      gsap.set(navLogo, {
        position: "fixed",
        top: navCenterY,
        left: navCenterX,
        height: navH * 0.6,
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
      });

      // ---- initial states ----
      gsap.set(wrap, { y: pushDown });
      gsap.set(wordImg, { yPercent: 110 });
      gsap.set(subImg, { yPercent: 110 });
      if (nav) gsap.set(nav, { opacity: 0 });

      // ---- INTRO: MOMENTUM masks up into place at the bottom ----
      gsap.to(wordImg, { yPercent: 0, duration: 1, ease: "power3.out" });

      // ---- SCROLL sequence (SVG stays crisp while scaling) ----
      const stl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
      stl
        // phase 1 — MENTORING masks up beneath, lifting the block to sit flush
        .to(subImg, { yPercent: 0, ease: "power3.out", duration: 0.3 }, 0)
        .to(wrap, { y: 0, ease: "none", duration: 0.3 }, 0)
        // phase 2 — full-size logotype travels up from the bottom to the centre
        .to(wrap, { x: centerX, y: centerY, ease: "none", duration: 0.33 }, 0.33)
        // phase 3 — from the centre, shrink + rise into the nav
        .to(nav, { opacity: 1, ease: "power1.out", duration: 0.2 }, 0.66)
        .to(
          wrap,
          { x: dockX, y: dockY, scale: dockScale, ease: "power2.inOut", duration: 0.34 },
          0.66
        )
        // hand off the transform-scaled SVG → native-size SVG (crisp in the nav)
        .to(wrap, { opacity: 0, duration: 0.06 }, 0.94)
        .to(navLogo, { opacity: 1, duration: 0.06 }, 0.94);

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="hero__stage" ref={stageRef} id="top" />
      <div className="hero__wrap" ref={wrapRef}>
        <div className="hero__lockup" ref={lockupRef}>
          <span className="hero__line">
            <img
              className="hero__reveal"
              ref={wordRef}
              src="/assets/svg/LT1.2.svg"
              alt="Momentum"
            />
          </span>
          <span className="hero__line">
            <img
              className="hero__reveal"
              ref={subRef}
              src="/assets/svg/LT-mentoring.svg"
              alt="Mentoring"
            />
          </span>
        </div>
      </div>
      {/* native-size logo the motion hands off to (pixel-crisp in the nav) */}
      <img
        className="hero__navlogo"
        ref={navLogoRef}
        src="/assets/svg/LT2.svg"
        alt="Momentum Mentoring"
      />
    </section>
  );
}
