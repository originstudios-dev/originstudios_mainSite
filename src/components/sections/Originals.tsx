import { ScrollReveal } from "@/components/ui/ScrollReveal";

const projects = [
  { id: "01", name: "Project Alpha", metric: "AEO Score: 98% | Conversion: +45%" },
  { id: "02", name: "Project Nova", metric: "3D Interactive Launchpad" },
  { id: "03", name: "Project Vertex", metric: "Semantic Data Rebuild" },
];

export function Originals() {
  return (
    <section id="work" className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">05 — The Originals</span>
      </ScrollReveal>
      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">Selected Work.</h2>
      </ScrollReveal>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.1}>
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-white/[0.03] border border-white/[0.06] rounded-sm flex items-center justify-center group-hover:border-white/[0.12] group-hover:scale-[1.02] transition-all duration-300">
                <span className="font-satoshi text-sm text-muted">{project.id}</span>
              </div>
              <div className="mt-4">
                <h3 className="font-satoshi text-base font-semibold text-primary">{project.name}</h3>
                <p className="font-satoshi text-xs text-label mt-1">{project.metric}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
