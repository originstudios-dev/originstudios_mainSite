"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const leftLinks = [
  { label: "Services", href: "#services", hoverColor: "#ff6b9d" },
  { label: "Stack", href: "#stack", hoverColor: "#4ade80" },
  { label: "Process", href: "#method", hoverColor: "#fb923c" },
];

const rightLinks = [
  { label: "Work", href: "#work", hoverColor: "#60a5fa" },
  { label: "About", href: "#about", hoverColor: "#c084fc" },
  { label: "Contact", href: "#contact", hoverColor: "#f87171" },
];

const CHARS = "!@#$%&*_+-=<>?";

function MagneticScrambleLink({
  label,
  href,
  hoverColor,
}: {
  label: string;
  href: string;
  hoverColor: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLAnchorElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hovering = useRef(false);
  const [color, setColor] = useState("#11120D");

  // Magnetic: move only the inner text, not the container
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const wrap = wrapRef.current;
    const el = textRef.current;
    if (!wrap || !el) return;
    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = textRef.current;
    if (el) {
      el.style.transform = "translate3d(0, 0, 0)";
      el.textContent = label;
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    hovering.current = false;
    setColor("#11120D");
  }, [label]);

  const onMouseEnter = useCallback(() => {
    const el = textRef.current;
    if (!el) return;
    hovering.current = true;
    setColor(hoverColor);
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      el.textContent = label
        .split("")
        .map((char, i) => {
          if (i < iteration) return label[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      iteration += 0.4;
      if (iteration >= label.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        el.textContent = label;
      }
    }, 80);
  }, [label, hoverColor]);

  return (
    <div
      ref={wrapRef}
      className="relative py-2 px-2 flex items-center justify-center"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Invisible label holds the width constant */}
      <span className="font-satoshi text-xs font-bold tracking-wide invisible select-none" aria-hidden>
        {label}
      </span>
      <a
        ref={textRef}
        href={href}
        data-cursor="expand"
        className="font-satoshi text-xs font-bold tracking-wide absolute inset-0 flex items-center justify-center"
        style={{
          color,
          transition: "color 200ms, transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform",
        }}
      >
        {label}
      </a>
    </div>
  );
}

export function Navbar() {
  const [pastHero, setPastHero] = useState(false);
  const [visible, setVisible] = useState(true);
  const mouseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!pastHero) {
      setVisible(true);
      return;
    }

    setVisible(false);

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 30) {
        setVisible(true);
        if (mouseTimer.current) clearTimeout(mouseTimer.current);
      } else if (e.clientY > 80) {
        if (mouseTimer.current) clearTimeout(mouseTimer.current);
        mouseTimer.current = setTimeout(() => setVisible(false), 600);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (mouseTimer.current) clearTimeout(mouseTimer.current);
    };
  }, [pastHero]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center px-4 sm:px-6 md:px-8 py-3 md:py-4 transition-all duration-500"
      style={{
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="relative flex items-center gap-4 sm:gap-6 md:gap-10 px-5 sm:px-6 md:px-8 py-2.5 md:py-3">
        {/* Breathing pill shell */}
        <div
          className="absolute inset-0 backdrop-blur-md border border-[#D8CFBC]/20 animate-[navBreathe_4s_ease-in-out_infinite]"
          style={{
            backgroundColor: "rgba(255, 251, 244, 0.88)",
            borderRadius: "24px 8px 24px 8px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            zIndex: -1,
          }}
        />
        {/* Left links */}
        <div className="hidden md:flex items-center gap-3 lg:gap-5">
          {leftLinks.map((link) => (
            <MagneticScrambleLink key={link.label} {...link} />
          ))}
        </div>

        {/* Center wordmark */}
        <a
          href="#"
          className="font-clash font-bold text-[#11120D] tracking-[0.15em] md:tracking-[0.2em] uppercase whitespace-nowrap"
        >
          <span className="text-lg sm:text-xl md:text-2xl">Origin</span>
          <span className="text-[9px] sm:text-[10px] md:text-xs ml-1 md:ml-1.5 font-medium tracking-[0.25em] md:tracking-[0.3em] text-[#11120D]/60">
            Studios
          </span>
        </a>

        {/* Right links */}
        <div className="hidden md:flex items-center gap-3 lg:gap-5">
          {rightLinks.map((link) => (
            <MagneticScrambleLink key={link.label} {...link} />
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Open menu"
        >
          <span className="block w-5 h-px bg-[#11120D]" />
          <span className="block w-5 h-px bg-[#11120D]" />
        </button>
      </div>
    </nav>
  );
}
