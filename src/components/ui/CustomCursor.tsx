"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const expanded = useRef(false);
  const mx = useRef(-100);
  const my = useRef(-100);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
    };

    const onOver = (e: Event) => {
      if (e.target instanceof Element && e.target.closest("[data-cursor='expand']")) {
        expanded.current = true;
        dot.style.width = "60px";
        dot.style.height = "60px";
        dot.style.opacity = "0.15";
        dot.style.mixBlendMode = "difference";
      }
    };

    const onOut = (e: Event) => {
      if (e.target instanceof Element && e.target.closest("[data-cursor='expand']")) {
        expanded.current = false;
        dot.style.width = "10px";
        dot.style.height = "10px";
        dot.style.opacity = "0.9";
        dot.style.mixBlendMode = "normal";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);

    let raf: number;
    const tick = () => {
      dot.style.transform = `translate3d(${mx.current - 5}px, ${my.current - 5}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
      style={{
        width: 10,
        height: 10,
        backgroundColor: "#FFFBF4",
        opacity: 0.9,
        willChange: "transform",
        transition: "width 200ms, height 200ms, opacity 200ms, mix-blend-mode 200ms",
      }}
    />
  );
}
