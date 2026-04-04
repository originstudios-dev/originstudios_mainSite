"use client";

import { useState } from "react";

const rows = [
  { they: "WordPress + Elementor", we: "Next.js / Astro",          gap: "3–8× faster. Zero bloat." },
  { they: "Static design",         we: "Lottie + Three.js",        gap: "Remembered vs. forgotten." },
  { they: "No structured data",    we: "Full JSON-LD suite",       gap: "Invisible vs. cited by AI." },
  { they: "Shared hosting",        we: "Vercel Edge",              gap: "Global CDN. Auto-scaling." },
  { they: "Generic theme",         we: "Custom Figma-to-code",     gap: "Your brand. Not a template." },
  { they: "Manual setup",          we: "GTM + GA4 + Pixel",        gap: "Connected vs. fragmented." },
];

export function Comparison() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="stack" className="py-32 md:py-40 px-8 md:px-16 max-w-7xl mx-auto">
      <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
        The stack
      </span>
      <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight mt-6">
        Two Audiences.
        <br />
        Most Developers Build for One.
      </h2>

      <div className="mt-16">
        {/* Header row */}
        <div className="grid grid-cols-3 gap-4 pb-4 border-b border-white/10">
          <span className="font-satoshi text-xs text-muted tracking-wide uppercase">
            What they use
          </span>
          <span className="font-satoshi text-xs text-muted tracking-wide uppercase">
            What we use
          </span>
          <span className="font-satoshi text-xs text-primary tracking-wide uppercase">
            The gap
          </span>
        </div>

        {/* Data rows */}
        {rows.map((row, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <div
              key={row.they}
              className="relative overflow-hidden border-b border-white/5"
              data-cursor="expand"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* White sweep background */}
              <div
                className="absolute inset-0 bg-white origin-left transition-transform duration-300 ease-out"
                style={{ transform: isHovered ? "scaleX(1)" : "scaleX(0)" }}
              />

              {/* Row content */}
              <div className="relative z-10 grid grid-cols-3 gap-4 py-6 transition-colors duration-300">
                <span
                  className="font-satoshi text-sm transition-colors duration-300"
                  style={{ color: isHovered ? "#0a0a0a" : "#444" }}
                >
                  {row.they}
                </span>
                <span
                  className="font-satoshi text-sm font-medium transition-colors duration-300"
                  style={{ color: isHovered ? "#0a0a0a" : "#fff" }}
                >
                  {row.we}
                </span>
                <span
                  className="font-satoshi text-sm font-medium transition-colors duration-300"
                  style={{ color: isHovered ? "#0a0a0a" : "#666" }}
                >
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
