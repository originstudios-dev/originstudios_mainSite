"use client";

import { useEffect, useState } from "react";

const leftLinks = [
  { label: "Work", href: "#work" },
  { label: "Method", href: "#method" },
  { label: "Intelligence", href: "#intelligence" },
];

const rightLinks = [
  { label: "About", href: "#about" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Contact", href: "#contact", highlight: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-12 max-w-7xl w-full justify-center">
        {/* Left links */}
        <div className="hidden md:flex items-center gap-8">
          {leftLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-satoshi text-xs text-label hover:text-primary transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Center wordmark */}
        <a
          href="#"
          className="font-clash text-sm font-bold text-primary tracking-[0.2em] uppercase whitespace-nowrap"
        >
          Origin Studios
        </a>

        {/* Right links */}
        <div className="hidden md:flex items-center gap-8">
          {rightLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-satoshi text-xs tracking-wide transition-colors duration-300 ${
                link.highlight
                  ? "text-primary hover:text-white/80"
                  : "text-label hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1.5"
          aria-label="Open menu"
        >
          <span className="block w-5 h-px bg-primary" />
          <span className="block w-5 h-px bg-primary" />
        </button>
      </div>
    </nav>
  );
}
