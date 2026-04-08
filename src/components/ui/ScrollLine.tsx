"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";

const MAIN_COUNT = 5;
const BRANCH_COUNT = 5;

function buildPaths(w: number, h: number) {
  const main = [
    // Line 1: enters top-left, sweeps right then curls back
    [
      `M -10 ${h * 0.1}`,
      `C ${w * 0.15} ${h * -0.05}, ${w * 0.35} ${h * 0.3}, ${w * 0.5} ${h * 0.25}`,
      `C ${w * 0.65} ${h * 0.2}, ${w * 0.8} ${h * 0.45}, ${w * 0.6} ${h * 0.55}`,
      `C ${w * 0.4} ${h * 0.65}, ${w * 0.15} ${h * 0.5}, ${w * 0.25} ${h * 0.8}`,
      `C ${w * 0.35} ${h * 1.1}, ${w * 0.6} ${h * 0.95}, ${w + 10} ${h * 0.85}`,
    ].join(" "),
    // Line 2: enters mid-left, cuts diagonally
    [
      `M -10 ${h * 0.55}`,
      `C ${w * 0.1} ${h * 0.4}, ${w * 0.3} ${h * 0.2}, ${w * 0.45} ${h * 0.35}`,
      `C ${w * 0.6} ${h * 0.5}, ${w * 0.5} ${h * 0.7}, ${w * 0.65} ${h * 0.6}`,
      `C ${w * 0.8} ${h * 0.5}, ${w * 0.95} ${h * 0.7}, ${w * 0.85} ${h * 0.9}`,
      `C ${w * 0.75} ${h * 1.1}, ${w * 0.55} ${h * 1.15}, ${w * 0.4} ${h * 1.05}`,
    ].join(" "),
    // Line 3: enters bottom-left, arcs high
    [
      `M -10 ${h * 0.9}`,
      `C ${w * 0.08} ${h * 0.75}, ${w * 0.2} ${h * 0.45}, ${w * 0.35} ${h * 0.4}`,
      `C ${w * 0.5} ${h * 0.35}, ${w * 0.7} ${h * 0.15}, ${w * 0.8} ${h * 0.3}`,
      `C ${w * 0.9} ${h * 0.45}, ${w * 0.75} ${h * 0.65}, ${w * 0.9} ${h * 0.75}`,
      `C ${w * 1.05} ${h * 0.85}, ${w * 0.95} ${h * 1.05}, ${w + 10} ${h * 1.1}`,
    ].join(" "),
    // Line 4: enters top-right, sweeps down-left in a long arc
    [
      `M ${w + 10} ${h * 0.05}`,
      `C ${w * 0.85} ${h * 0.15}, ${w * 0.7} ${h * 0.35}, ${w * 0.55} ${h * 0.45}`,
      `C ${w * 0.4} ${h * 0.55}, ${w * 0.2} ${h * 0.65}, ${w * 0.3} ${h * 0.85}`,
      `C ${w * 0.4} ${h * 1.05}, ${w * 0.15} ${h * 1.1}, ${-10} ${h * 0.95}`,
    ].join(" "),
    // Line 5: enters mid-right, tight S-curve down
    [
      `M ${w + 10} ${h * 0.4}`,
      `C ${w * 0.9} ${h * 0.3}, ${w * 0.75} ${h * 0.5}, ${w * 0.6} ${h * 0.45}`,
      `C ${w * 0.45} ${h * 0.4}, ${w * 0.35} ${h * 0.6}, ${w * 0.5} ${h * 0.72}`,
      `C ${w * 0.65} ${h * 0.84}, ${w * 0.4} ${h * 0.95}, ${w * 0.2} ${h * 1.1}`,
    ].join(" "),
  ];

  const branches = [
    // Branch from line 1 & 2 crossing (~center)
    [
      `M ${w * 0.48} ${h * 0.3}`,
      `C ${w * 0.55} ${h * 0.15}, ${w * 0.7} ${h * 0.08}, ${w * 0.82} ${h * 0.12}`,
    ].join(" "),
    // Branch from line 2 & 3 crossing (~right)
    [
      `M ${w * 0.72} ${h * 0.55}`,
      `C ${w * 0.85} ${h * 0.4}, ${w * 0.95} ${h * 0.25}, ${w + 10} ${h * 0.2}`,
    ].join(" "),
    // Branch from line 1 & 3 crossing (~left)
    [
      `M ${w * 0.3} ${h * 0.45}`,
      `C ${w * 0.18} ${h * 0.3}, ${w * 0.05} ${h * 0.15}, ${-10} ${h * 0.22}`,
    ].join(" "),
    // Branch from line 4 & 1 crossing (~upper mid)
    [
      `M ${w * 0.55} ${h * 0.45}`,
      `C ${w * 0.48} ${h * 0.3}, ${w * 0.38} ${h * 0.12}, ${w * 0.25} ${h * 0.05}`,
    ].join(" "),
    // Branch from line 5 & 2 crossing (~lower right)
    [
      `M ${w * 0.6} ${h * 0.45}`,
      `C ${w * 0.72} ${h * 0.58}, ${w * 0.88} ${h * 0.65}, ${w + 10} ${h * 0.6}`,
    ].join(" "),
  ];

  return { main, branches };
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

    // Disable on mobile for performance
    if (window.innerWidth < 768) {
      svg.style.display = "none";
      return;
    }

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

    const lineOffsets = [0, 0.06, 0.12, 0.04, 0.1];
    const lineSpeeds = [0.7, 0.8, 0.75, 0.65, 0.72];
    const branchStart = [0.35, 0.45, 0.4, 0.3, 0.5];

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      onUpdate: (self) => {
        const p = self.progress;

        mPaths.forEach((path, i) => {
          const adjusted = Math.max(0, Math.min(1, (p - lineOffsets[i]) / lineSpeeds[i]));
          const offset = lengths[i] * (1 - adjusted);
          path.style.strokeDashoffset = `${offset}`;
          mGlows[i].style.strokeDashoffset = `${offset}`;
        });

        bPaths.forEach((path, i) => {
          const adjusted = Math.max(0, Math.min(1, (p - branchStart[i]) / 0.3));
          const offset = branchLengths[i] * (1 - adjusted);
          path.style.strokeDashoffset = `${offset}`;
          bGlows[i].style.strokeDashoffset = `${offset}`;
        });

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

  const mainIndices = Array.from({ length: MAIN_COUNT }, (_, i) => i);
  const branchIndices = Array.from({ length: BRANCH_COUNT }, (_, i) => i);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed inset-0 w-full h-full z-[15]"
      fill="none"
      style={{ opacity: 0.8 }}
    >
      {/* Main lines — glow */}
      {mainIndices.map((i) => (
        <path
          key={`mg-${i}`}
          ref={(el) => { if (el) mainGlowsRef.current[i] = el; }}
          stroke="rgba(216,207,188,0.06)"
          strokeWidth={12}
          strokeLinecap="round"
          style={{ filter: "blur(8px)" }}
        />
      ))}
      {/* Main lines — stroke */}
      {mainIndices.map((i) => (
        <path
          key={`mp-${i}`}
          ref={(el) => { if (el) mainPathsRef.current[i] = el; }}
          stroke="rgba(216,207,188,0.15)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      ))}
      {/* Branch lines — glow */}
      {branchIndices.map((i) => (
        <path
          key={`bg-${i}`}
          ref={(el) => { if (el) branchGlowsRef.current[i] = el; }}
          stroke="rgba(216,207,188,0.04)"
          strokeWidth={8}
          strokeLinecap="round"
          style={{ filter: "blur(5px)" }}
        />
      ))}
      {/* Branch lines — stroke */}
      {branchIndices.map((i) => (
        <path
          key={`bp-${i}`}
          ref={(el) => { if (el) branchPathsRef.current[i] = el; }}
          stroke="rgba(216,207,188,0.1)"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
