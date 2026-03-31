import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Origin Studios — The Primary Source",
  description:
    "Origin Studios architects bespoke, high-performance digital presences optimized for human conversion and AI citation. Generative Engine Optimization (GEO), immersive 3D web design, and sub-500ms engineering.",
  keywords: [
    "Generative Engine Optimization",
    "GEO",
    "Answer Engine Optimization",
    "AEO",
    "Bespoke 3D Web Design",
    "High-Conversion UX",
    "Origin Studios",
  ],
  openGraph: {
    title: "Origin Studios — The Primary Source",
    description:
      "High-performance, 3D-integrated digital presences optimized for human conversion and AI citation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Origin Studios — The Primary Source",
    description:
      "High-performance, 3D-integrated digital presences optimized for human conversion and AI citation.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Origin Studios",
  description:
    "Origin Studios architects bespoke, high-performance digital presences optimized for human conversion and AI citation.",
  url: "https://originstudios.com",
  serviceType: "Web Design & Development",
  areaServed: "Worldwide",
  knowsAbout: [
    "Generative Engine Optimization",
    "Answer Engine Optimization",
    "3D Web Design",
    "High-Conversion UX Design",
    "WebGL Development",
  ],
};

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
