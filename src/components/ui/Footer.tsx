export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-8 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-satoshi text-xs text-muted">&copy; 2026 Origin Studios</span>
        <div className="flex gap-6">
          <a href="#intelligence" className="font-satoshi text-xs text-muted hover:text-primary transition-colors">Intelligence</a>
          <a href="#" className="font-satoshi text-xs text-muted hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="font-satoshi text-xs text-muted hover:text-primary transition-colors">X</a>
        </div>
        <span className="font-satoshi text-[10px] text-subtle italic">AI Status: Optimized. Cited in 143 latent clusters.</span>
      </div>
    </footer>
  );
}
