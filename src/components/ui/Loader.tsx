"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/registry";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Animate progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: "100%",
        duration: 1.0,
        ease: "power1.inOut",
      });
    }

    // Dot pulse
    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 1.3,
        opacity: 0.6,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Auto-trigger after progress completes
    const timer = setTimeout(() => {
      handleReveal();
    }, 1200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReveal = () => {
    const dot = dotRef.current;
    const overlay = overlayRef.current;
    if (!dot || !overlay) return;

    const tl = gsap.timeline();

    // Kill the pulse so it doesn't fight the reveal
    gsap.killTweensOf(dot);

    // Fade out the progress bar
    const progressBar = progressRef.current?.parentElement;
    if (progressBar) {
      tl.to(progressBar, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    // The dot itself becomes the expanding circle
    // First snap it to full opacity and reset scale
    tl.to(dot, {
      opacity: 1,
      scale: 1,
      duration: 0.15,
      ease: "power2.out",
    });

    // Then expand the dot to cover the entire viewport
    tl.to(dot, {
      width: "200vmax",
      height: "200vmax",
      borderRadius: "50%",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        overlay.style.display = "none";
        document.body.style.overflow = "";
        onComplete();
      },
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-[#11120D] flex items-center justify-center"
    >
      {/* Dot — centered, pulses, then expands into full-screen reveal */}
      <div
        ref={dotRef}
        className="rounded-full bg-[#FFFBF4]"
        style={{
          width: 12,
          height: 12,
          boxShadow: "0 0 30px rgba(255,251,244,0.5)",
        }}
      />

      {/* Progress bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[100px] h-px bg-[#FFFBF4]/10 overflow-hidden">
        <div ref={progressRef} className="h-full bg-[#FFFBF4]/40 w-0" />
      </div>
    </div>
  );
}
