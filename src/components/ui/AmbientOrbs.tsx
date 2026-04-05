"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";

/**
 * Subtle floating orbs + crosses that appear between sections.
 * Placed as a fixed layer, scroll-driven opacity based on position.
 */
export function AmbientOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const orbs = el.querySelectorAll("[data-orb]");
    const crosses = el.querySelectorAll("[data-cross]");

    // Gentle floating animation for orbs
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: `+=${15 + i * 5}`,
        x: `+=${(i % 2 === 0 ? 1 : -1) * (8 + i * 3)}`,
        duration: 4 + i * 0.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.6,
      });
    });

    // Slow rotation for crosses
    crosses.forEach((cross, i) => {
      gsap.to(cross, {
        rotation: 360,
        duration: 20 + i * 5,
        ease: "none",
        repeat: -1,
      });
      gsap.to(cross, {
        y: `+=${10 + i * 4}`,
        duration: 5 + i,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.4,
      });
    });

    // Breathing pulse on orbs
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        scale: 1.15,
        opacity: parseFloat((orb as HTMLElement).style.opacity) * 1.3,
        duration: 3 + i * 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[3] overflow-hidden"
    >
      {/* Soft gradient orbs scattered across viewport */}
      {/* Top-right area */}
      <div
        data-orb
        className="absolute"
        style={{
          top: "15%",
          right: "8%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(86,84,73,0.08) 0%, transparent 70%)",
          opacity: 0.6,
        }}
      />
      {/* Mid-left */}
      <div
        data-orb
        className="absolute"
        style={{
          top: "45%",
          left: "5%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(216,207,188,0.05) 0%, transparent 70%)",
          opacity: 0.5,
        }}
      />
      {/* Bottom-right */}
      <div
        data-orb
        className="absolute"
        style={{
          top: "72%",
          right: "12%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(86,84,73,0.06) 0%, transparent 70%)",
          opacity: 0.5,
        }}
      />
      {/* Lower-left */}
      <div
        data-orb
        className="absolute"
        style={{
          top: "88%",
          left: "15%",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(216,207,188,0.04) 0%, transparent 70%)",
          opacity: 0.4,
        }}
      />

      {/* Small cross/plus markers — subtle geometric accents */}
      {[
        { top: "22%", left: "12%", size: 14, opacity: 0.15 },
        { top: "35%", right: "18%", size: 12, opacity: 0.12 },
        { top: "58%", left: "22%", size: 16, opacity: 0.1 },
        { top: "68%", right: "8%", size: 10, opacity: 0.13 },
        { top: "82%", left: "30%", size: 12, opacity: 0.1 },
        { top: "12%", left: "45%", size: 10, opacity: 0.08 },
        { top: "48%", right: "30%", size: 14, opacity: 0.1 },
        { top: "92%", right: "25%", size: 11, opacity: 0.09 },
      ].map((pos, i) => (
        <svg
          key={i}
          data-cross
          className="absolute"
          style={{
            top: pos.top,
            left: "left" in pos ? pos.left : undefined,
            right: "right" in pos ? pos.right : undefined,
            width: pos.size,
            height: pos.size,
            opacity: pos.opacity,
          }}
          viewBox="0 0 12 12"
          fill="none"
        >
          <line x1="6" y1="0" x2="6" y2="12" stroke="#D8CFBC" strokeWidth="1" />
          <line x1="0" y1="6" x2="12" y2="6" stroke="#D8CFBC" strokeWidth="1" />
        </svg>
      ))}

      {/* Thin horizontal accent lines at various heights */}
      {[
        { top: "30%", left: "0%", width: "12%", opacity: 0.04 },
        { top: "55%", right: "0%", width: "10%", opacity: 0.03 },
        { top: "78%", left: "0%", width: "8%", opacity: 0.04 },
      ].map((line, i) => (
        <div
          key={`line-${i}`}
          className="absolute h-px"
          style={{
            top: line.top,
            left: "left" in line ? line.left : undefined,
            right: "right" in line ? line.right : undefined,
            width: line.width,
            background: `linear-gradient(90deg, ${"left" in line ? "transparent" : "rgba(216,207,188," + line.opacity + ")"}, ${"left" in line ? "rgba(216,207,188," + line.opacity + ")" : "transparent"})`,
          }}
        />
      ))}
    </div>
  );
}
