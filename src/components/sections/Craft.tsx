import { ScrollReveal } from "@/components/ui/ScrollReveal";

const capabilities = [
  { num: "01", title: "Immersive 3D Environments", description: "We utilize WebGL and Three.js to create interactive 3D spaces that command 4x more engagement than static templates." },
  { num: "02", title: "Motion as Narrative", description: "Custom 2D/3D motion design that guides the user's eye toward the conversion goal. No 'uncanny' AI-generated video—just pure, intentional craft." },
  { num: "03", title: "Sub-500ms Engineering", description: "Speed is the ultimate UX. Our sites are built on clean, modern stacks for near-instant load times across all devices." },
];

export function Craft() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">03 — The Craft</span>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">Beyond the Prompt.</h2>
      </ScrollReveal>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {capabilities.map((cap, i) => (
          <ScrollReveal key={cap.num} delay={i * 0.1}>
            <div className="group p-8 border border-white/[0.06] rounded-sm hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-300">
              <span className="font-satoshi text-xs text-label tracking-widest">{cap.num}</span>
              <h3 className="font-satoshi text-lg font-semibold text-primary mt-4">{cap.title}</h3>
              <p className="font-satoshi text-sm text-body mt-3 leading-relaxed">{cap.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
