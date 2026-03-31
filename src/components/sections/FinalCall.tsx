import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FinalCall() {
  return (
    <section id="contact" className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">07 — The Final Call</span>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">Ready to Become<br />the Source?</h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15} className="mt-4">
        <p className="font-satoshi text-base text-body">We only accept 2 bespoke builds per month to maintain our standard of precision.</p>
      </ScrollReveal>
      <ScrollReveal delay={0.2} className="mt-12 max-w-lg">
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="font-satoshi text-xs text-label tracking-wide uppercase block mb-2">Name / Company</label>
            <input type="text" className="w-full bg-transparent border-b border-white/10 pb-3 font-satoshi text-sm text-primary focus:outline-none focus:border-white/30 transition-colors placeholder:text-muted" placeholder="Your name or company" />
          </div>
          <div>
            <label className="font-satoshi text-xs text-label tracking-wide uppercase block mb-2">Current Annual Revenue</label>
            <input type="text" className="w-full bg-transparent border-b border-white/10 pb-3 font-satoshi text-sm text-primary focus:outline-none focus:border-white/30 transition-colors placeholder:text-muted" placeholder="$1M - $10M" />
          </div>
          <div>
            <label className="font-satoshi text-xs text-label tracking-wide uppercase block mb-2">The One Metric You Need to Change</label>
            <input type="text" className="w-full bg-transparent border-b border-white/10 pb-3 font-satoshi text-sm text-primary focus:outline-none focus:border-white/30 transition-colors placeholder:text-muted" placeholder="e.g., organic visibility, conversion rate, page speed" />
          </div>
          <button type="submit" className="mt-4 self-start font-satoshi text-sm font-medium bg-primary text-bg px-8 py-3.5 hover:bg-white/90 transition-colors">Request a Visibility Audit</button>
        </form>
      </ScrollReveal>
    </section>
  );
}
