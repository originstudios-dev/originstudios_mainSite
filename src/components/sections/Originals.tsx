"use client";

import { useState } from "react";

const services = [
  {
    num: "01",
    name: "Startup Websites",
    tagline: "Your first impression, engineered to convert.",
    deliverables: "Landing pages · Investor decks · Product showcases · Launch sites",
  },
  {
    num: "02",
    name: "SaaS Platforms",
    tagline: "Dashboards, onboarding, and growth loops.",
    deliverables: "Web apps · Auth flows · Billing integration · User dashboards",
  },
  {
    num: "03",
    name: "Brand Experiences",
    tagline: "3D, motion, and interactions that get remembered.",
    deliverables: "Three.js scenes · Scroll animations · Micro-interactions · WebGL",
  },
  {
    num: "04",
    name: "AI-Visible Systems",
    tagline: "Built to be cited, not just indexed.",
    deliverables: "GEO strategy · JSON-LD · Entity mapping · AI search monitoring",
  },
  {
    num: "05",
    name: "Growth Infrastructure",
    tagline: "Marketing wired in. Not bolted on.",
    deliverables: "Custom CMS · Analytics · Ad tracking · Email automation · CRM",
  },
];

export function Originals() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div id="work" className="flex h-screen">
      {/* Header / intro card */}
      <div className="min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw] h-screen flex flex-col items-center justify-center px-6 sm:px-8 md:px-16 shrink-0">
        <span className="font-satoshi text-sm text-[#D8CFBC] tracking-[0.2em] uppercase font-medium">
          What we build
        </span>
        <h2 className="font-clash text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight mt-6 text-center text-[#FFFBF4]">
          Five Systems.
          <br />
          Each One Compounds.
        </h2>
        <p className="font-satoshi text-sm sm:text-base text-[#D8CFBC]/60 mt-6 text-center max-w-md px-4">
          Every system we build feeds the next. Strategy informs design. Design informs build. Build informs growth.
        </p>
        <span className="mt-10 font-satoshi text-sm text-[#D8CFBC] tracking-widest uppercase animate-pulse font-medium">
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
            className={`min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw] h-screen flex items-center shrink-0 relative px-6 sm:px-12 md:px-20${
              i > 0 ? " border-l border-[#D8CFBC]/10" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Watermark number */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-clash text-[80px] sm:text-[120px] md:text-[200px] font-bold text-[#D8CFBC] opacity-[0.06] select-none pointer-events-none leading-none">
              {service.num}
            </span>

            {/* Card content */}
            <div className="relative z-10 flex flex-col gap-3 sm:gap-4 max-w-lg">
              <span className="font-satoshi text-sm text-[#D8CFBC] tracking-widest font-medium">
                {service.num}
              </span>

              <h3 className="font-clash text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#FFFBF4]">
                {service.name}
              </h3>

              <p className="font-satoshi text-[#D8CFBC] mt-1 sm:mt-2 text-base sm:text-lg leading-relaxed">
                {service.tagline}
              </p>

              {/* Deliverable pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                {deliverableList.map((item) => (
                  <span
                    key={item}
                    className="font-satoshi text-xs sm:text-sm tracking-wide uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#D8CFBC]/20 text-[#D8CFBC]/70 font-medium"
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
