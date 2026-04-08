"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";

interface CursorRevealProps {
  base: React.ReactNode;
  revealed: React.ReactNode;
  revealBg?: string;
  revealRadius?: number;
  className?: string;
}

export function CursorReveal({
  base,
  revealed,
  revealBg = "#565449",
  revealRadius = 250,
  className = "",
}: CursorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
  }, []);

  // ── Desktop: cursor-following spotlight ──
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const el = containerRef.current;
      const rev = revealRef.current;
      if (!el || !rev) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left + 150;
      const y = e.clientY - rect.top + 150;
      rev.style.clipPath = `circle(${revealRadius}px at ${x}px ${y}px)`;
    },
    [revealRadius, isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    const rev = revealRef.current;
    if (!rev) return;
    rev.style.clipPath = "circle(0px at 50% 50%)";
  }, [isMobile]);

  // ── Mobile: scroll-triggered breathing reveal ──
  if (isMobile) {
    return <MobileReveal base={base} revealed={revealed} revealBg={revealBg} className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-visible ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "none" }}
    >
      <div>{base}</div>
      <div
        ref={revealRef}
        className="absolute pointer-events-none"
        style={{
          top: -150,
          left: -150,
          right: -150,
          bottom: -150,
          padding: 150,
          background: revealBg,
          clipPath: "circle(0px at 50% 50%)",
          transition: "clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {revealed}
      </div>
    </div>
  );
}

/**
 * Mobile: When the section scrolls into view, a circle expands from center
 * to reveal the alternate text, holds, then contracts back. Pure CSS
 * transitions driven by IntersectionObserver — zero RAF overhead.
 */
function MobileReveal({
  base,
  revealed,
  revealBg,
  className,
}: {
  base: React.ReactNode;
  revealed: React.ReactNode;
  revealBg: string;
  className: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"hidden" | "revealing" | "revealed" | "hiding">("hidden");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay so the user sees the base text first
          timeoutRef.current = setTimeout(() => {
            setPhase("revealing");
            // Hold the reveal
            timeoutRef.current = setTimeout(() => {
              setPhase("revealed");
              // Begin contracting
              timeoutRef.current = setTimeout(() => {
                setPhase("hiding");
                // Reset for next scroll
                timeoutRef.current = setTimeout(() => {
                  setPhase("hidden");
                }, 800);
              }, 2000);
            }, 800);
          }, 400);
        } else {
          // Reset when out of view so it re-triggers on next scroll
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setPhase("hidden");
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Map phase to clip-path radius
  const isOpen = phase === "revealing" || phase === "revealed";
  const clipRadius = isOpen ? "120%" : "0%";

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {/* Base text — always rendered */}
      <div
        style={{
          transition: "opacity 0.6s ease",
          opacity: isOpen ? 0.3 : 1,
        }}
      >
        {base}
      </div>

      {/* Revealed text — clip-path circle expands from center */}
      <div
        className="absolute inset-0 flex items-center justify-center rounded-2xl"
        style={{
          background: revealBg,
          clipPath: `circle(${clipRadius} at 50% 50%)`,
          transition: "clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            transition: "opacity 0.4s ease 0.2s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "scale(1)" : "scale(0.95)",
          }}
        >
          {revealed}
        </div>
      </div>

      {/* Subtle hint line that pulses before reveal */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: phase === "hidden" ? 24 : 0,
          height: 2,
          borderRadius: 1,
          background: "rgba(216,207,188,0.3)",
          transition: "width 0.4s ease, opacity 0.3s ease",
          opacity: phase === "hidden" ? 1 : 0,
        }}
      />
    </div>
  );
}
