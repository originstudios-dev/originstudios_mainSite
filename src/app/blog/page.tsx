import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on Generative Engine Optimization (GEO), AI search visibility, structured data, and modern web development from Origin Studios.",
};

export default function BlogIndex() {
  return (
    <main id="main" className="min-h-screen bg-bg text-primary px-8 md:px-16 py-32">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="font-satoshi text-sm text-[#FFFBF4]/40 hover:text-[#D8CFBC] transition-colors"
        >
          &larr; Origin Studios
        </Link>

        <h1 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight mt-8 mb-4">
          Intelligence
        </h1>
        <p className="font-satoshi text-base text-[#FFFBF4]/60 mb-16 max-w-xl">
          Thinking on GEO, AI search visibility, structured data, and building websites that get cited — not just visited.
        </p>

        <div className="flex flex-col gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-[#D8CFBC]/10 hover:border-[#D8CFBC]/30 transition-colors p-8"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-satoshi text-xs tracking-wide uppercase text-[#D8CFBC]/60 border border-[#D8CFBC]/20 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-clash text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#D8CFBC] transition-colors">
                {post.title}
              </h2>
              <p className="font-satoshi text-sm text-[#FFFBF4]/60 mt-3 leading-relaxed">
                {post.description}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <span className="font-satoshi text-xs text-[#FFFBF4]/40">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="font-satoshi text-xs text-[#FFFBF4]/40">
                  {post.readingTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
