"use client";

import { useRef, useEffect, useMemo } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";

interface CharRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  scrub?: boolean;
  stagger?: number;
  delay?: number;
}

export function CharReveal({
  text,
  className = "",
  as: Tag = "h2",
  scrub = false,
  stagger = 0.02,
  delay = 0,
}: CharRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split text into words, then each word into char spans wrapped in an
  // inline-flex container so the browser never breaks mid-word
  const words = useMemo(
    () =>
      text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-flex whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="char inline-block"
              style={{ opacity: 0, transform: "translateY(40px)" }}
            >
              {char}
            </span>
          ))}
          {/* Add space after each word except the last */}
          {wi < text.split(" ").length - 1 && (
            <span className="char inline-block" style={{ opacity: 0, transform: "translateY(40px)" }}>
              {"\u00A0"}
            </span>
          )}
        </span>
      )),
    [text]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const charEls = container.querySelectorAll(".char");

    if (scrub) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "top 30%",
          scrub: 0.5,
        },
      });
      tl.to(charEls, { opacity: 1, y: 0, stagger, ease: "none" });
      return () => tl.kill();
    } else {
      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(charEls, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger,
            delay,
            ease: "power3.out",
          });
        },
      });
      return () => trigger.kill();
    }
  }, [scrub, stagger, delay]);

  return (
    <div ref={containerRef}>
      <Tag className={className}>{words}</Tag>
    </div>
  );
}
