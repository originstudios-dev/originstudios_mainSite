"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/registry";
import { useDeviceCapability } from "@/lib/hooks/useDeviceCapability";
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

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tier = useDeviceCapability();

  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

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

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const children = content.querySelectorAll("[data-animate]");
    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
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
          className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
          style={{ height: "100vh" }}
        >
          <Scene mode="galaxy" />
        </div>
      )}

      {/* Hero text — centered in viewport */}
      <div className="relative z-10 min-h-screen flex items-center pt-20">
      <div
        ref={contentRef}
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
        <div className="flex flex-col" data-animate>
          <h1 className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95]">
            We Don&apos;t Just Build{" "}
            <span
              className="inline-block transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                clipPath: visible ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
              }}
            >
              {rotatingWord}
            </span>
            .
          </h1>
          <h1 className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95] text-body">
            We Build the System They Run On.
          </h1>
        </div>

        {/* Sub-headline */}
        <p
          data-animate
          className="font-satoshi text-sm md:text-base lg:text-lg text-body leading-relaxed max-w-md"
        >
          Strategy that shapes. Design that converts. Architecture that gets
          cited by AI. Every piece — one compounding system.
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
