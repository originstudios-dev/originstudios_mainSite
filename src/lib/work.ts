export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  description: string;
  date: string;
  category: string;
  services: string[];
  stack: string[];
  timeline: string;
  results: { label: string; value: string }[];
  content: string; // HTML content
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "origin-studios-website",
    title: "Building Our Own GEO-Optimised Web Presence from Scratch",
    client: "Origin Studios",
    description:
      "How we applied our own methodology to build originstudios.dev — a Next.js site with Three.js 3D, GSAP motion design, full JSON-LD schema, and AI search visibility scoring 74+ on GEO readiness.",
    date: "2026-04-08",
    category: "Brand Experience",
    services: [
      "Custom Website Development",
      "Motion Design",
      "3D Web Development",
      "Generative Engine Optimization",
      "Structured Data Implementation",
    ],
    stack: ["Next.js 16", "Three.js", "GSAP", "Tailwind CSS", "Vercel Edge", "JSON-LD"],
    timeline: "8 weeks",
    results: [
      { label: "Lighthouse Score", value: "95+" },
      { label: "GEO Readiness", value: "74/100" },
      { label: "Schema Entities", value: "5 types" },
      { label: "AI Crawler Access", value: "8 bots allowed" },
      { label: "Build Time", value: "8 weeks" },
      { label: "Templates Used", value: "0" },
    ],
    content: `
<h2>The Challenge</h2>

<p>We needed a website that practised what we preach. Every agency claims to build great websites — but how many agencies have sites that AI search engines actually cite? We set out to build originstudios.dev as a proof of concept for our entire methodology: strategy-first design, motion and 3D as standard, and full Generative Engine Optimization from the ground up.</p>

<h2>The Approach</h2>

<p>We followed our own five-sprint, eight-week process:</p>

<p><strong>Sprint 1 — Understand (Weeks 1-2):</strong> We audited 15+ competitor studios, mapped the GEO keyword landscape, and identified that "Generative Engine Optimization" and "AI-optimised website development" were high-intent queries with almost no structured data competition. Most studio sites had zero JSON-LD beyond basic Organization schema.</p>

<p><strong>Sprint 2 — Prototype (Weeks 3-4):</strong> High-fidelity Figma prototypes with real copy. We designed for two audiences simultaneously: human visitors who respond to motion and visual impact, and AI crawlers who need semantic structure and machine-readable data. Every section was planned with both a visual hook and an extractable content unit.</p>

<p><strong>Sprint 3 — Engineer (Weeks 5-6):</strong> Built in Next.js 16 with App Router. The Three.js galaxy scene loads dynamically with SSR disabled for the WebGL component only — all text content is server-rendered and visible to crawlers. We implemented five JSON-LD schema types (ProfessionalService, WebSite, WebPage, FAQPage, and a Service ItemList) with full @id cross-referencing.</p>

<p><strong>Sprint 4 — Optimise (Week 7):</strong> Performance tuning hit a 95+ Lighthouse score. We created llms.txt for AI crawler discoverability, configured robots.txt to explicitly allow 8 AI crawlers, and built a dynamic sitemap that auto-updates on each deployment. The GEO audit scored the site at 74/100 — strong for a brand-new domain with no backlinks.</p>

<p><strong>Sprint 5 — Ship (Week 8):</strong> DNS cutover to Vercel Edge, monitoring setup, and launch. The site went live with every marketing integration pre-wired: GA4, GTM, and structured data that AI engines could parse from day one.</p>

<h2>Technical Highlights</h2>

<p><strong>SSR + CSR hybrid:</strong> The main page uses CSS visibility control instead of React conditional rendering. Content is always in the DOM for crawlers, but hidden until the loader animation completes. Three.js and WebGL components use <code>dynamic(() => import(...), { ssr: false })</code> to avoid server-side rendering of GPU-dependent code.</p>

<p><strong>Five-layer JSON-LD graph:</strong> ProfessionalService (with ImageObject logo, INR pricing, founder entity, sameAs), WebSite, WebPage (with datePublished/dateModified), FAQPage (4 Q&A pairs optimised for AI citation), and an ItemList of 5 Service entities. All cross-referenced via @id anchors.</p>

<p><strong>Motion design:</strong> GSAP ScrollTrigger animations, character-level text reveals, horizontal scroll sections, velocity marquees, and a cursor reveal interaction — all built with progressive enhancement so the site works fully without JavaScript animations.</p>

<h2>Results</h2>

<p>The site launched with a 95+ Lighthouse performance score, 74/100 GEO readiness score, and full AI crawler accessibility. Five JSON-LD schema types provide machine-readable entity data. The llms.txt file gives AI crawlers a structured summary without requiring HTML parsing. Eight AI crawlers are explicitly allowed in robots.txt.</p>

<p>This project is our living proof of concept — and the foundation we build on for every client engagement.</p>
`,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAllWorkSlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}
