"use client";

import { useState } from "react";

const services = [
  {
    num: "01",
    name: "Origin Discovery",
    tagline: "Strategy before pixels. Every time.",
    deliverables: "Competitor audit · Positioning · UX research · Message hierarchy",
  },
  {
    num: "02",
    name: "Origin Build",
    tagline: "Custom. Fast. No builders. No bloat.",
    deliverables: "Next.js · Sub-1s load · Sanity CMS · Handover docs",
  },
  {
    num: "03",
    name: "Origin Motion",
    tagline: "Motion & 3D as standard.",
    deliverables: "Lottie · Three.js · Micro-interactions · Motion guide",
  },
  {
    num: "04",
    name: "Origin GEO",
    tagline: "Be the source AI engines cite.",
    deliverables: "Entity mapping · JSON-LD · AEO clusters · AI monitoring",
  },
  {
    num: "05",
    name: "Origin Marketing",
    tagline: "Marketing stack, wired in at build.",
    deliverables: "Ads infra · Meta Pixel · Email automation · Attribution",
  },
];

export function Originals() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
      <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
        What we build
      </span>

      <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight mt-6">
        Five Systems. Each One Compounds.
      </h2>

      <div className="mt-16">
        {services.map((service, i) => {
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={service.num}
              className="relative overflow-hidden border-b border-white/[0.06]"
              data-cursor="expand"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* White sweep background */}
              <div
                className="absolute inset-0 bg-white origin-left transition-transform duration-300 ease-out"
                style={{ transform: isHovered ? "scaleX(1)" : "scaleX(0)" }}
              />

              <div
                className="relative z-10 flex items-center py-6 md:py-8 transition-all duration-300"
                style={{ paddingLeft: isHovered ? "1rem" : "0" }}
              >
                <span
                  className="font-satoshi text-2xl md:text-3xl font-light w-20 transition-colors duration-300"
                  style={{ color: isHovered ? "#0a0a0a" : "#ffffff" }}
                >
                  {service.num}
                </span>

                <span className="flex-1 relative">
                  <span
                    className="font-clash text-xl md:text-3xl font-bold uppercase tracking-tight block transition-all duration-300"
                    style={{ color: isHovered ? "#0a0a0a" : "#ffffff" }}
                  >
                    {service.name}
                  </span>

                  {/* Tagline → Deliverables crossfade */}
                  <span className="relative block h-5 mt-1">
                    <span
                      className="absolute inset-0 font-satoshi text-sm transition-all duration-300"
                      style={{
                        opacity: isHovered ? 0 : 1,
                        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                        color: "#6b6b6b",
                      }}
                    >
                      {service.tagline}
                    </span>
                    <span
                      className="absolute inset-0 font-satoshi text-sm transition-all duration-300"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(6px)",
                        color: "#0a0a0a",
                      }}
                    >
                      {service.deliverables}
                    </span>
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
