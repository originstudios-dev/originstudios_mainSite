"use client";

import React, { useRef, useEffect, useCallback } from "react";

export function WavePath({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef(0);
  const xRef = useRef(0.5);
  const timeRef = useRef(Math.PI / 2);
  const reqIdRef = useRef<number | null>(null);

  const setPath = useCallback((progress: number) => {
    const width = typeof window !== "undefined" ? window.innerWidth * 0.7 : 1000;
    if (pathRef.current) {
      pathRef.current.setAttributeNS(
        null,
        "d",
        `M0 100 Q${width * xRef.current} ${100 + progress * 0.6}, ${width} 100`
      );
    }
  }, []);

  useEffect(() => {
    setPath(0);
  }, [setPath]);

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const animateOut = useCallback(() => {
    const newProgress = progressRef.current * Math.sin(timeRef.current);
    progressRef.current = lerp(progressRef.current, 0, 0.025);
    timeRef.current += 0.2;
    setPath(newProgress);
    if (Math.abs(progressRef.current) > 0.75) {
      reqIdRef.current = requestAnimationFrame(animateOut);
    } else {
      timeRef.current = Math.PI / 2;
      progressRef.current = 0;
    }
  }, [setPath]);

  const handleMouseEnter = useCallback(() => {
    if (reqIdRef.current) {
      cancelAnimationFrame(reqIdRef.current);
      timeRef.current = Math.PI / 2;
      progressRef.current = 0;
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const { movementY, clientX } = e;
      if (pathRef.current) {
        const pathBound = pathRef.current.getBoundingClientRect();
        xRef.current = (clientX - pathBound.left) / pathBound.width;
        progressRef.current += movementY;
        setPath(progressRef.current);
      }
    },
    [setPath]
  );

  const handleMouseLeave = useCallback(() => {
    animateOut();
  }, [animateOut]);

  return (
    <div className={`relative h-px w-full max-w-7xl mx-auto ${className}`}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
      />
      <svg className="absolute -top-[100px] h-[300px] w-full">
        <path
          ref={pathRef}
          className="fill-none stroke-white/[0.08]"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}
