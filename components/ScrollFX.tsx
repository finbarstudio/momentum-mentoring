"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFX() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---- staggered reveals on scroll ----
      const groups: [string, string][] = [
        ["#services .services", ".service"],
        ["#stories .stories", ".story2"],
      ];
      groups.forEach(([wrapSel, itemSel]) => {
        const wrap = document.querySelector(wrapSel);
        if (!wrap) return;
        const items = gsap.utils.toArray<HTMLElement>(itemSel, wrap);
        gsap.from(items, {
          y: 48,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: wrap, start: "top 78%" },
        });
      });
      // section titles + subtitles reveal
      gsap.utils.toArray<HTMLElement>(".sec__head").forEach((h) => {
        const sub = h.parentElement?.querySelector(".sec__sub");
        gsap.from(sub ? [h, sub] : [h], {
          y: 30,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: h, start: "top 82%" },
        });
      });

      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, []);

  return null;
}
