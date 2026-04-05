"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CharReveal } from "@/components/ui/CharReveal";
import { WordReveal } from "@/components/ui/WordReveal";

const edges = [
  {
    num: "01",
    title: "Strategy Before Pixels",
    body: "We don't open Figma until we've audited 15+ competitors, mapped your customer journey, and built a positioning architecture. The output isn't a mood board — it's a validated strategic direction.",
    gradient: "from-cyan-400 via-blue-500 to-cyan-400",
    conic: "conic-gradient(from var(--angle), #06b6d4, #3b82f6, #06b6d4, #3b82f6, #06b6d4)",
    glow: "rgba(6, 182, 212, 0.05)",
    glowHover: "0 20px 60px rgba(6, 182, 212, 0.15), 0 0 40px rgba(6, 182, 212, 0.05)",
  },
  {
    num: "02",
    title: "Motion & 3D as Standard",
    body: "Lottie animations. Three.js 3D environments. Micro-interaction systems. All performance-optimised, all in-house, all included — not charged as an expensive add-on.",
    gradient: "from-purple-400 via-pink-500 to-purple-400",
    conic: "conic-gradient(from var(--angle), #c084fc, #ec4899, #c084fc, #ec4899, #c084fc)",
    glow: "rgba(192, 132, 252, 0.05)",
    glowHover: "0 20px 60px rgba(192, 132, 252, 0.15), 0 0 40px rgba(192, 132, 252, 0.05)",
  },
  {
    num: "03",
    title: "Marketing Wired In",
    body: "Google Ads infrastructure. Meta Pixel + CAPI. Email automation. CRM integration. Your marketing stack is built into the site during construction — not bolted on after launch.",
    gradient: "from-amber-400 via-orange-500 to-amber-400",
    conic: "conic-gradient(from var(--angle), #fbbf24, #f97316, #fbbf24, #f97316, #fbbf24)",
    glow: "rgba(251, 191, 36, 0.05)",
    glowHover: "0 20px 60px rgba(251, 191, 36, 0.15), 0 0 40px rgba(251, 191, 36, 0.05)",
  },
];

export function Craft() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 60 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: cards[0],
        start: "top 85%",
      },
    });
  }, []);

  return (
    <>
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes borderSpin {
          to {
            --angle: 360deg;
          }
        }

        .card-border {
          --angle: 0deg;
        }

        .card-border:hover {
          animation: borderSpin 3s linear infinite;
        }
      `}</style>

      <section className="py-32 md:py-40 px-8 md:px-16 max-w-7xl mx-auto">
        {/* Label */}
        <WordReveal text="The Origin Difference" as="span" className="font-satoshi text-xs text-label tracking-[0.2em] uppercase" />

        {/* Headline */}
        <CharReveal text="What Standard Studios Can't Offer." className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight mt-6" scrub={false} />

        {/* Edge cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {edges.map((edge, i) => (
            <div
              key={edge.num}
              ref={(el) => { cardsRef.current[i] = el; }}
              data-cursor="expand"
              className="card-border relative p-[1px] rounded-xl group cursor-none transition-all duration-500 hover:-translate-y-2"
              style={{
                background: edge.conic,
                boxShadow: `0 10px 40px ${edge.glow}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = edge.glowHover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 10px 40px ${edge.glow}`;
              }}
            >
              <div className="relative bg-[#11120D] rounded-xl p-8 h-full overflow-hidden">
                {/* Watermark number */}
                <span
                  className="absolute top-4 right-6 font-clash text-5xl font-bold uppercase opacity-[0.08] select-none pointer-events-none"
                >
                  {edge.num}
                </span>

                {/* Number */}
                <span className="font-satoshi text-xs text-label tracking-widest relative z-10">
                  {edge.num}
                </span>

                {/* Separator line under number */}
                <div className="mt-4 h-px w-full bg-white/[0.06] group-hover:bg-white/[0.12] transition-colors duration-500 relative z-10" />

                {/* Title */}
                <h3 className="font-satoshi text-lg font-semibold text-primary mt-5 relative z-10">
                  {edge.title}
                </h3>

                {/* Body */}
                <p className="font-satoshi text-sm text-body mt-3 leading-relaxed relative z-10">
                  {edge.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom separator line */}
        <div className="mt-16 flex items-center gap-6">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <p className="font-satoshi text-xs text-label tracking-widest uppercase shrink-0">
            Three things. All in-house. All standard. None of them available from your current agency.
          </p>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>
      </section>
    </>
  );
}
