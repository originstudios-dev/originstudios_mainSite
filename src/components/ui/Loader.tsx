"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/registry";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Animate progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: "100%",
        duration: 1.8,
        ease: "power1.inOut",
      });
    }

    // Dot pulse
    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 1.3,
        opacity: 0.4,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Auto-trigger after progress completes
    const timer = setTimeout(() => {
      handleReveal();
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReveal = () => {
    if (!circleRef.current || !overlayRef.current) return;

    const tl = gsap.timeline();

    // Fade out dot and progress
    tl.to([dotRef.current, progressRef.current?.parentElement], {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
    });

    // White circle scales up from center — dramatic reveal
    tl.to(circleRef.current, {
      scale: 1,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.display = "none";
        }
        document.body.style.overflow = "";
        onComplete();
      },
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center flex-col"
    >
      {/* Pulsing dot */}
      <div
        ref={dotRef}
        className="w-3 h-3 rounded-full bg-white mb-12"
        style={{ boxShadow: "0 0 30px rgba(255,255,255,0.5)" }}
      />

      {/* Progress bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[100px] h-px bg-white/10 overflow-hidden">
        <div ref={progressRef} className="h-full bg-white/40 w-0" />
      </div>

      {/* White circle for dramatic reveal — starts scale(0), expands to cover viewport */}
      <div
        ref={circleRef}
        className="absolute left-1/2 top-1/2 w-[200vmax] h-[200vmax] rounded-full bg-white pointer-events-none"
        style={{ transform: "translate(-50%, -50%) scale(0)" }}
      />
    </div>
  );
}
