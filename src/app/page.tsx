"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Loader } from "@/components/ui/Loader";
import { Footer } from "@/components/ui/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Particles } from "@/components/ui/Particles";
import { Hero } from "@/components/sections/Hero";
import { Craft } from "@/components/sections/Craft";
import { Comparison } from "@/components/sections/Comparison";
import { Originals } from "@/components/sections/Originals";
import { Methodology } from "@/components/sections/Methodology";
import { FinalCall } from "@/components/sections/FinalCall";
import { useLenis } from "@/lib/hooks/useLenis";
import { BigLogo } from "@/components/ui/BigLogo";
import { gsap, ScrollTrigger } from "@/lib/registry";

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ref.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power3.out" }
        );
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 md:px-16">
      <div
        ref={ref}
        className="h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent 100%)",
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
}

function RevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 60 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return <div ref={ref}>{children}</div>;
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onLoadComplete = useCallback(() => setLoaded(true), []);
  useLenis();

  return (
    <>
      <Loader onComplete={onLoadComplete} />
      {loaded && (
        <>
          {/* Ambient layers */}
          <CustomCursor />
          <Particles />

          <Navbar />
          <main className="text-primary">
            <Hero />

            {/* Solid bg from here */}
            <div className="relative z-10 bg-bg">

            <SectionDivider />
            <RevealSection>
              <Craft />
            </RevealSection>

            <SectionDivider />
            <RevealSection>
              <Comparison />
            </RevealSection>

            <SectionDivider />
            <RevealSection>
              <Originals />
            </RevealSection>

            <SectionDivider />
            <RevealSection>
              <Methodology />
            </RevealSection>

            <SectionDivider />
            <RevealSection>
              <FinalCall />
            </RevealSection>
            </div>
          </main>
          <Footer />
          <BigLogo />
        </>
      )}
    </>
  );
}
