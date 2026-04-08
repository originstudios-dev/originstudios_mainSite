import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllSlugs } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://originstudios.dev/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Person",
      "@id": "https://originstudios.dev/#founder",
      name: post.author,
    },
    publisher: {
      "@id": "https://originstudios.dev/#organization",
    },
    isPartOf: {
      "@id": "https://originstudios.dev/#website",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://originstudios.dev/blog/${post.slug}`,
    },
    keywords: post.tags,
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
            href="/blog"
            className="font-satoshi text-sm text-[#FFFBF4]/40 hover:text-[#D8CFBC] transition-colors"
          >
            &larr; All posts
          </Link>

          <header className="mt-8 mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-satoshi text-xs tracking-wide uppercase text-[#D8CFBC]/60 border border-[#D8CFBC]/20 px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-clash text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <span className="font-satoshi text-sm text-[#FFFBF4]/60">
                {post.author}
              </span>
              <span className="text-[#FFFBF4]/20">|</span>
              <span className="font-satoshi text-sm text-[#FFFBF4]/40">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-[#FFFBF4]/20">|</span>
              <span className="font-satoshi text-sm text-[#FFFBF4]/40">
                {post.readingTime}
              </span>
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
              [&_code]:bg-[#D8CFBC]/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-[#D8CFBC]
              [&_a]:text-[#D8CFBC] [&_a]:underline [&_a:hover]:text-[#FFFBF4]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-16 pt-8 border-t border-[#D8CFBC]/10">
            <p className="font-satoshi text-sm text-[#FFFBF4]/40">
              Published by Origin Studios — Strategy-First Web Studio.
            </p>
            <div className="flex gap-4 mt-4">
              <Link
                href="/blog"
                className="font-satoshi text-sm text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors"
              >
                &larr; More posts
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
