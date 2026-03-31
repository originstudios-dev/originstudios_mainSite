"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stats = [
  { value: 98, suffix: "%", label: "AEO Score" },
  { value: 45, prefix: "+", suffix: "%", label: "Conversion Rate" },
  { value: 500, prefix: "<", suffix: "ms", label: "Load Time" },
];

function StatCounter({
  value, prefix = "", suffix, label,
}: {
  value: number; prefix?: string; suffix: string; label: string;
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
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: value, duration: 1.5, ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: function () {
            el.textContent = `${prefix}${Math.round(parseFloat(el.textContent || "0"))}`;
          },
        });
        gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power2.out" });
      },
    });

    return () => trigger.kill();
  }, [value, prefix]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-0.5">
        <span ref={numRef} className="font-satoshi text-4xl md:text-5xl font-light text-primary">0</span>
        <span className="font-satoshi text-lg text-label">{suffix}</span>
      </div>
      <div ref={lineRef} className="h-px bg-white/20 origin-left" style={{ transform: "scaleX(0)" }} />
      <span className="font-satoshi text-xs text-muted tracking-wide">{label}</span>
    </div>
  );
}

export function Logic() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">02 — The Logic</span>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">From Blue Links<br />to Citations.</h2>
      </ScrollReveal>
      <ScrollReveal delay={0.2} className="mt-8 max-w-2xl">
        <p className="font-satoshi text-base md:text-lg text-body leading-relaxed">
          Traditional SEO is dead. In the Agentic Age, users don&apos;t &quot;search&quot;—they ask. If your brand isn&apos;t structured for{" "}
          <span className="text-primary">Retrieval-Augmented Generation (RAG)</span>, you don&apos;t exist to ChatGPT, Gemini, or Perplexity.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.15} className="mt-6 max-w-2xl">
        <p className="font-satoshi text-base md:text-lg text-body leading-relaxed">
          We hardcode your Brand DNA into the semantic layer of the web, ensuring you are the{" "}
          <span className="text-primary font-medium">Primary Source</span> that AI engines trust and quote.
        </p>
      </ScrollReveal>
      <div className="mt-16 flex flex-col sm:flex-row gap-12 sm:gap-16">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <StatCounter {...stat} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
