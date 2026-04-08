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

/* Split text into word-wrapped char spans so words never break mid-character */
function charSpans(text: string, className: string) {
  return text.split(" ").map((word, wi, arr) => (
    <span key={wi} className="inline-flex whitespace-nowrap">
      {word.split("").map((ch, ci) => (
        <span key={ci} className={`${className} inline-block`} style={{ opacity: 0 }}>
          {ch}
        </span>
      ))}
      {wi < arr.length - 1 && (
        <span className={`${className} inline-block`} style={{ opacity: 0 }}>
          {"\u00A0"}
        </span>
      )}
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
  const headline1Ref = useRef<HTMLSpanElement>(null);
  const headline2Ref = useRef<HTMLSpanElement>(null);
  const subHeadRef = useRef<HTMLParagraphElement>(null);
  const tier = useDeviceCapability();

  const textParallax = useMouseParallax(15);
  const galaxyParallax = useMouseParallax(-25);

  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  /* Rotating word cycle */
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
      {/* Galaxy — covers entire hero section including Logic */}
      {tier === "high" ? (
        <div
          ref={galaxyParallax}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <Scene mode="galaxy" />
        </div>
      ) : (
        /* CSS fallback for low-end devices — radial glow */
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute top-1/3 right-0 w-[80vw] h-[80vw] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(86,84,73,0.3) 0%, rgba(17,18,13,0) 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-[60vw] h-[40vw] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(216,207,188,0.15) 0%, rgba(17,18,13,0) 70%)",
              filter: "blur(80px)",
            }}
          />
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
          className="font-satoshi text-sm font-medium tracking-widest uppercase text-[#FFFBF4]/50"
        >
          Web Studio · Est. 2026
        </p>

        {/* Headline */}
        <h1 className="flex flex-col">
          <span
            ref={headline1Ref}
            className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95]"
          >
            {charSpans("We Don\u2019t Just Build", "char-l1")}
          </span>
          <span className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95]">
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
          </span>
          <span
            ref={headline2Ref}
            className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95]"
            style={{ color: "#565449" }}
          >
            {charSpans("We Build the System They Run On.", "char-l2")}
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          ref={subHeadRef}
          className="font-satoshi text-sm md:text-base lg:text-lg text-body leading-relaxed max-w-md"
        >
          {wordSpans(
            "Strategy that shapes. Design that converts. Architecture that gets cited by AI. Every piece, one compounding system."
          )}
        </p>

        {/* CTA */}
        <div data-animate>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            data-cursor="expand"
            className="inline-block font-satoshi text-sm font-medium bg-[#FFFBF4] text-[#11120D] px-6 py-3 hover:bg-[#D8CFBC] transition-colors"
          >
            Start a Project →
          </button>
        </div>

        {/* Trust bar */}
        <p
          data-animate
          className="font-satoshi text-sm text-[#FFFBF4]/40 tracking-wide"
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
