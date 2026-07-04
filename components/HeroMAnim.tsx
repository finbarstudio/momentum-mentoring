"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroMAnim() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      // Pin the hero and let the next section scroll OVER it (pinSpacing:false).
      // As you scroll: the M's split apart, and the whole hero shrinks + darkens
      // so it looks like it falls away behind the rising team section.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero2",
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
          // scrub:true follows scroll exactly — no smoothing lag that would
          // leave a half-applied state (white gap) when scrolling up fast
          scrub: true,
          anticipatePin: 1,
        },
      });

      // video M: shrinks + recedes (up / back)
      tl.fromTo(
        ".hero2__videomask",
        { scale: 1, yPercent: 0 },
        { scale: 0.55, yPercent: -28, ease: "none" },
        0
      );
      // outline M: grows + advances (down / forward)
      tl.fromTo(
        ".hero2__outlineM",
        { scale: 1, yPercent: 0 },
        { scale: 1.4, yPercent: 26, ease: "none" },
        0
      );
      // falls away: content shrinks harder (box stays full-bleed) + darkens deeply
      tl.to(".hero2__inner", { scale: 0.8, yPercent: -6, ease: "none" }, 0);
      tl.to(".hero2__veil", { opacity: 0.95, ease: "none" }, 0);
    });
    return () => ctx.revert();
  }, []);

  return null;
}
