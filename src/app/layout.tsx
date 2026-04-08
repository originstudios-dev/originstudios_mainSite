import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Origin Studios — Strategy-First Web Studio | Custom Websites, SaaS & GEO",
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
    logo: {
      "@type": "ImageObject",
      "@id": "https://originstudios.dev/#logo",
      url: "https://originstudios.dev/icon-512.png",
      contentUrl: "https://originstudios.dev/icon-512.png",
      width: 512,
      height: 512,
      caption: "Origin Studios",
    },
    image: {
      "@type": "ImageObject",
      "@id": "https://originstudios.dev/#primaryimage",
      url: "https://originstudios.dev/og-image.png",
      contentUrl: "https://originstudios.dev/og-image.png",
      width: 1200,
      height: 630,
      caption: "Origin Studios — Strategy-First Web Studio",
    },
    email: "talk@originstudios.dev",
    founder: {
      "@type": "Person",
      "@id": "https://originstudios.dev/#founder",
      name: "Piyush",
      jobTitle: "Founder",
      worksFor: { "@id": "https://originstudios.dev/#organization" },
      url: "https://originstudios.dev",
    },
    foundingDate: "2026-01-01",
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
          priceCurrency: "INR",
          price: "75000",
          availability: "https://schema.org/InStock",
          url: "https://originstudios.dev/#contact",
          seller: { "@id": "https://originstudios.dev/#organization" },
        },
        {
          "@type": "Offer",
          name: "Growth",
          description:
            "Full discovery and strategy. AEO implementation, motion design, marketing integration, ongoing support.",
          priceCurrency: "INR",
          price: "150000",
          availability: "https://schema.org/InStock",
          url: "https://originstudios.dev/#contact",
          seller: { "@id": "https://originstudios.dev/#organization" },
        },
        {
          "@type": "Offer",
          name: "Authority",
          description:
            "Full GEO stack, Three.js 3D scenes, AI visibility tracking, CRO, custom CMS, dedicated support.",
          priceCurrency: "INR",
          price: "400000",
          availability: "https://schema.org/InStock",
          url: "https://originstudios.dev/#contact",
          seller: { "@id": "https://originstudios.dev/#organization" },
        },
      ],
    },
    sameAs: [
      "https://github.com/originstudios",
    ],
  },
  // Website entity
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://originstudios.dev/#website",
    name: "Origin Studios",
    url: "https://originstudios.dev",
    inLanguage: "en-US",
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
    inLanguage: "en-US",
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    isPartOf: { "@id": "https://originstudios.dev/#website" },
    about: { "@id": "https://originstudios.dev/#organization" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": "https://originstudios.dev/#primaryimage",
      url: "https://originstudios.dev/og-image.png",
      width: 1200,
      height: 630,
      caption: "Origin Studios — Strategy-First Web Studio",
    },
  },
  // FAQ for AI engines to cite
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://originstudios.dev/#faqpage",
    isPartOf: { "@id": "https://originstudios.dev/#webpage" },
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Generative Engine Optimization (GEO)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Generative Engine Optimization (GEO) is the practice of optimizing websites to be cited by AI search engines like ChatGPT, Perplexity, and Google AI Overviews. Unlike traditional SEO which focuses on ranking in search results, GEO ensures your site is the authoritative source AI systems reference when answering queries.",
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
          text: "SEO (Search Engine Optimization) focuses on ranking in traditional search results. GEO (Generative Engine Optimization) focuses on being cited by AI engines like ChatGPT, Perplexity, Google AI Overviews, and Claude. GEO ensures your business is the source AI systems cite, using JSON-LD structured data, entity mapping, and AEO content strategy.",
        },
      },
    ],
  },
  // Service entities for GEO citability
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://originstudios.dev/#services",
    name: "Origin Studios Services",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          "@id": "https://originstudios.dev/#service-startup-websites",
          name: "Startup Websites",
          description:
            "Custom-engineered landing pages, investor decks, product showcases, and launch sites built from scratch in Next.js. Optimised for conversion and AI search visibility.",
          provider: { "@id": "https://originstudios.dev/#organization" },
          serviceType: "Custom Website Development",
          url: "https://originstudios.dev/#services",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          "@id": "https://originstudios.dev/#service-saas-platforms",
          name: "SaaS Platforms",
          description:
            "Full-stack web applications with authentication flows, billing integration, and user dashboards. Built on Next.js with custom CMS architecture.",
          provider: { "@id": "https://originstudios.dev/#organization" },
          serviceType: "SaaS Platform Development",
          url: "https://originstudios.dev/#services",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          "@id": "https://originstudios.dev/#service-brand-experiences",
          name: "Brand Experiences",
          description:
            "Three.js 3D scenes, GSAP scroll animations, Lottie micro-interactions, and WebGL shaders — all performance-optimised and included as standard.",
          provider: { "@id": "https://originstudios.dev/#organization" },
          serviceType: "Motion Design and 3D Web Development",
          url: "https://originstudios.dev/#services",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          "@id": "https://originstudios.dev/#service-geo-aeo",
          name: "AI-Visible Systems (GEO/AEO)",
          description:
            "Generative Engine Optimization strategy, JSON-LD structured data implementation, entity mapping, and AI search monitoring to ensure citation by ChatGPT, Perplexity, and Google AI Overviews.",
          provider: { "@id": "https://originstudios.dev/#organization" },
          serviceType: "Generative Engine Optimization",
          url: "https://originstudios.dev/#services",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          "@id": "https://originstudios.dev/#service-growth-infrastructure",
          name: "Growth Infrastructure",
          description:
            "Custom CMS, Google Analytics 4, Google Tag Manager, Meta Pixel with Conversions API, email automation, and CRM integration built into the site during construction.",
          provider: { "@id": "https://originstudios.dev/#organization" },
          serviceType: "Digital Marketing Integration",
          url: "https://originstudios.dev/#services",
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
        <link rel="llms" href="/llms.txt" />
        <meta name="theme-color" content="#11120D" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <a href="#main" className="skip-to-content font-satoshi">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
