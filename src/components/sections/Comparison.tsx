"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";

const rows = [
  { they: "WordPress + Elementor", we: "Next.js / Astro",          gap: "3–8× faster. Zero bloat." },
  { they: "Static design",         we: "Lottie + Three.js",        gap: "Remembered vs. forgotten." },
  { they: "No structured data",    we: "Full JSON-LD suite",       gap: "Invisible vs. cited by AI." },
  { they: "Shared hosting",        we: "Vercel Edge",              gap: "Global CDN. Auto-scaling." },
  { they: "Generic theme",         we: "Custom Figma-to-code",     gap: "Your brand. Not a template." },
  { they: "Manual setup",          we: "GTM + GA4 + Pixel",        gap: "Connected vs. fragmented." },
];

export function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const centerLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── stagger rows in on scroll ── */
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.08,
          },
        );
      });

      /* ── center divider lines draw themselves ── */
      centerLinesRef.current.forEach((line) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ── breathing pulse on all center lines ── */
      centerLinesRef.current.forEach((line) => {
        if (!line) return;
        gsap.to(line, {
          opacity: 0.35,
          duration: 1.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative py-32 md:py-40 px-8 md:px-16 max-w-7xl mx-auto"
    >
      {/* ── Header ── */}
      <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
        The stack
      </span>
      <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight mt-6">
        Two Audiences.
        <br />
        Most Developers Build for One.
      </h2>

      {/* ── Column labels ── */}
      <div className="mt-16 flex items-center gap-4 pb-4">
        <span className="w-[40%] font-satoshi text-xs text-muted tracking-wide uppercase text-right pr-6">
          What they use
        </span>
        <span className="w-[20%]" />
        <span className="w-[40%] font-satoshi text-xs text-white/70 tracking-wide uppercase pl-6">
          What we use
        </span>
      </div>

      {/* ── Rows ── */}
      <div className="flex flex-col">
        {rows.map((row, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <div
              key={row.they}
              ref={(el) => { rowsRef.current[i] = el; }}
              data-cursor="expand"
              className="group relative flex items-center border-b border-white/5 cursor-pointer"
              style={{ opacity: 0 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* ── Left side: "They" ── */}
              <div className="relative w-[40%] py-7 pr-6 flex justify-end">
                <span
                  className="relative font-satoshi text-sm md:text-base transition-colors duration-300"
                  style={{ color: isHovered ? "#ef4444" : "#555" }}
                >
                  {row.they}
                  {/* Animated red strikethrough */}
                  <span
                    className="absolute left-0 top-1/2 h-[2px] bg-red-500 origin-left transition-transform duration-500 ease-out"
                    style={{
                      width: "100%",
                      transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </span>
              </div>

              {/* ── Center divider ── */}
              <div className="w-[20%] flex items-center justify-center self-stretch">
                <div
                  ref={(el) => { centerLinesRef.current[i] = el; }}
                  className="w-[1px] h-full origin-top"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.25) 70%, transparent 100%)",
                  }}
                />
              </div>

              {/* ── Right side: "We" ── */}
              <div className="w-[40%] py-7 pl-6">
                <span
                  className="font-satoshi text-sm md:text-base font-semibold transition-all duration-300"
                  style={{
                    color: "#fff",
                    textShadow: isHovered
                      ? "0 0 20px rgba(255,255,255,0.35), 0 0 40px rgba(255,255,255,0.15)"
                      : "none",
                  }}
                >
                  {row.we}
                </span>
              </div>

              {/* ── Hover background sweep ── */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background:
                    "linear-gradient(90deg, rgba(239,68,68,0.04) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)",
                }}
              />

              {/* ── Gap tooltip ── */}
              <div
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-1 z-20 transition-all duration-300"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(-4px)",
                }}
              >
                <span className="inline-block font-satoshi text-[11px] tracking-wide text-white/60 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 whitespace-nowrap">
                  {row.gap}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
