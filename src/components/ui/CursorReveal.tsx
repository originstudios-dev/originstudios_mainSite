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
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  if (isMobile) {
    return (
      <div className={className}>
        {/* Show one or the other, no absolute positioning */}
        {!tapped ? (
          <div>{base}</div>
        ) : (
          <div
            className="rounded-xl px-4 py-6"
            style={{ background: revealBg }}
          >
            {revealed}
          </div>
        )}
        <button
          onClick={() => setTapped((t) => !t)}
          className="mt-5 font-satoshi text-xs font-medium tracking-widest uppercase px-5 py-2.5 rounded-full border border-[#D8CFBC]/30 text-[#D8CFBC] active:bg-[#D8CFBC]/10 transition-colors mx-auto block"
        >
          {tapped ? "Show original" : "Tap to reveal"}
        </button>
      </div>
    );
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
