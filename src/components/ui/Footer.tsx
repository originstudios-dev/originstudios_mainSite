export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-8 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        {/* Top: tagline */}
        <p className="font-satoshi text-xs text-label tracking-wide">
          Origin Studios — AI-Visible. Conversion-Engineered. Performance-First.
        </p>

        {/* Middle: nav + contact */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#work" className="font-satoshi text-xs text-muted hover:text-primary transition-colors">Work</a>
            <a href="#services" className="font-satoshi text-xs text-muted hover:text-primary transition-colors">Services</a>
            <a href="#method" className="font-satoshi text-xs text-muted hover:text-primary transition-colors">Process</a>
            <a href="#about" className="font-satoshi text-xs text-muted hover:text-primary transition-colors">About</a>
            <a href="#contact" className="font-satoshi text-xs text-muted hover:text-primary transition-colors">Contact</a>
          </nav>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a href="mailto:hello@originstudios.dev" className="font-satoshi text-xs text-muted hover:text-primary transition-colors">
              hello@originstudios.dev
            </a>
          </div>
        </div>

        {/* Bottom: legal + easter egg */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-6 border-t border-white/5">
          <span className="font-satoshi text-[10px] text-subtle">
            &copy; 2026 Origin Studios. All rights reserved.
          </span>
          <span
            className="font-satoshi text-[10px] text-subtle italic"
            style={{ animation: "breathe 4s ease-in-out infinite" }}
          >
            AI-Visible · GEO-Optimised · Cited in 143 latent clusters
          </span>
        </div>
      </div>
    </footer>
  );
}
