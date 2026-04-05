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
    <div className="flex h-screen">
      {/* Header / intro card */}
      <div className="min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw] h-screen flex flex-col items-center justify-center px-8 md:px-16 shrink-0">
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
          What we build
        </span>
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight mt-6 text-center">
          Five Systems.
          <br />
          Each One Compounds.
        </h2>
        <span className="mt-10 font-satoshi text-sm text-white/40 tracking-widest uppercase animate-pulse">
          Scroll &rarr;
        </span>
      </div>

      {/* Service cards */}
      {services.map((service, i) => {
        const deliverableList = service.deliverables.split(" · ");

        return (
          <div
            key={service.num}
            data-cursor="expand"
            className={`min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw] h-screen flex items-center shrink-0 relative px-12 md:px-20${
              i > 0 ? " border-l border-white/10" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Watermark number */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-clash text-[120px] md:text-[200px] font-bold text-white opacity-[0.05] select-none pointer-events-none leading-none">
              {service.num}
            </span>

            {/* Card content */}
            <div className="relative z-10 flex flex-col gap-4 max-w-lg">
              <span className="font-satoshi text-sm text-white/30 tracking-widest">
                {service.num}
              </span>

              <h3 className="font-clash text-3xl md:text-5xl font-bold uppercase tracking-tight">
                {service.name}
              </h3>

              <p className="font-satoshi text-body text-white/60 mt-2 text-lg leading-relaxed">
                {service.tagline}
              </p>

              {/* Deliverable pills */}
              <div className="flex flex-wrap gap-2 mt-6">
                {deliverableList.map((item) => (
                  <span
                    key={item}
                    className="font-satoshi text-xs tracking-wide uppercase px-3 py-1.5 rounded-full border border-white/10 text-white/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
