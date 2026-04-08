export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601
  updated?: string;
  author: string;
  readingTime: string;
  tags: string[];
  content: string; // HTML content
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-generative-engine-optimization",
    title: "What Is Generative Engine Optimization (GEO) and Why Your Website Needs It in 2026",
    description:
      "GEO is the practice of optimising your website to be cited by AI search engines like ChatGPT, Perplexity, and Google AI Overviews. Learn how it works, why it matters, and what to implement first.",
    date: "2026-04-08",
    author: "Piyush",
    readingTime: "8 min read",
    tags: ["GEO", "AEO", "AI Search", "Structured Data", "JSON-LD"],
    content: `
<p>Search is changing. Not gradually — rapidly. Google AI Overviews now appear in over 40% of search queries, and platforms like ChatGPT, Perplexity, and Claude are becoming primary research tools for millions of users. The question is no longer just "does my site rank?" but "does my site get cited when AI answers a question?"</p>

<p>That shift is what Generative Engine Optimization (GEO) addresses.</p>

<h2>What is GEO?</h2>

<p>Generative Engine Optimization is the practice of structuring your website, content, and data so that AI-powered search engines can understand, trust, and cite your site as a source. Where traditional SEO focuses on ranking in a list of ten blue links, GEO focuses on being the information that AI systems reference in their generated responses.</p>

<p>When someone asks ChatGPT "what web studio specialises in AI search visibility?" or Perplexity "who builds GEO-optimised websites?", the answer is assembled from indexed content across the web. GEO determines whether your site is part of that answer.</p>

<h2>How is GEO different from SEO?</h2>

<p>Traditional SEO and GEO share some foundations — both require good technical infrastructure, fast page loads, and relevant content. But they diverge in three key areas:</p>

<p><strong>1. Structured data matters more than keyword density.</strong> AI engines parse JSON-LD structured data to understand entities, relationships, and facts. A site with comprehensive <code>ProfessionalService</code>, <code>FAQPage</code>, and <code>Service</code> schema gives AI systems machine-readable facts to cite. A site with great copy but no structured data forces AI to infer meaning — and inference is lossy.</p>

<p><strong>2. Citability replaces clickability.</strong> In traditional SEO, you optimise for clicks. In GEO, you optimise for citations. AI systems select passages that are self-contained, factually grounded, and attributable. A well-structured FAQ answer of 40-60 words is more likely to be cited verbatim than a 2,000-word blog post with no clear extractable passages.</p>

<p><strong>3. Entity resolution determines trust.</strong> AI systems verify entities against knowledge graphs. If your business has a <code>sameAs</code> linking to LinkedIn, Crunchbase, or GitHub, AI engines can confirm you exist as a real entity. An empty <code>sameAs</code> array or a founder listed only as a first name with no external profile makes entity resolution fail — and unresolvable entities don't get cited.</p>

<h2>What does a GEO implementation include?</h2>

<p>A proper GEO implementation covers five layers:</p>

<p><strong>JSON-LD Structured Data</strong> — This is the foundation. Every page needs machine-readable entity data: <code>Organization</code>, <code>WebSite</code>, <code>WebPage</code>, <code>FAQPage</code>, <code>Service</code>, and <code>Article</code> schemas with <code>@id</code> cross-references that create a connected entity graph. The structured data should include pricing, service descriptions, founder information, and <code>sameAs</code> links to external profiles.</p>

<p><strong>llms.txt</strong> — This emerging standard provides AI crawlers with a plain-text summary of your site's purpose, services, and key information. Think of it as a README for AI systems. It sits at <code>/llms.txt</code> and is read by LLM crawlers before they attempt to parse your HTML.</p>

<p><strong>Content architecture for extraction</strong> — AI systems extract passages anchored to headings. Question-format H2 headings (e.g., "What does Origin Studios build?") create passage-level anchors that map directly to user queries. Each answer should be 40-60 words — long enough to be substantive, short enough to be cited in full.</p>

<p><strong>AI crawler access</strong> — Your <code>robots.txt</code> must explicitly allow GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, and Google-Extended. Blocking any of these crawlers means your content cannot be indexed by that platform's AI search.</p>

<p><strong>Server-side rendering</strong> — This is the hidden blocker. GPTBot, ClaudeBot, and PerplexityBot do not execute JavaScript. If your content is behind a React conditional render or requires client-side hydration to appear in the DOM, these crawlers see an empty page. Your content must be in the server-rendered HTML.</p>

<h2>What is AEO and how does it relate to GEO?</h2>

<p>Answer Engine Optimization (AEO) is a subset of GEO focused specifically on structuring content so AI engines can extract clear, direct answers. AEO typically involves:</p>

<ul>
<li>FAQPage schema with concise, self-contained answers</li>
<li>Question-format headings that mirror natural language queries</li>
<li>Fact-dense paragraphs with inline citations to authoritative sources</li>
<li>Definition blocks that AI systems can quote directly</li>
</ul>

<p>AEO is the content strategy layer; GEO is the full technical and strategic framework that includes AEO alongside structured data, entity mapping, crawler access, and rendering architecture.</p>

<h2>What should you implement first?</h2>

<p>If you are starting from zero, prioritise in this order:</p>

<ol>
<li><strong>Create <code>/llms.txt</code></strong> — 2 hours of work, immediate AI crawler visibility. Describe your business, services, and contact information in plain text.</li>
<li><strong>Add JSON-LD structured data</strong> — Start with <code>Organization</code>, <code>WebSite</code>, <code>WebPage</code>, and <code>FAQPage</code>. Populate <code>sameAs</code> with at least one external profile URL.</li>
<li><strong>Fix server-side rendering</strong> — Ensure your page content is in the HTML source, not gated behind JavaScript. Test by viewing source (Ctrl+U) and confirming your text content is visible.</li>
<li><strong>Allow AI crawlers in robots.txt</strong> — Add explicit <code>Allow: /</code> rules for GPTBot, ClaudeBot, PerplexityBot, and OAI-SearchBot.</li>
<li><strong>Publish one substantive article</strong> — A single well-structured article on your core topic gives AI systems a citable content unit beyond your homepage.</li>
</ol>

<p>These five steps take a skilled developer a single day and move a site from invisible to citable in AI search.</p>

<h2>The bottom line</h2>

<p>GEO is not a replacement for SEO — it is an extension of it. Traditional SEO gets you ranked. GEO gets you cited. In a world where AI-generated answers are absorbing an increasing share of search traffic, being the source that AI systems trust and reference is the new competitive advantage.</p>

<p>At Origin Studios, we build GEO into every project from day one. Our 8-week delivery process includes full JSON-LD structured data, llms.txt, AI crawler configuration, and server-side rendering — not as add-ons, but as standard architecture. Because in 2026, a website that AI cannot read is a website that does not exist.</p>
`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
