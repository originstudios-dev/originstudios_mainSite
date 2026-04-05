"use client";

import React, { useRef, useCallback } from "react";

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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      const rev = revealRef.current;
      if (!el || !rev) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left + 150;
      const y = e.clientY - rect.top + 150;
      rev.style.clipPath = `circle(${revealRadius}px at ${x}px ${y}px)`;
    },
    [revealRadius]
  );

  const handleMouseLeave = useCallback(() => {
    const rev = revealRef.current;
    if (!rev) return;
    rev.style.clipPath = "circle(0px at 50% 50%)";
  }, []);

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
