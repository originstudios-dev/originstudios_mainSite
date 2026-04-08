"use client";

const footerLinks = [
  { label: "Services", target: "services" },
  { label: "Process", target: "method" },
  { label: "Contact", target: "contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#D8CFBC]/5 py-12 px-8 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        {/* Top: tagline */}
        <p className="font-satoshi text-sm text-[#FFFBF4]/60 tracking-wide">
          Origin Studios / AI-Visible. Conversion-Engineered. Performance-First.
        </p>

        {/* Middle: nav + contact */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => document.getElementById(link.target)?.scrollIntoView({ behavior: "smooth" })}
                className="font-satoshi text-sm text-[#FFFBF4]/40 hover:text-primary transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </button>
            ))}
            <a
              href="/work"
              className="font-satoshi text-sm text-[#FFFBF4]/40 hover:text-primary transition-colors min-h-[44px] flex items-center"
            >
              Work
            </a>
            <a
              href="/blog"
              className="font-satoshi text-sm text-[#FFFBF4]/40 hover:text-primary transition-colors min-h-[44px] flex items-center"
            >
              Blog
            </a>
          </nav>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="mailto:talk@originstudios.dev" className="font-satoshi text-sm text-[#FFFBF4]/40 hover:text-primary transition-colors">
              talk@originstudios.dev
            </a>
          </div>
        </div>

        {/* Bottom: legal + easter egg */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-6 border-t border-[#D8CFBC]/5">
          <div className="flex items-center gap-4">
            <span className="font-satoshi text-xs text-[#FFFBF4]/30">
              &copy; 2026 Origin Studios. All rights reserved.
            </span>
            <a href="/privacy" className="font-satoshi text-xs text-[#FFFBF4]/30 hover:text-[#FFFBF4]/60 transition-colors min-h-[44px] flex items-center">
              Privacy
            </a>
            <a href="/terms" className="font-satoshi text-xs text-[#FFFBF4]/30 hover:text-[#FFFBF4]/60 transition-colors min-h-[44px] flex items-center">
              Terms
            </a>
          </div>
          <span
            className="font-satoshi text-xs text-[#FFFBF4]/30 italic"
            style={{ animation: "breathe 4s ease-in-out infinite" }}
          >
            AI-Visible · GEO-Optimised · Built to Be Cited
          </span>
        </div>
      </div>
    </footer>
  );
}
