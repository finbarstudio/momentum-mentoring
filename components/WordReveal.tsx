"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function WordReveal() {
  const root = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let split: SplitText;
    const ctx = gsap.context(() => {
      split = SplitText.create(textRef.current!, { type: "words" });
      gsap.set(split.words, { color: "rgba(128,183,180,0.15)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // words light up one after another as you scroll through
      tl.to(split.words, {
        color: "#80b7b4",
        stagger: 0.1,
        duration: 0.3,
        ease: "none",
      });

      // "Contact us" wipe-mask reveals partway through the word reveal
      const d = tl.duration();
      tl.fromTo(
        contactRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: d * 0.25, ease: "power2.out" },
        d * 0.55
      );
    }, root);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="reveal" ref={root}>
      <div className="reveal__stage">
        <p className="reveal__text" ref={textRef}>
          Building identity through choice, voice, and independence.
        </p>
        <a className="reveal__contact" href="#contact" ref={contactRef}>
          Contact us
        </a>
      </div>
    </section>
  );
}
