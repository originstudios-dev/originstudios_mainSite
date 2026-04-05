"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";

const LETTERS = "ORIGINSTUDIOS".split("");

function ReactiveChar({ char, index }: { char: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  const onEnter = useCallback(() => {
    setHovered(true);
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      y: -15,
      scale: 1.1,
      duration: 0.2,
      ease: "back.out(3)",
    });
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  // Add space after ORIGIN (index 5 → 6 gap)
  const isSpace = index === 6;

  return (
    <>
      {isSpace && <span className="inline-block w-[2vw] md:w-[1.5vw]" />}
      <span
        ref={ref}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        data-cursor="expand"
        className="inline-block select-none will-change-transform"
        style={{
          color: hovered ? "#fff" : "transparent",
          WebkitTextStroke: hovered ? "0px" : "1px rgba(255,255,255,0.12)",
          textShadow: hovered
            ? "0 0 30px rgba(255,255,255,0.4), 0 5px 20px rgba(255,255,255,0.1)"
            : "none",
          transition: "color 0.2s, -webkit-text-stroke 0.2s",
        }}
      >
        {char}
      </span>
    </>
  );
}

export function BigLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const chars = charsRef.current;
    if (!el || !chars) return;

    // Stagger each letter in on scroll
    const letters = chars.querySelectorAll("span[data-cursor]");
    gsap.fromTo(
      letters,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative py-16 md:py-20 px-4 border-t border-white/[0.03]"
    >
      <div
        ref={charsRef}
        className="flex justify-center items-center flex-wrap"
      >
        <span className="font-clash font-bold uppercase tracking-tight leading-none text-[7vw] sm:text-[6vw] md:text-[5vw]">
          {LETTERS.map((char, i) => (
            <ReactiveChar key={i} char={char} index={i} />
          ))}
        </span>
      </div>
    </div>
  );
}
