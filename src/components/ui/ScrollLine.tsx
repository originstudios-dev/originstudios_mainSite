"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";

// 3 main lines with different personalities, plus branch lines that fork from intersection points
function buildPaths(w: number, h: number) {
  // Line 1: enters top-left, sweeps right then curls back
  const line1 = [
    `M -10 ${h * 0.1}`,
    `C ${w * 0.15} ${h * -0.05}, ${w * 0.35} ${h * 0.3}, ${w * 0.5} ${h * 0.25}`,
    `C ${w * 0.65} ${h * 0.2}, ${w * 0.8} ${h * 0.45}, ${w * 0.6} ${h * 0.55}`,
    `C ${w * 0.4} ${h * 0.65}, ${w * 0.15} ${h * 0.5}, ${w * 0.25} ${h * 0.8}`,
    `C ${w * 0.35} ${h * 1.1}, ${w * 0.6} ${h * 0.95}, ${w + 10} ${h * 0.85}`,
  ].join(" ");

  // Line 2: enters mid-left, cuts diagonally, intersects line 1 around center
  const line2 = [
    `M -10 ${h * 0.55}`,
    `C ${w * 0.1} ${h * 0.4}, ${w * 0.3} ${h * 0.2}, ${w * 0.45} ${h * 0.35}`,
    `C ${w * 0.6} ${h * 0.5}, ${w * 0.5} ${h * 0.7}, ${w * 0.65} ${h * 0.6}`,
    `C ${w * 0.8} ${h * 0.5}, ${w * 0.95} ${h * 0.7}, ${w * 0.85} ${h * 0.9}`,
    `C ${w * 0.75} ${h * 1.1}, ${w * 0.55} ${h * 1.15}, ${w * 0.4} ${h * 1.05}`,
  ].join(" ");

  // Line 3: enters bottom-left, arcs high, crosses both lines
  const line3 = [
    `M -10 ${h * 0.9}`,
    `C ${w * 0.08} ${h * 0.75}, ${w * 0.2} ${h * 0.45}, ${w * 0.35} ${h * 0.4}`,
    `C ${w * 0.5} ${h * 0.35}, ${w * 0.7} ${h * 0.15}, ${w * 0.8} ${h * 0.3}`,
    `C ${w * 0.9} ${h * 0.45}, ${w * 0.75} ${h * 0.65}, ${w * 0.9} ${h * 0.75}`,
    `C ${w * 1.05} ${h * 0.85}, ${w * 0.95} ${h * 1.05}, ${w + 10} ${h * 1.1}`,
  ].join(" ");

  // Branch lines — short forks from intersection areas
  // Branch from where line 1 & 2 cross (~center)
  const branch1 = [
    `M ${w * 0.48} ${h * 0.3}`,
    `C ${w * 0.55} ${h * 0.15}, ${w * 0.7} ${h * 0.08}, ${w * 0.82} ${h * 0.12}`,
  ].join(" ");

  // Branch from where line 2 & 3 cross (~right side)
  const branch2 = [
    `M ${w * 0.72} ${h * 0.55}`,
    `C ${w * 0.85} ${h * 0.4}, ${w * 0.95} ${h * 0.25}, ${w + 10} ${h * 0.2}`,
  ].join(" ");

  // Branch from where line 1 & 3 cross (~left-center)
  const branch3 = [
    `M ${w * 0.3} ${h * 0.45}`,
    `C ${w * 0.18} ${h * 0.3}, ${w * 0.05} ${h * 0.15}, ${-10} ${h * 0.22}`,
  ].join(" ");

  return { main: [line1, line2, line3], branches: [branch1, branch2, branch3] };
}

export function ScrollLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mainPathsRef = useRef<SVGPathElement[]>([]);
  const mainGlowsRef = useRef<SVGPathElement[]>([]);
  const branchPathsRef = useRef<SVGPathElement[]>([]);
  const branchGlowsRef = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const mPaths = mainPathsRef.current;
    const mGlows = mainGlowsRef.current;
    const bPaths = branchPathsRef.current;
    const bGlows = branchGlowsRef.current;

    if (!mPaths.length || !bPaths.length) return;

    const lengths: number[] = [];
    const branchLengths: number[] = [];

    const build = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const { main, branches } = buildPaths(w, h);

      main.forEach((d, i) => {
        mPaths[i].setAttribute("d", d);
        mGlows[i].setAttribute("d", d);
        lengths[i] = mPaths[i].getTotalLength();
      });

      branches.forEach((d, i) => {
        bPaths[i].setAttribute("d", d);
        bGlows[i].setAttribute("d", d);
        branchLengths[i] = bPaths[i].getTotalLength();
      });
    };

    build();

    // Set initial state — all hidden
    mPaths.forEach((p, i) => {
      gsap.set([p, mGlows[i]], {
        strokeDasharray: lengths[i],
        strokeDashoffset: lengths[i],
      });
    });
    bPaths.forEach((p, i) => {
      gsap.set([p, bGlows[i]], {
        strokeDasharray: branchLengths[i],
        strokeDashoffset: branchLengths[i],
      });
    });

    // Each main line draws at slightly different rates for organic feel
    const lineOffsets = [0, 0.08, 0.15]; // stagger start
    const lineSpeeds = [0.7, 0.8, 0.75]; // how much of scroll to use

    // Branches start drawing after their parent lines cross (~40-60% scroll)
    const branchStart = [0.35, 0.45, 0.4];

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      onUpdate: (self) => {
        const p = self.progress;

        // Draw main lines with staggered timing
        mPaths.forEach((path, i) => {
          const adjusted = Math.max(0, Math.min(1, (p - lineOffsets[i]) / lineSpeeds[i]));
          const offset = lengths[i] * (1 - adjusted);
          path.style.strokeDashoffset = `${offset}`;
          mGlows[i].style.strokeDashoffset = `${offset}`;
        });

        // Draw branches — they emerge once main lines have crossed
        bPaths.forEach((path, i) => {
          const adjusted = Math.max(0, Math.min(1, (p - branchStart[i]) / 0.3));
          const offset = branchLengths[i] * (1 - adjusted);
          path.style.strokeDashoffset = `${offset}`;
          bGlows[i].style.strokeDashoffset = `${offset}`;
        });

        // Subtle rotation — slow, barely noticeable
        const rotation = p * 25 - 12;
        const ty = -p * 80;
        svg.style.transform = `translateY(${ty}px) rotate(${rotation}deg)`;
      },
    });

    const onResize = () => {
      build();
      mPaths.forEach((p, i) => {
        gsap.set([p, mGlows[i]], { strokeDasharray: lengths[i] });
      });
      bPaths.forEach((p, i) => {
        gsap.set([p, bGlows[i]], { strokeDasharray: branchLengths[i] });
      });
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      trigger.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed inset-0 w-full h-full z-[15]"
      fill="none"
      style={{ opacity: 0.8 }}
    >
      {/* Main lines — glow layers */}
      {[0, 1, 2].map((i) => (
        <path
          key={`mg-${i}`}
          ref={(el) => { if (el) mainGlowsRef.current[i] = el; }}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={12}
          strokeLinecap="round"
          style={{ filter: "blur(8px)" }}
        />
      ))}
      {/* Main lines — stroke */}
      {[0, 1, 2].map((i) => (
        <path
          key={`mp-${i}`}
          ref={(el) => { if (el) mainPathsRef.current[i] = el; }}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      ))}
      {/* Branch lines — glow */}
      {[0, 1, 2].map((i) => (
        <path
          key={`bg-${i}`}
          ref={(el) => { if (el) branchGlowsRef.current[i] = el; }}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={8}
          strokeLinecap="round"
          style={{ filter: "blur(5px)" }}
        />
      ))}
      {/* Branch lines — stroke */}
      {[0, 1, 2].map((i) => (
        <path
          key={`bp-${i}`}
          ref={(el) => { if (el) branchPathsRef.current[i] = el; }}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
