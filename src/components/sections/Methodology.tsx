import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  { num: "01", title: "Extract", description: "We define your brand's \"Original\" value proposition." },
  { num: "02", title: "Architect", description: "We build the 3D assets and high-performance structural code." },
  { num: "03", title: "Synthesize", description: "We layer in the semantic schema for AI retrieval and citation." },
  { num: "04", title: "Optimize", description: "We run rigorous conversion stress tests before the \"Source\" goes live." },
];

export function Methodology() {
  return (
    <section id="method" className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">06 — The Methodology</span>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">The Process.</h2>
      </ScrollReveal>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 0.1}>
            <div className="relative">
              <span className="font-satoshi text-3xl font-light text-primary">{step.num}</span>
              <h3 className="font-satoshi text-base font-semibold text-primary mt-3">{step.title}</h3>
              <p className="font-satoshi text-sm text-body mt-2 leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-4 -right-4 w-8 h-px bg-white/10" />
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
