"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Loader } from "@/components/ui/Loader";
import { Footer } from "@/components/ui/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Particles } from "@/components/ui/Particles";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";
import { WavePath } from "@/components/ui/WavePath";
import { Hero } from "@/components/sections/Hero";
import { Craft } from "@/components/sections/Craft";
import { Comparison } from "@/components/sections/Comparison";
import { Originals } from "@/components/sections/Originals";
import { Methodology } from "@/components/sections/Methodology";
import { FinalCall } from "@/components/sections/FinalCall";
import { useLenis } from "@/lib/hooks/useLenis";
import { BigLogo } from "@/components/ui/BigLogo";
import { ScrollLine } from "@/components/ui/ScrollLine";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import { CursorReveal } from "@/components/ui/CursorReveal";
import { gsap, ScrollTrigger } from "@/lib/registry";

function HorizontalScrollSection({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const scrollWidth = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.5,
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <div ref={trackRef} className="flex will-change-transform">
        {children}
      </div>
    </section>
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
          <ScrollLine />
          <AmbientOrbs />

          <Navbar />
          <main className="text-primary">
            <Hero />

            {/* Solid bg from here */}
            <div className="relative z-10 bg-bg">

            <WavePath className="px-8 md:px-16" />
            <VelocityMarquee
              text="STRATEGY · DESIGN · BUILD · MOTION · GEO · OPTIMIZE ·"
              className="font-clash text-xl md:text-2xl font-bold uppercase text-[#D8CFBC] tracking-widest"
              baseVelocity={30}
            />
            <RevealSection>
              <Craft />
            </RevealSection>

            <WavePath className="px-8 md:px-16" />
            <VelocityMarquee
              text="STRATEGY · DESIGN · BUILD · MOTION · GEO · OPTIMIZE ·"
              className="font-clash text-xl md:text-2xl font-bold uppercase text-[#D8CFBC] tracking-widest"
              baseVelocity={30}
            />
            <RevealSection>
              <Comparison />
            </RevealSection>

            {/* Pull-quote with cursor reveal */}
            <RevealSection>
              <div className="py-20 md:py-28 px-8 md:px-16 max-w-5xl mx-auto text-center">
                <CursorReveal
                  revealBg="#D8CFBC"
                  revealRadius={200}
                  base={
                    <p className="font-clash text-2xl md:text-4xl font-bold uppercase tracking-tight text-[#565449] leading-snug">
                      The gap between a website and a system is the gap between being found and being forgotten.
                    </p>
                  }
                  revealed={
                    <p className="font-clash text-2xl md:text-4xl font-bold uppercase tracking-tight text-[#11120D] leading-snug">
                      Your agency uses WordPress and calls it &ldquo;custom.&rdquo; We write every line from scratch and call it Tuesday. Origin Studios go brr.
                    </p>
                  }
                />
                <span className="inline-block mt-6 h-px w-16 bg-[#565449]/30" />
              </div>
            </RevealSection>

            <WavePath className="px-8 md:px-16" />
            <VelocityMarquee
              text="STRATEGY · DESIGN · BUILD · MOTION · GEO · OPTIMIZE ·"
              className="font-clash text-xl md:text-2xl font-bold uppercase text-[#D8CFBC] tracking-widest"
              baseVelocity={30}
            />
            <HorizontalScrollSection>
              <Originals />
            </HorizontalScrollSection>

            <WavePath className="px-8 md:px-16" />
            <VelocityMarquee
              text="STRATEGY · DESIGN · BUILD · MOTION · GEO · OPTIMIZE ·"
              className="font-clash text-xl md:text-2xl font-bold uppercase text-[#D8CFBC] tracking-widest"
              baseVelocity={30}
            />
            <RevealSection>
              <Methodology />
            </RevealSection>

            {/* Stats strip, tight under methodology */}
            <div className="pb-16 md:pb-24 px-8 md:px-16 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20">
                {[
                  { value: "8", label: "Week delivery" },
                  { value: "95+", label: "Lighthouse score" },
                  { value: "0", label: "Templates used" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <span className="font-clash text-5xl md:text-6xl font-bold text-[#D8CFBC]">
                      {stat.value}
                    </span>
                    <p className="font-satoshi text-sm text-[#FFFBF4]/50 mt-2 tracking-wide uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <WavePath className="px-8 md:px-16" />
            <VelocityMarquee
              text="STRATEGY · DESIGN · BUILD · MOTION · GEO · OPTIMIZE ·"
              className="font-clash text-xl md:text-2xl font-bold uppercase text-[#D8CFBC] tracking-widest"
              baseVelocity={30}
            />
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
