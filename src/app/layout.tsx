import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Origin Studios — AI-Era Web Studio | GEO, Motion & Strategy",
  description:
    "Origin Studios builds custom, AI-optimised websites with motion design, GEO/AEO, and full marketing integration. Strategy-first.",
  keywords: [
    "Generative Engine Optimization",
    "GEO",
    "Answer Engine Optimization",
    "AEO",
    "Motion Design Website",
    "Three.js Web Development",
    "AI-Optimized Websites",
    "Custom Next.js Development",
    "Origin Studios",
  ],
  openGraph: {
    title: "The web studio built for 2026. Not 2019.",
    description:
      "Custom builds. Motion & 3D. AI search visibility. Full marketing integration. One studio. One system. No handoffs.",
    type: "website",
    locale: "en_US",
    siteName: "Origin Studios",
  },
  twitter: {
    card: "summary_large_image",
    title: "We Build Websites. We Build the System They Run On.",
    description:
      "Custom builds. Motion & 3D. AI search visibility. Full marketing integration. One studio. One system.",
  },
  alternates: {
    canonical: "https://originstudios.dev",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://originstudios.dev/#organization",
    name: "Origin Studios",
    description:
      "Origin Studios builds custom, AI-optimised websites with motion design, GEO/AEO, and full marketing integration. Strategy-first web studio.",
    url: "https://originstudios.dev",
    email: "hello@originstudios.dev",
    founder: {
      "@type": "Person",
      name: "Piyush",
    },
    foundingDate: "2026",
    serviceType: [
      "Web Design",
      "Web Development",
      "Motion Design",
      "3D Web Development",
      "Generative Engine Optimization",
      "Answer Engine Optimization",
      "Digital Marketing",
    ],
    areaServed: "Worldwide",
    knowsAbout: [
      "Generative Engine Optimization",
      "Answer Engine Optimization",
      "Three.js 3D Web Development",
      "Next.js Development",
      "Motion Design",
      "Lottie Animations",
      "JSON-LD Structured Data",
      "Knowledge Graph Optimization",
      "Conversion Rate Optimization",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Foundation",
          description: "Custom design + development, 5-8 pages, sub-1s load, Sanity CMS",
          priceCurrency: "INR",
          price: "75000",
        },
        {
          "@type": "Offer",
          name: "Growth",
          description: "Full discovery + strategy, AEO, motion design, marketing integration",
          priceCurrency: "INR",
          price: "150000",
        },
        {
          "@type": "Offer",
          name: "Authority",
          description: "Full GEO stack, Three.js 3D, AI visibility tracking, CRO",
          priceCurrency: "INR",
          price: "400000",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Origin Studios",
    url: "https://originstudios.dev",
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
      <body>{children}</body>
    </html>
  );
}
