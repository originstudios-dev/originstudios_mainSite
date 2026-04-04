"use client";

import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SourceRevealProps {
  children: React.ReactNode;
  source: React.ReactNode;
  navSource?: React.ReactNode;
  className?: string;
  revealSize?: number;
}

export function SourceReveal({
  children,
  source,
  navSource,
  className = "",
  revealSize = 250,
}: SourceRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const cx = useRef(0);
  const cy = useRef(0);
  const currentSize = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on scroll
  useEffect(() => {
    const onScroll = () => {
      active.current = false;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pure RAF loop — no React re-renders on mouse move
  useEffect(() => {
    if (!mounted) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    let raf: number;
    const tick = () => {
      const targetSize = active.current ? revealSize : 0;
      currentSize.current += (targetSize - currentSize.current) * 0.15;

      if (currentSize.current > 0.5 || active.current) {
        overlay.style.clipPath = `circle(${currentSize.current}px at ${cx.current}px ${cy.current}px)`;
        overlay.style.visibility = "visible";
      } else {
        overlay.style.visibility = "hidden";
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [mounted, revealSize]);

  const onMouseMove = (e: React.MouseEvent) => {
    cx.current = e.clientX;
    cy.current = e.clientY;
    active.current = true;
  };

  const onMouseLeave = () => {
    active.current = false;
  };

  const overlay = (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none bg-white text-[#0a0a0a]"
      style={{
        zIndex: 9998,
        visibility: "hidden",
        clipPath: "circle(0px at 0px 0px)",
        willChange: "clip-path",
      }}
    >
      {navSource && (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-center px-8 py-5">
          {navSource}
        </div>
      )}
      <div className="h-screen w-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16">
          {source}
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div>{children}</div>
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
