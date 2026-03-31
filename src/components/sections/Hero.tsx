"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "@/lib/registry";
import { useDeviceCapability } from "@/lib/hooks/useDeviceCapability";
import { OrbFallback } from "@/components/three/OrbFallback";

const Scene = dynamic(
  () =>
    import("@/components/three/Scene").then((mod) => ({
      default: mod.Scene,
    })),
  { ssr: false, loading: () => <OrbFallback /> }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tier = useDeviceCapability();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.5,
      },
    });

    tl.fromTo(
      line1Ref.current,
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.3 }
    )
      .fromTo(
        line2Ref.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.3 },
        "+=0.05"
      )
      .fromTo(
        line3Ref.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.3 },
        "+=0.05"
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 },
        "+=0.1"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 },
        "+=0.05"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center overflow-hidden"
    >
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto px-8 md:px-16">
        {/* Left: text */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex flex-col gap-1">
            <div ref={line1Ref} className="opacity-0">
              <h1 className="font-clash text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9]">
                The Internet
              </h1>
            </div>
            <div ref={line2Ref} className="opacity-0">
              <h1 className="font-clash text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9]">
                Has Changed.
              </h1>
            </div>
            <div ref={line3Ref} className="opacity-0">
              <h1 className="font-clash text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9] text-body">
                Yours Hasn&apos;t.
              </h1>
            </div>
          </div>

          <div ref={subtextRef} className="opacity-0">
            <p className="font-satoshi text-base md:text-lg text-body leading-relaxed max-w-md">
              Most sites in 2026 are invisible noise. We build{" "}
              <span className="text-primary font-medium">Origin Points</span>:
              bespoke, high-conversion digital presences engineered to be found
              by humans and cited by AI.
            </p>
          </div>

          <div ref={ctaRef} className="opacity-0 flex gap-4 items-center">
            <a
              href="#contact"
              className="font-satoshi text-sm font-medium bg-primary text-bg px-6 py-3 hover:bg-white/90 transition-colors"
            >
              Secure Your Authority
            </a>
            <a
              href="#manifesto"
              className="font-satoshi text-sm text-body border-b border-body hover:text-primary hover:border-primary transition-colors pb-0.5"
            >
              View Manifesto
            </a>
          </div>
        </div>

        {/* Right: orb */}
        <div className="hidden md:block w-[350px] h-[350px] lg:w-[450px] lg:h-[450px]">
          {tier === "high" ? <Scene /> : <OrbFallback />}
        </div>
      </div>
    </section>
  );
}
