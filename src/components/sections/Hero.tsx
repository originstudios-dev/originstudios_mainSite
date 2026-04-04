"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/registry";
import { useDeviceCapability } from "@/lib/hooks/useDeviceCapability";
import { OrbFallback } from "@/components/three/OrbFallback";
import { SourceReveal } from "@/components/ui/SourceReveal";

const Scene = dynamic(
  () =>
    import("@/components/three/Scene").then((mod) => ({
      default: mod.Scene,
    })),
  { ssr: false, loading: () => <OrbFallback /> }
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
      // Fade out
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        // Fade in
        setVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Simple entrance animation — stagger children in
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
      className="relative h-screen w-full flex items-center overflow-x-clip overflow-y-visible pt-20"
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-16">
        {/* Left: text — wrapped in SourceReveal */}
        <SourceReveal
          className="flex flex-col gap-6 flex-1"
          revealSize={200}
          navSource={
            <div className="flex items-center gap-4 sm:gap-6 md:gap-10 bg-[#0a0a0a] px-5 sm:px-6 md:px-8 py-2.5 md:py-3" style={{ borderRadius: "24px 8px 24px 8px" }}>
              <div className="hidden md:flex items-center gap-3 lg:gap-5">
                <span className="font-satoshi text-xs font-bold tracking-wide text-white/60 py-2 px-2">Services</span>
                <span className="font-satoshi text-xs font-bold tracking-wide text-white/60 py-2 px-2">Stack</span>
                <span className="font-satoshi text-xs font-bold tracking-wide text-white/60 py-2 px-2">Process</span>
              </div>
              <span className="font-clash font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase">
                <span className="text-lg sm:text-xl md:text-2xl text-white">Origin</span>
                <span className="text-[9px] sm:text-[10px] md:text-xs ml-1 md:ml-1.5 font-medium tracking-[0.25em] md:tracking-[0.3em] text-white/60">Studios</span>
              </span>
              <div className="hidden md:flex items-center gap-3 lg:gap-5">
                <span className="font-satoshi text-xs font-bold tracking-wide text-white/60 py-2 px-2">Work</span>
                <span className="font-satoshi text-xs font-bold tracking-wide text-white/60 py-2 px-2">About</span>
                <span className="font-satoshi text-xs font-bold tracking-wide text-white/60 py-2 px-2">Contact</span>
              </div>
            </div>
          }
          source={
            <div className="flex flex-col gap-4 md:gap-5">
              {/* Kicker */}
              <p className="font-satoshi text-xs font-medium tracking-widest uppercase text-[#0a0a0a]/50">
                Est. 2026 · 95+ Lighthouse · &lt;1s Load
              </p>

              {/* Headline */}
              <div className="flex flex-col">
                <h1 className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95] text-[#0a0a0a]">
                  Your Competitors Have{" "}
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
                <h1 className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95] text-[#0a0a0a]/60">
                  You&apos;ll Have the System That Beats Them.
                </h1>
              </div>

              {/* Sub-headline */}
              <p className="font-satoshi text-sm md:text-base lg:text-lg text-[#0a0a0a]/60 leading-relaxed max-w-md">
                GEO-optimised. AI-cited. 8-week build. Sub-1s performance. One
                connected system — not fragmented vendors.
              </p>

              {/* CTA */}
              <div className="flex gap-4 items-center">
                <a
                  href="#contact"
                  className="inline-block font-satoshi text-sm font-medium text-white bg-[#0a0a0a] px-6 py-3 hover:bg-[#0a0a0a]/80 transition-colors"
                >
                  Book Discovery Call →
                </a>
              </div>

              {/* Trust bar */}
              <p className="font-satoshi text-xs text-[#0a0a0a]/40 tracking-wide">
                Next.js · Three.js · JSON-LD · GEO/AEO · Vercel Edge
              </p>
            </div>
          }
        >
          <div ref={contentRef} className="flex flex-col gap-4 md:gap-5">
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
              Strategy-First · Motion &amp; 3D · AI-Optimised · Performance-Obsessed · Marketing-Wired
            </p>
          </div>
        </SourceReveal>

        {/* Right: orb */}
        <div className="hidden md:block w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] shrink-0 relative">
          {tier === "high" ? <Scene /> : <OrbFallback />}
        </div>
      </div>
    </section>
  );
}
