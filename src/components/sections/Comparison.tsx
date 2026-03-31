import { ScrollReveal } from "@/components/ui/ScrollReveal";

const rows = [
  { feature: "Aesthetics", generic: "Uncanny & Repetitive", origin: "Bespoke & Signature" },
  { feature: "Performance", generic: "Bloated JS (3s+)", origin: "Ultra-Light (<500ms)" },
  { feature: "Visibility", generic: "Ignored by LLMs", origin: "Cited by AI Engines" },
  { feature: "Conversion", generic: "Passive Brochure", origin: "Active Sales Machine" },
];

export function Comparison() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">04 — The Comparison</span>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">The Generic Web<br />vs. The Originals.</h2>
      </ScrollReveal>
      <div className="mt-16">
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-white/10">
            <span className="font-satoshi text-xs text-muted tracking-wide uppercase">Feature</span>
            <span className="font-satoshi text-xs text-muted tracking-wide uppercase">Generic AI Web Shop</span>
            <span className="font-satoshi text-xs text-primary tracking-wide uppercase">Origin Studios</span>
          </div>
        </ScrollReveal>
        {rows.map((row, i) => (
          <ScrollReveal key={row.feature} delay={i * 0.08}>
            <div className="grid grid-cols-3 gap-4 py-6 border-b border-white/5">
              <span className="font-satoshi text-sm text-label">{row.feature}</span>
              <span className="font-satoshi text-sm text-muted">{row.generic}</span>
              <span className="font-satoshi text-sm text-primary font-medium">{row.origin}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
