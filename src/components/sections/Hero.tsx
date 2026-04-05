"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/registry";
import { useDeviceCapability } from "@/lib/hooks/useDeviceCapability";
import { useMouseParallax } from "@/lib/hooks/useMouseParallax";
import { Logic } from "./Logic";

const Scene = dynamic(
  () => import("@/components/three/Scene").then((mod) => ({ default: mod.Scene })),
  { ssr: false }
);

const ROTATING_WORDS = [
  "Websites",
  "Web Apps",
  "SaaS Products",
  "Automations",
  "Brands",
  "Experiences",
];

/* Split a string into an array of <span> elements per character */
function charSpans(text: string, className: string) {
  return text.split("").map((ch, i) => (
    <span key={i} className={`${className} inline-block`} style={{ opacity: 0 }}>
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));
}

/* Sub-headline word wrapper */
function wordSpans(text: string) {
  return text.split(/\s+/).map((word, i) => (
    <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
      <span className="word-inner inline-block">{word}</span>
    </span>
  ));
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const subHeadRef = useRef<HTMLParagraphElement>(null);
  const tier = useDeviceCapability();

  const textParallax = useMouseParallax(15);
  const galaxyParallax = useMouseParallax(-25);

  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  /* Rotating word cycle — untouched */
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* Mount animations */
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    /* 1 — Character-level reveal on headline lines */
    const line1Chars = headline1Ref.current?.querySelectorAll(".char-l1");
    const line2Chars = headline2Ref.current?.querySelectorAll(".char-l2");

    if (line1Chars?.length) {
      gsap.fromTo(
        line1Chars,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.015, ease: "power3.out", delay: 0.2 }
      );
    }

    if (line2Chars?.length) {
      gsap.fromTo(
        line2Chars,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.015, ease: "power3.out", delay: 0.5 }
      );
    }

    /* 2 — Word-level reveal on sub-headline */
    const wordInners = subHeadRef.current?.querySelectorAll(".word-inner");
    if (wordInners?.length) {
      gsap.fromTo(
        wordInners,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7, stagger: 0.04, ease: "power4.out", delay: 0.5 }
      );
    }

    /* 3 — CTAs + trust bar keep data-animate stagger, delayed */
    const staggerEls = content.querySelectorAll("[data-animate]");
    gsap.fromTo(
      staggerEls,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.8,
      }
    );
  }, []);

  const rotatingWord = ROTATING_WORDS[wordIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ overflow: "visible", clipPath: "none" }}
    >
      {/* Galaxy — h-screen container, overflows visually via clip:unset on section */}
      {tier === "high" && (
        <div
          ref={galaxyParallax}
          className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
          style={{ height: "100vh" }}
        >
          <Scene mode="galaxy" />
        </div>
      )}

      {/* Hero text — centered in viewport */}
      <div className="relative z-10 min-h-screen flex items-center pt-20">
      <div
        ref={(node) => {
          // Combine contentRef + textParallax ref
          contentRef.current = node;
          (textParallax as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className="flex flex-col gap-4 md:gap-5 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-16"
      >
        {/* Kicker */}
        <p
          data-animate
          className="font-satoshi text-xs font-medium tracking-widest uppercase text-body/50"
        >
          Web Studio · Est. 2026
        </p>

        {/* Headline */}
        <div className="flex flex-col">
          <h1
            ref={headline1Ref}
            className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95]"
          >
            {charSpans("We Don\u2019t Just Build ", "char-l1")}
            <span
              className="inline-block transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                clipPath: visible ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
              }}
            >
              {rotatingWord}
            </span>
            {charSpans(".", "char-l1")}
          </h1>
          <h1
            ref={headline2Ref}
            className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95] text-body"
          >
            {charSpans("We Build the System They Run On.", "char-l2")}
          </h1>
        </div>

        {/* Sub-headline */}
        <p
          ref={subHeadRef}
          className="font-satoshi text-sm md:text-base lg:text-lg text-body leading-relaxed max-w-md"
        >
          {wordSpans(
            "Strategy that shapes. Design that converts. Architecture that gets cited by AI. Every piece — one compounding system."
          )}
        </p>

        {/* CTAs */}
        <div data-animate className="flex gap-4 items-center flex-wrap">
          <a
            href="#work"
            data-cursor="expand"
            className="inline-block font-satoshi text-sm font-medium bg-white text-[#0a0a0a] px-6 py-3 hover:bg-white/90 transition-colors"
          >
            See Our Work →
          </a>
          <a
            href="#contact"
            className="font-satoshi text-sm text-body border-b border-body/50 hover:text-primary hover:border-primary transition-colors pb-0.5"
          >
            Start a Project
          </a>
        </div>

        {/* Trust bar */}
        <p
          data-animate
          className="font-satoshi text-xs text-body/40 tracking-wide"
        >
          Strategy-First · Motion &amp; 3D · AI-Optimised ·
          Performance-Obsessed · Marketing-Wired
        </p>
      </div>
      </div>

      {/* Logic section — inside hero so galaxy covers it too */}
      <div className="relative z-10">
        <Logic />
      </div>
    </section>
  );
}
