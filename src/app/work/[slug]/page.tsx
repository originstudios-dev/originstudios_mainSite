import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudy, getAllWorkSlugs } from "@/lib/work";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: `${study.title} | Work`,
    description: study.description,
    openGraph: {
      title: study.title,
      description: study.description,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://originstudios.dev/work/${study.slug}#casestudy`,
    name: study.title,
    description: study.description,
    datePublished: study.date,
    author: {
      "@id": "https://originstudios.dev/#organization",
    },
    creator: {
      "@id": "https://originstudios.dev/#organization",
    },
    about: study.services.map((service) => ({
      "@type": "Service",
      name: service,
    })),
    keywords: study.stack,
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="min-h-screen bg-bg text-primary px-8 md:px-16 py-32">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/work"
            className="font-satoshi text-sm text-[#FFFBF4]/40 hover:text-[#D8CFBC] transition-colors"
          >
            &larr; All work
          </Link>

          <header className="mt-8 mb-12">
            <span className="font-satoshi text-xs tracking-wide uppercase text-[#D8CFBC]/60">
              {study.category} &middot; {study.client}
            </span>
            <h1 className="font-clash text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight mt-2">
              {study.title}
            </h1>
            <p className="font-satoshi text-base text-[#FFFBF4]/60 mt-4 leading-relaxed">
              {study.description}
            </p>

            {/* Results grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {study.results.map((result) => (
                <div key={result.label} className="border border-[#D8CFBC]/10 p-4">
                  <span className="font-clash text-2xl md:text-3xl font-bold text-[#D8CFBC]">
                    {result.value}
                  </span>
                  <p className="font-satoshi text-xs text-[#FFFBF4]/50 mt-1 tracking-wide uppercase">
                    {result.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mt-6">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-satoshi text-xs tracking-wide text-[#FFFBF4]/50 border border-[#D8CFBC]/15 px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          <div
            className="font-satoshi text-base text-[#FFFBF4]/80 leading-relaxed
              [&>p]:mb-6
              [&>h2]:font-clash [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:uppercase [&>h2]:tracking-tight [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:text-[#D8CFBC]
              [&>h3]:font-clash [&>h3]:text-xl [&>h3]:font-bold [&>h3]:uppercase [&>h3]:tracking-tight [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-[#D8CFBC]
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2
              [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
              [&_strong]:text-[#FFFBF4] [&_strong]:font-semibold
              [&_code]:bg-[#D8CFBC]/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-[#D8CFBC]"
            dangerouslySetInnerHTML={{ __html: study.content }}
          />

          <footer className="mt-16 pt-8 border-t border-[#D8CFBC]/10">
            <p className="font-satoshi text-sm text-[#FFFBF4]/40">
              Built by Origin Studios in {study.timeline}.
            </p>
            <div className="flex gap-4 mt-4">
              <Link
                href="/work"
                className="font-satoshi text-sm text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors"
              >
                &larr; More work
              </Link>
              <Link
                href="/#contact"
                className="font-satoshi text-sm text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors"
              >
                Start a project &rarr;
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}
