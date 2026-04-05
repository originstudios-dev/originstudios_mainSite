"use client";

import { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";
import { CharReveal } from "@/components/ui/CharReveal";
import { WordReveal } from "@/components/ui/WordReveal";

const steps = [
  {
    num: "01",
    title: "Discovery",
    detail: "Weeks 1–2",
    description: "Strategy, audit, positioning, wireframes",
  },
  {
    num: "02",
    title: "Design",
    detail: "Weeks 3–4",
    description: "Figma, motion concepts, design system",
  },
  {
    num: "03",
    title: "Build",
    detail: "Weeks 5–6",
    description: "Next.js, animations, CMS, marketing stack",
  },
  {
    num: "04",
    title: "Schema & GEO",
    detail: "Week 7",
    description: "JSON-LD, entity mapping, AEO pages",
  },
  {
    num: "05",
    title: "Launch",
    detail: "Week 8",
    description: "95+ Lighthouse, QA, campaign-ready",
  },
];

export function Methodology() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              end: "top 70%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="method"
      ref={sectionRef}
      className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto"
    >
      <WordReveal text="How we work" as="span" className="font-satoshi text-sm text-[#FFFBF4]/60 tracking-[0.2em] uppercase" />

      <div className="mt-6">
        <CharReveal text="Five Sprints. Eight Weeks." className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight" scrub={false} />
        <CharReveal text="One Launch." className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight" scrub={false} delay={0.3} />
      </div>

      <div className="mt-16">
        {steps.map((step, i) => {
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={step.num}
              ref={(el) => {
                rowsRef.current[i] = el;
              }}
              className="relative overflow-hidden border-b border-[#D8CFBC]/[0.06]"
              data-cursor="expand"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Floral white sweep background */}
              <div
                className="absolute inset-0 bg-[#FFFBF4] origin-left transition-transform duration-300 ease-out"
                style={{ transform: isHovered ? "scaleX(1)" : "scaleX(0)" }}
              />

              <div
                className="relative z-10 flex items-center py-6 md:py-8 transition-all duration-300"
                style={{ paddingLeft: isHovered ? "1rem" : "0" }}
              >
                <span
                  className="font-satoshi text-2xl md:text-3xl font-light w-20 transition-colors duration-300"
                  style={{ color: isHovered ? "#11120D" : "#FFFBF4" }}
                >
                  {step.num}
                </span>

                {/* Title crossfades to description on hover */}
                <span className="flex-1 relative">
                  <span
                    className="font-clash text-xl md:text-3xl font-bold uppercase tracking-tight transition-all duration-300 inline-block"
                    style={{
                      opacity: isHovered ? 0 : 1,
                      transform: isHovered ? "translateY(-10px)" : "translateY(0)",
                      color: "#FFFBF4",
                    }}
                  >
                    {step.title}
                  </span>
                  <span
                    className="absolute inset-0 font-satoshi text-sm md:text-base flex items-center transition-all duration-300"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "translateY(0)" : "translateY(10px)",
                      color: "#11120D",
                    }}
                  >
                    {step.description}
                  </span>
                </span>

                <span
                  className="hidden md:block font-satoshi text-xs tracking-wide text-right max-w-[200px] transition-all duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    color: "#11120D",
                    transform: isHovered ? "translateX(0)" : "translateX(20px)",
                  }}
                >
                  {step.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
