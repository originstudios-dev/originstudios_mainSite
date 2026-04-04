const edges = [
  {
    num: "01",
    title: "Strategy Before Pixels",
    body: "We don't open Figma until we've audited 15+ competitors, mapped your customer journey, and built a positioning architecture. The output isn't a mood board — it's a validated strategic direction.",
  },
  {
    num: "02",
    title: "Motion & 3D as Standard",
    body: "Lottie animations. Three.js 3D environments. Micro-interaction systems. All performance-optimised, all in-house, all included — not charged as an expensive add-on.",
  },
  {
    num: "03",
    title: "Marketing Wired In",
    body: "Google Ads infrastructure. Meta Pixel + CAPI. Email automation. CRM integration. Your marketing stack is built into the site during construction — not bolted on after launch.",
  },
];

export function Craft() {
  return (
    <section className="py-32 md:py-40 pb-48 md:pb-56 px-8 md:px-16 max-w-7xl mx-auto">
      {/* Label */}
      <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
        The Origin Difference
      </span>

      {/* Headline */}
      <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight mt-6">
        What Standard Studios Can&rsquo;t Offer.
      </h2>

      {/* Edge cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {edges.map((edge) => (
          <div
            key={edge.num}
            data-cursor="expand"
            className="group p-8 border border-white/[0.06] rounded-sm hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300 cursor-none"
          >
            {/* Number */}
            <span className="font-satoshi text-xs text-label tracking-widest">
              {edge.num}
            </span>

            {/* Separator line under number */}
            <div className="mt-4 h-px w-full bg-white/[0.06] group-hover:bg-white/[0.10] transition-colors duration-300" />

            {/* Title */}
            <h3 className="font-satoshi text-lg font-semibold text-primary mt-5">
              {edge.title}
            </h3>

            {/* Body */}
            <p className="font-satoshi text-sm text-body mt-3 leading-relaxed">
              {edge.body}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom separator line */}
      <div className="mt-16 flex items-center gap-6">
        <div className="flex-1 h-px bg-white/[0.06]" />
        <p className="font-satoshi text-xs text-label tracking-widest uppercase shrink-0">
          Three things. All in-house. All standard. None of them available from your current agency.
        </p>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>
    </section>
  );
}
