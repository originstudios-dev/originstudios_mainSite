"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Loader } from "@/components/ui/Loader";
import { Footer } from "@/components/ui/Footer";
import { Grain } from "@/components/ui/Grain";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Particles } from "@/components/ui/Particles";
import { Hero } from "@/components/sections/Hero";
import { Logic } from "@/components/sections/Logic";
import { Craft } from "@/components/sections/Craft";
import { Comparison } from "@/components/sections/Comparison";
import { Originals } from "@/components/sections/Originals";
import { Methodology } from "@/components/sections/Methodology";
import { FinalCall } from "@/components/sections/FinalCall";
import { useLenis } from "@/lib/hooks/useLenis";

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
          <Grain />
          <CustomCursor />
          <Particles />

          <Navbar />
          <main className="bg-bg text-primary">
            <Hero />
            <Logic />
            <div className="relative">
              <StickySection z={10}>
                <Craft />
              </StickySection>
              <StickySection z={20}>
                <Comparison />
              </StickySection>
              <StickySection z={30}>
                <Originals />
              </StickySection>
              <StickySection z={40}>
                <Methodology />
              </StickySection>
              <StickySection z={50} last>
                <FinalCall />
              </StickySection>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

function StickySection({
  children,
  z,
  last = false,
}: {
  children: React.ReactNode;
  z: number;
  last?: boolean;
}) {
  return (
    <div
      className={`sticky top-0 bg-bg border-t border-white/[0.04] ${
        last ? "" : "shadow-[0_-20px_60px_rgba(0,0,0,0.8)]"
      }`}
      style={{ zIndex: z }}
    >
      {children}
    </div>
  );
}
