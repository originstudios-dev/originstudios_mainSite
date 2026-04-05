"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stats = [
  {
    display: "58",
    suffix: "%",
    numericValue: 58,
    label: "Organic Clicks Lost",
    explanation: "AI Overviews ate them. You rank #1 but nobody clicks.",
  },
  {
    display: "20",
    suffix: "/20",
    numericValue: 20,
    label: "AI Sites Wiped",
    explanation: "SE Ranking: every AI-content site lost all rankings.",
  },
  {
    display: "5",
    suffix: "×",
    numericValue: 5,
    label: "Higher Conversion",
    explanation: "AI search converts at 14.2% vs 2.8% traditional.",
  },
];

function StatCounter({
  numericValue,
  suffix,
  label,
  explanation,
  index,
}: {
  numericValue: number;
  suffix: string;
  label: string;
  explanation: string;
  index: number;
}) {
  const numRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const explRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = numRef.current;
    const line = lineRef.current;
    const expl = explRef.current;
    if (!el || !line || !expl) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 1.8,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              el.textContent = `${Math.round(parseFloat(el.textContent || "0"))}`;
            },
          }
        );
        gsap.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, ease: "power2.out", delay: 0.2 }
        );
        gsap.fromTo(
          expl,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 + index * 0.1 }
        );
      },
    });

    return () => trigger.kill();
  }, [numericValue, index]);

  return (
    <div className="relative flex flex-col gap-4 flex-1 min-w-0 py-8 sm:py-10">
      {/* Radial glow behind number */}
      <div
        className="pointer-events-none absolute top-4 left-1/4 -translate-x-1/2 w-56 h-56 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Large number + suffix */}
      <div className="relative flex items-baseline gap-1 leading-none">
        <span
          ref={numRef}
          className="font-clash text-7xl md:text-8xl font-bold text-primary tabular-nums"
        >
          0
        </span>
        <span className="font-clash text-3xl md:text-5xl font-bold" style={{ color: "#c9a87c" }}>
          {suffix}
        </span>
      </div>

      {/* Animated underline */}
      <div
        ref={lineRef}
        className="h-px w-full origin-left"
        style={{
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05))",
        }}
      />

      {/* Label — uppercase, tracked, smaller */}
      <span className="font-satoshi text-[11px] md:text-xs font-semibold text-white/80 tracking-[0.2em] uppercase">
        {label}
      </span>

      {/* Explanation — fades in delayed */}
      <p
        ref={explRef}
        className="font-satoshi text-xs md:text-sm text-muted leading-relaxed opacity-0"
      >
        {explanation}
      </p>
    </div>
  );
}

export function Logic() {
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = dividerRef.current;
    if (!line) return;

    const trigger = ScrollTrigger.create({
      trigger: line,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power3.out" });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="relative z-10 py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
      {/* Section label */}
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
          02 — Why most websites fail in 2026
        </span>
      </ScrollReveal>

      {/* Headline */}
      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.05]">
          Your Traffic Isn&apos;t Disappearing.
          <br />
          It&apos;s Being Redirected.
        </h2>
      </ScrollReveal>

      {/* Full-width divider line — draws itself on scroll */}
      <div
        ref={dividerRef}
        className="mt-16 md:mt-20 h-px w-full origin-left"
        style={{
          transform: "scaleX(0)",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
        }}
      />

      {/* Stat cards */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-16">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.12}>
            <StatCounter
              numericValue={stat.numericValue}
              suffix={stat.suffix}
              label={stat.label}
              explanation={stat.explanation}
              index={i}
            />
          </ScrollReveal>
        ))}
      </div>

      {/* Pivot line — pull-quote style */}
      <ScrollReveal delay={0.3} className="mt-20 md:mt-24">
        <div className="border-t border-b border-white/10 py-8 md:py-10 max-w-2xl mx-auto">
          <p className="font-satoshi text-base md:text-lg font-bold text-center text-white/90 leading-snug">
            This is not a Google penalty. It&apos;s a platform shift. Those
            don&apos;t reverse.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
