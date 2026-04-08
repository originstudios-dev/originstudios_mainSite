"use client";

import dynamic from "next/dynamic";
import { CharReveal } from "@/components/ui/CharReveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { Card } from "@/components/ui/CardSwap";

const CardSwap = dynamic(() => import("@/components/ui/CardSwap"), {
  ssr: false,
});

const edges = [
  {
    num: "01",
    title: "Strategy Before Pixels",
    body: "We audit 15+ competitors, map your customer journey, and build a positioning architecture before opening Figma. The output is a validated strategic direction, not a mood board.",
  },
  {
    num: "02",
    title: "Custom Build. Zero Templates.",
    body: "Every line of code is written for your product. Next.js, custom CMS, headless architecture. No page builders, no bloat, no shortcuts. Your startup deserves a system built from scratch.",
  },
  {
    num: "03",
    title: "Motion & 3D as Standard",
    body: "Lottie animations. Three.js environments. Micro-interaction systems. All performance-optimised, all in-house, all included. Not charged as an expensive add-on.",
  },
  {
    num: "04",
    title: "Custom CMS & Ongoing Support",
    body: "We build you a CMS that fits your workflow, not the other way around. Post-launch, we stay on. Bug fixes, feature requests, scaling support. We build your startup like it is ours.",
  },
  {
    num: "05",
    title: "Marketing Wired In",
    body: "Google Ads infrastructure. Meta Pixel + CAPI. Email automation. CRM integration. Your marketing stack is built into the site during construction, not bolted on after launch.",
  },
];

export function Craft() {
  return (
    <>
      <style>{`
        .card-swap-container {
          position: relative;
          perspective: 900px;
          overflow: visible;
        }

        .card-swap-card {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 12px;
          border: 1px solid #565449;
          background: #D8CFBC;
          transform-style: preserve-3d;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        @media (max-width: 768px) {
          .card-swap-container {
            transform: scale(0.85);
          }
        }

        @media (max-width: 480px) {
          .card-swap-container {
            transform: scale(0.65);
          }
        }
      `}</style>

      <section id="services" className="py-32 md:py-40 px-8 md:px-16 max-w-7xl mx-auto">
        {/* Label */}
        <WordReveal
          text="The Origin Difference"
          as="span"
          className="font-satoshi text-sm text-[#D8CFBC] tracking-[0.2em] uppercase"
        />

        {/* Headline */}
        <div className="mt-6">
          <CharReveal
            text="What Standard Studios"
            className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight"
            scrub={false}
          />
          <CharReveal
            text="Can't Offer."
            className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight"
            scrub={false}
            delay={0.3}
          />
        </div>

        {/* Two-column: text left + swapping cards right */}
        <div className="mt-16 flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left: summary text */}
          <div className="flex-1 flex flex-col gap-8 lg:pt-8">
            {edges.map((edge) => (
              <div key={edge.num} className="flex gap-4">
                <span className="font-satoshi text-sm text-[#D8CFBC] font-bold tracking-widest shrink-0 pt-0.5">
                  {edge.num}
                </span>
                <div>
                  <h3 className="font-satoshi text-lg font-bold text-[#FFFBF4]">
                    {edge.title}
                  </h3>
                  <p className="font-satoshi text-sm text-[#D8CFBC]/70 mt-1 leading-relaxed">
                    {edge.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: swapping card stack */}
          <div className="relative w-full lg:w-[480px] h-[420px] shrink-0 flex items-center justify-center">
            <CardSwap
              width={420}
              height={340}
              cardDistance={50}
              verticalDistance={55}
              delay={4000}
              pauseOnHover={false}
              skewAmount={5}
              easing="elastic"
            >
              {edges.map((edge) => (
                <Card key={edge.num}>
                  <div className="p-8 h-full flex flex-col justify-between relative overflow-hidden">
                    {/* Watermark */}
                    <span className="absolute top-4 right-6 font-clash text-6xl font-bold uppercase text-[#565449]/10 select-none pointer-events-none">
                      {edge.num}
                    </span>

                    <div className="relative z-10">
                      <span className="font-satoshi text-sm text-[#565449] tracking-widest font-bold">
                        {edge.num}
                      </span>
                      <div className="mt-3 h-px w-full bg-[#565449]/20" />
                      <h3 className="font-satoshi text-xl font-bold text-[#11120D] mt-5">
                        {edge.title}
                      </h3>
                      <p className="font-satoshi text-sm text-[#11120D]/70 mt-3 leading-relaxed">
                        {edge.body}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

        {/* Bottom separator line */}
        <div className="mt-16 flex items-center gap-6">
          <div className="flex-1 h-px bg-[#D8CFBC]/10" />
          <p className="font-satoshi text-sm text-[#D8CFBC]/60 tracking-widest uppercase shrink-0">
            Five things. All in-house. All standard.
          </p>
          <div className="flex-1 h-px bg-[#D8CFBC]/10" />
        </div>
      </section>
    </>
  );
}
