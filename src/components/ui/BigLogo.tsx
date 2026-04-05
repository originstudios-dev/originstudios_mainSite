"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";

export function BigLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLSpanElement>(null);
  const studiosRef = useRef<HTMLSpanElement>(null);
  const [originHovered, setOriginHovered] = useState(false);
  const [studiosHovered, setStudiosHovered] = useState(false);

  const onOriginEnter = useCallback(() => {
    setOriginHovered(true);
    if (originRef.current) {
      gsap.to(originRef.current, {
        y: -10,
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(2)",
      });
    }
  }, []);

  const onOriginLeave = useCallback(() => {
    setOriginHovered(false);
    if (originRef.current) {
      gsap.to(originRef.current, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, []);

  const onStudiosEnter = useCallback(() => {
    setStudiosHovered(true);
    if (studiosRef.current) {
      gsap.to(studiosRef.current, {
        y: -10,
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(2)",
      });
    }
  }, []);

  const onStudiosLeave = useCallback(() => {
    setStudiosHovered(false);
    if (studiosRef.current) {
      gsap.to(studiosRef.current, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll("[data-word]");
    gsap.fromTo(
      words,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative py-20 md:py-28 px-4 border-t border-[#D8CFBC]/[0.03]"
    >
      <div className="flex justify-center items-center gap-[2vw] md:gap-[1.5vw]">
        <span
          ref={originRef}
          data-word
          data-cursor="expand"
          onMouseEnter={onOriginEnter}
          onMouseLeave={onOriginLeave}
          className="font-clash font-bold uppercase tracking-tight leading-none text-[10vw] sm:text-[9vw] md:text-[8vw] inline-block select-none will-change-transform cursor-none"
          style={{
            color: originHovered ? "#D8CFBC" : "transparent",
            WebkitTextStroke: originHovered ? "0px" : "1.5px rgba(216,207,188,0.2)",
            textShadow: originHovered
              ? "0 0 40px rgba(216,207,188,0.35), 0 5px 25px rgba(216,207,188,0.1)"
              : "none",
            transition: "color 0.3s, -webkit-text-stroke 0.3s, text-shadow 0.3s",
          }}
        >
          ORIGIN
        </span>
        <span
          ref={studiosRef}
          data-word
          data-cursor="expand"
          onMouseEnter={onStudiosEnter}
          onMouseLeave={onStudiosLeave}
          className="font-clash font-bold uppercase tracking-tight leading-none text-[10vw] sm:text-[9vw] md:text-[8vw] inline-block select-none will-change-transform cursor-none"
          style={{
            color: studiosHovered ? "#D8CFBC" : "transparent",
            WebkitTextStroke: studiosHovered ? "0px" : "1.5px rgba(216,207,188,0.2)",
            textShadow: studiosHovered
              ? "0 0 40px rgba(216,207,188,0.35), 0 5px 25px rgba(216,207,188,0.1)"
              : "none",
            transition: "color 0.3s, -webkit-text-stroke 0.3s, text-shadow 0.3s",
          }}
        >
          STUDIOS
        </span>
      </div>
    </div>
  );
}
