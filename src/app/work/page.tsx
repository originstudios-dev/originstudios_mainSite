import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and project outcomes from Origin Studios — custom websites, SaaS platforms, and brand experiences built with GEO and motion design.",
};

export default function WorkIndex() {
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
          Originals
        </h1>
        <p className="font-satoshi text-base text-[#FFFBF4]/60 mb-16 max-w-xl">
          Every project is built from scratch. No templates. No themes. Here is what that looks like.
        </p>

        <div className="flex flex-col gap-8">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group block border border-[#D8CFBC]/10 hover:border-[#D8CFBC]/30 transition-colors p-8"
            >
              <span className="font-satoshi text-xs tracking-wide uppercase text-[#D8CFBC]/60">
                {study.category}
              </span>
              <h2 className="font-clash text-xl md:text-2xl font-bold uppercase tracking-tight mt-2 group-hover:text-[#D8CFBC] transition-colors">
                {study.title}
              </h2>
              <p className="font-satoshi text-sm text-[#FFFBF4]/60 mt-3 leading-relaxed">
                {study.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {study.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-satoshi text-xs tracking-wide text-[#FFFBF4]/40 border border-[#D8CFBC]/10 px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span className="font-satoshi text-xs text-[#FFFBF4]/40">
                  {study.timeline}
                </span>
                <span className="font-satoshi text-xs text-[#FFFBF4]/40">
                  {new Date(study.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
