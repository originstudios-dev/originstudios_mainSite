"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";

interface WordRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
  delay?: number;
}

export function WordReveal({
  text,
  className = "",
  as: Tag = "h2",
  stagger = 0.05,
  delay = 0,
}: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll(".word-inner");
    gsap.set(words, { yPercent: 110 });

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(words, {
          yPercent: 0,
          duration: 0.8,
          stagger,
          delay,
          ease: "power4.out",
        });
      },
    });
    return () => trigger.kill();
  }, [stagger, delay]);

  return (
    <div ref={ref}>
      <Tag className={className}>
        {text.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <span className="word-inner inline-block">{word}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
