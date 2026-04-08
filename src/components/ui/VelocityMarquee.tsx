"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/registry";

interface VelocityMarqueeProps {
  text: string;
  baseVelocity?: number;
  className?: string;
}

export function VelocityMarquee({
  text,
  baseVelocity = 40,
  className = "",
}: VelocityMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const dirRef = useRef(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let prevScroll = window.scrollY;

    const ticker = () => {
      const curr = window.scrollY;
      const vel = curr - prevScroll;
      prevScroll = curr;

      const factor = 1 + Math.min(Math.abs(vel) * 0.05, 5);
      if (vel < 0) dirRef.current = -1;
      if (vel > 0) dirRef.current = 1;

      xRef.current -= dirRef.current * baseVelocity * factor * 0.016;

      const trackWidth = track.scrollWidth / 2;
      if (Math.abs(xRef.current) >= trackWidth) xRef.current = 0;

      gsap.set(track, { x: xRef.current });
    };

    gsap.ticker.add(ticker);
    return () => gsap.ticker.remove(ticker);
  }, [baseVelocity]);

  return (
    <div className="overflow-hidden whitespace-nowrap py-6 md:py-8">
      <div ref={trackRef} className={`inline-flex will-change-transform ${className}`}>
        {[...Array(6)].map((_, i) => (
          <span key={i} className="mx-6 md:mx-10 shrink-0">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
