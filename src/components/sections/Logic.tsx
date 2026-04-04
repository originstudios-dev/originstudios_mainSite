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
}: {
  numericValue: number;
  suffix: string;
  label: string;
  explanation: string;
}) {
  const numRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = numRef.current;
    const line = lineRef.current;
    if (!el || !line) return;

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
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              el.textContent = `${Math.round(parseFloat(el.textContent || "0"))}`;
            },
          }
        );
        gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power2.out" });
      },
    });

    return () => trigger.kill();
  }, [numericValue]);

  return (
    <div className="flex flex-col gap-3 flex-1 min-w-0">
      {/* Large number */}
      <div className="flex items-baseline gap-0.5 leading-none">
        <span
          ref={numRef}
          className="font-clash text-6xl md:text-7xl font-bold text-primary tabular-nums"
        >
          0
        </span>
        <span className="font-clash text-3xl md:text-4xl font-bold text-primary">{suffix}</span>
      </div>

      {/* Animated underline */}
      <div
        ref={lineRef}
        className="h-px bg-white/20 origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Label */}
      <span className="font-satoshi text-sm md:text-base font-semibold text-white tracking-wide uppercase">
        {label}
      </span>

      {/* One-line explanation */}
      <p className="font-satoshi text-xs md:text-sm text-muted leading-relaxed">{explanation}</p>
    </div>
  );
}

export function Logic() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
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

      {/* Stat cards */}
      <div className="mt-20 flex flex-col sm:flex-row gap-10 sm:gap-12 md:gap-16 border-t border-white/10 pt-12">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.12}>
            <StatCounter
              numericValue={stat.numericValue}
              suffix={stat.suffix}
              label={stat.label}
              explanation={stat.explanation}
            />
          </ScrollReveal>
        ))}
      </div>

      {/* Pivot line */}
      <ScrollReveal delay={0.3} className="mt-16">
        <p className="font-satoshi text-base md:text-lg font-bold text-center text-white/90 max-w-2xl mx-auto leading-snug">
          This is not a Google penalty. It&apos;s a platform shift. Those don&apos;t reverse.
        </p>
      </ScrollReveal>
    </section>
  );
}
