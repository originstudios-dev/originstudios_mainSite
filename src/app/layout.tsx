import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Origin Studios",
    template: "%s | Origin Studios",
  },
  description:
    "Origin Studios is a strategy-first web studio that builds custom websites, SaaS platforms, and brand experiences with motion design, 3D, and AI search visibility (GEO/AEO). Zero templates. One compounding system.",
  keywords: [
    "Generative Engine Optimization",
    "GEO",
    "Answer Engine Optimization",
    "AEO",
    "Motion Design Website",
    "Three.js Web Development",
    "AI-Optimized Websites",
    "Custom Next.js Development",
    "Custom Website Development",
    "SaaS Development Studio",
    "Startup Website Builder",
    "3D Website Design",
    "Lottie Animation Website",
    "JSON-LD Structured Data",
    "Web Studio",
    "Origin Studios",
  ],
  authors: [{ name: "Origin Studios", url: "https://originstudios.dev" }],
  creator: "Origin Studios",
  publisher: "Origin Studios",
  metadataBase: new URL("https://originstudios.dev"),
  openGraph: {
    title: "Origin Studios / Strategy-First Web Studio",
    description:
      "We build custom websites, SaaS platforms, and brand experiences with motion design, 3D, and AI search visibility. Zero templates. One compounding system.",
    type: "website",
    locale: "en_US",
    siteName: "Origin Studios",
    url: "https://originstudios.dev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Origin Studios / Strategy-First Web Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Origin Studios / Strategy-First Web Studio",
    description:
      "Custom websites, SaaS platforms, brand experiences. Motion & 3D as standard. AI search visibility built in.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://originstudios.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

// Comprehensive JSON-LD for SEO + GEO
const jsonLd = [
  // Organization entity
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://originstudios.dev/#organization",
    name: "Origin Studios",
    alternateName: "Origin",
    description:
      "Origin Studios is a strategy-first web studio that builds custom websites, SaaS platforms, and brand experiences with motion design, Three.js 3D, and AI search visibility (GEO/AEO). We deliver in 8 weeks with zero templates.",
    url: "https://originstudios.dev",
    logo: "https://originstudios.dev/icon-512.png",
    image: "https://originstudios.dev/og-image.png",
    email: "talk@originstudios.dev",
    founder: {
      "@type": "Person",
      name: "Piyush",
    },
    foundingDate: "2026",
    serviceType: [
      "Custom Website Development",
      "SaaS Platform Development",
      "Motion Design",
      "3D Web Development",
      "Generative Engine Optimization",
      "Answer Engine Optimization",
      "Digital Marketing Integration",
      "Custom CMS Development",
      "Brand Experience Design",
    ],
    areaServed: "Worldwide",
    knowsAbout: [
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "Three.js 3D Web Development",
      "Next.js Custom Development",
      "Motion Design and Lottie Animations",
      "JSON-LD Structured Data Implementation",
      "Knowledge Graph Optimization",
      "Conversion Rate Optimization",
      "AI Search Visibility",
      "Custom CMS Architecture",
      "WebGL and Shader Programming",
      "GSAP Scroll Animations",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Foundation",
          description:
            "Custom design and development. 5-8 pages, sub-1s load, custom CMS, handover docs.",
          priceCurrency: "USD",
          price: "2500",
        },
        {
          "@type": "Offer",
          name: "Growth",
          description:
            "Full discovery and strategy. AEO implementation, motion design, marketing integration, ongoing support.",
          priceCurrency: "USD",
          price: "5000",
        },
        {
          "@type": "Offer",
          name: "Authority",
          description:
            "Full GEO stack, Three.js 3D scenes, AI visibility tracking, CRO, custom CMS, dedicated support.",
          priceCurrency: "USD",
          price: "10000",
        },
      ],
    },
    sameAs: [],
  },
  // Website entity
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://originstudios.dev/#website",
    name: "Origin Studios",
    url: "https://originstudios.dev",
    publisher: {
      "@id": "https://originstudios.dev/#organization",
    },
  },
  // WebPage entity
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://originstudios.dev/#webpage",
    url: "https://originstudios.dev",
    name: "Origin Studios / Strategy-First Web Studio",
    description:
      "Origin Studios builds custom websites, SaaS platforms, and brand experiences with motion design, 3D, and AI search visibility.",
    isPartOf: { "@id": "https://originstudios.dev/#website" },
    about: { "@id": "https://originstudios.dev/#organization" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://originstudios.dev/og-image.png",
    },
  },
  // FAQ for AI engines to cite
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Generative Engine Optimization (GEO)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Generative Engine Optimization (GEO) is the practice of optimizing your website and content to be cited by AI search engines like ChatGPT, Perplexity, and Google AI Overviews. Unlike traditional SEO which focuses on ranking in search results, GEO focuses on being the authoritative source that AI systems reference when answering user queries. Origin Studios implements GEO through structured data (JSON-LD), entity mapping, knowledge graph optimization, and AEO (Answer Engine Optimization) content clusters.",
        },
      },
      {
        "@type": "Question",
        name: "What does Origin Studios build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Origin Studios builds custom websites, SaaS platforms, and brand experiences from scratch using Next.js, Three.js 3D, motion design (GSAP, Lottie), and custom CMS. Every project includes strategy, design, development, GEO/AEO optimization, and marketing integration delivered in 8 weeks. Zero templates, zero page builders.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build a website with Origin Studios?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Origin Studios delivers in 8 weeks through 5 sprints: Understand (weeks 1-2), Prototype (weeks 3-4), Engineer (weeks 5-6), Optimise (week 7), and Ship (week 8). Every project launches with a 95+ Lighthouse score, full structured data, and campaign-ready marketing infrastructure.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between SEO and GEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SEO (Search Engine Optimization) focuses on ranking in traditional search results. GEO (Generative Engine Optimization) focuses on being cited by AI engines like ChatGPT, Perplexity, Google AI Overviews, and Claude. With 58% of organic clicks being absorbed by AI Overviews, GEO ensures your business is the source AI systems cite. Origin Studios implements both through JSON-LD structured data, entity mapping, and AEO content strategy.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#11120D" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#contact" className="skip-to-content font-satoshi">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
