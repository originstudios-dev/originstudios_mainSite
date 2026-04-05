"use client";

import { useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/registry";
import { CharReveal } from "@/components/ui/CharReveal";

const MetaBalls = dynamic(() => import("@/components/ui/MetaBalls"), {
  ssr: false,
});

const StickerRain = dynamic(
  () => import("@/components/ui/StickerRain").then((mod) => ({ default: mod.StickerRain })),
  { ssr: false }
);

export function FinalCall() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const wrap = btnWrapRef.current;
    const btn = btnRef.current;
    if (!wrap || !btn) return;
    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    btn.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    btn.style.boxShadow = "0 0 30px rgba(216,207,188,0.10)";
  }, []);

  const onMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (btn) {
      btn.style.transform = "translate3d(0, 0, 0)";
      btn.style.boxShadow = "none";
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = sectionRef.current?.querySelectorAll("[data-animate]");
      if (!targets?.length) return;

      gsap.fromTo(
        targets,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-32 md:py-40 px-8 md:px-16 max-w-7xl mx-auto overflow-hidden flex items-center"
    >
      {/* MetaBalls background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <MetaBalls
          color="#D8CFBC"
          cursorBallColor="#D8CFBC"
          cursorBallSize={2}
          ballCount={15}
          animationSize={30}
          enableMouseInteraction
          enableTransparency={true}
          hoverSmoothness={0.15}
          clumpFactor={1}
          speed={0.3}
        />
      </div>

      {/* Sticker rain behind content */}
      <StickerRain />

      {/* Gradient top border */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(216,207,188,0.10) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full">
        <span
          data-animate
          className="font-satoshi text-sm text-[#FFFBF4]/70 tracking-[0.2em] uppercase"
        >
          Let&apos;s build
        </span>

        <div className="mt-6">
          <CharReveal text="Your Competitors Are Building Websites." className="font-clash text-5xl md:text-7xl font-bold uppercase tracking-tight leading-[1.1]" scrub={false} />
          <CharReveal text="You Could Be Building the System That Beats Them." className="font-clash text-5xl md:text-7xl font-bold uppercase tracking-tight leading-[1.1] text-body" scrub={false} delay={0.3} />
        </div>

        <p
          data-animate
          className="font-satoshi text-lg text-[#FFFBF4]/80 mt-6 max-w-xl"
        >
          Discovery calls are free. A generic digital presence is expensive.
        </p>

        <div data-animate className="mt-10 flex flex-col items-start gap-4">
          <div
            ref={btnWrapRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="py-2 px-2"
          >
            <a
              ref={btnRef}
              href="#"
              data-cursor="expand"
              className="inline-block font-satoshi text-base font-medium bg-primary text-bg px-8 py-3.5 hover:bg-[#FFFBF4]/90 transition-all duration-200 will-change-transform"
              style={{ transform: "translate3d(0,0,0)" }}
            >
              Book a Free Discovery Call →
            </a>
          </div>

          <p className="font-satoshi text-sm text-[#FFFBF4]/50">
            Or email us directly:{" "}
            <a
              href="mailto:hello@originstudios.dev"
              className="relative text-[#FFFBF4]/70 hover:text-primary transition-colors group"
            >
              <span>hello@originstudios.dev</span>
              <span className="absolute left-0 -bottom-px h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
