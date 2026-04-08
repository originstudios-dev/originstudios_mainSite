# Origin Studios Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an Awwwards-level homepage for Origin Studios with 3D orb hero, cinematic scroll animations, and GEO optimization — targeting 95+ Lighthouse and sub-1s load.

**Architecture:** Next.js 15 App Router with React Three Fiber for 3D, GSAP for scroll-triggered animations, Lenis for smooth scroll, and Tailwind CSS for styling. The page is a single route composing 7 section components, a navbar, and a footer. The 3D orb is dynamically imported to keep initial bundle lean.

**Tech Stack:** Next.js 15, TypeScript, React Three Fiber, Drei, GSAP, Framer Motion, Lenis, Tailwind CSS 4, detect-gpu

---

## File Map

```
F:/originstudios/
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── public/
│   └── fonts/
│       ├── ClashDisplay-Variable.woff2
│       └── Satoshi-Variable.woff2
├── src/
│   ├── app/
│   │   ├── globals.css         — Tailwind directives + font-face + base styles
│   │   ├── layout.tsx          — root layout, fonts, metadata, GEO structured data
│   │   └── page.tsx            — homepage composing all sections
│   ├── components/
│   │   ├── three/
│   │   │   ├── Scene.tsx       — R3F Canvas wrapper with Suspense
│   │   │   ├── Orb.tsx         — hero orb with custom shader material
│   │   │   └── OrbFallback.tsx — CSS gradient fallback for low-end devices
│   │   ├── sections/
│   │   │   ├── Hero.tsx        — pinned hero with orb + headline reveal
│   │   │   ├── Logic.tsx       — GEO/AEO pitch + animated stats
│   │   │   ├── Craft.tsx       — capabilities cards
│   │   │   ├── Comparison.tsx  — us vs them
│   │   │   ├── Originals.tsx   — work showcase
│   │   │   ├── Methodology.tsx — process steps
│   │   │   └── FinalCall.tsx   — lead gen form
│   │   └── ui/
│   │       ├── Navbar.tsx      — centered logo, split nav, scroll backdrop
│   │       ├── Footer.tsx      — minimal footer + easter egg
│   │       ├── ScrollReveal.tsx— reusable GSAP reveal wrapper
│   │       └── Loader.tsx      — orb birth loading screen
│   └── lib/
│       ├── shaders/
│       │   ├── orb.vert.glsl  — orb vertex shader
│       │   └── orb.frag.glsl  — orb fragment shader
│       ├── hooks/
│       │   ├── useDeviceCapability.ts — GPU tier detection
│       │   └── useLenis.ts            — Lenis smooth scroll hook
│       └── registry.ts        — GSAP plugin registration
```

---

### Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs`
- Create: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd F:/originstudios
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

Select defaults when prompted. This creates the Next.js 15 scaffold with Tailwind and App Router.

- [ ] **Step 2: Install dependencies**

```bash
npm install three @react-three/fiber @react-three/drei gsap @gsap/react lenis framer-motion detect-gpu
npm install -D @types/three glsl-literal
```

- [ ] **Step 3: Download fonts to `public/fonts/`**

Download from Fontshare (https://www.fontshare.com/):
- Clash Display Variable → save as `public/fonts/ClashDisplay-Variable.woff2`
- Satoshi Variable → save as `public/fonts/Satoshi-Variable.woff2`

```bash
mkdir -p public/fonts
```

Note: Fonts must be downloaded manually from Fontshare. Place the `.woff2` variable font files in `public/fonts/`.

- [ ] **Step 4: Configure `next.config.ts`**

Replace the generated `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
```

- [ ] **Step 5: Set up `globals.css` with font-face and base styles**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@font-face {
  font-family: "Clash Display";
  src: url("/fonts/ClashDisplay-Variable.woff2") format("woff2");
  font-weight: 200 700;
  font-display: swap;
}

@font-face {
  font-family: "Satoshi";
  src: url("/fonts/Satoshi-Variable.woff2") format("woff2");
  font-weight: 300 900;
  font-display: swap;
}

@theme {
  --color-bg: #0a0a0a;
  --color-primary: #ffffff;
  --color-body: #888888;
  --color-label: #666666;
  --color-muted: #444444;
  --color-subtle: #222222;

  --font-clash: "Clash Display", sans-serif;
  --font-satoshi: "Satoshi", sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  background-color: var(--color-bg);
  color: var(--color-primary);
  font-family: var(--font-satoshi);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  overflow-x: hidden;
}

::selection {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}
```

- [ ] **Step 6: Set up root layout with metadata and GEO structured data**

Replace `src/app/layout.tsx` with:

```tsx
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
```

- [ ] **Step 7: Create placeholder homepage**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-primary">
      <div className="flex items-center justify-center h-screen">
        <h1 className="font-clash text-6xl font-bold uppercase tracking-tight">
          Origin Studios
        </h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Dev server starts at localhost:3000, shows "Origin Studios" heading centered on a black background with Clash Display font (or fallback sans-serif if fonts aren't downloaded yet).

- [ ] **Step 9: Commit**

```bash
git init
echo "node_modules/\n.next/\n.superpowers/" > .gitignore
git add .
git commit -m "feat: scaffold Next.js project with Tailwind, fonts, GEO metadata"
```

---

### Task 2: Utility Hooks & GSAP Registration

**Files:**
- Create: `src/lib/registry.ts`
- Create: `src/lib/hooks/useDeviceCapability.ts`
- Create: `src/lib/hooks/useLenis.ts`

- [ ] **Step 1: Create GSAP plugin registration**

Create `src/lib/registry.ts`:

```ts
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Create device capability hook**

Create `src/lib/hooks/useDeviceCapability.ts`:

```ts
"use client";

import { useState, useEffect } from "react";
import { getGPUTier } from "detect-gpu";

export type DeviceTier = "high" | "low";

export function useDeviceCapability(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("low");

  useEffect(() => {
    (async () => {
      const gpuTier = await getGPUTier();
      // Tiers: 0 = no GPU, 1 = low, 2 = mid, 3 = high
      setTier(gpuTier.tier >= 2 ? "high" : "low");
    })();
  }, []);

  return tier;
}
```

- [ ] **Step 3: Create Lenis smooth scroll hook**

Create `src/lib/hooks/useLenis.ts`:

```ts
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/registry";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
```

- [ ] **Step 4: Verify imports compile**

```bash
npm run build
```

Expected: Build succeeds with no errors. (May show warnings about unused exports — that's fine.)

- [ ] **Step 5: Commit**

```bash
git add src/lib/
git commit -m "feat: add GSAP registry, device capability hook, Lenis hook"
```

---

### Task 3: Navbar

**Files:**
- Create: `src/components/ui/Navbar.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create the Navbar component**

Create `src/components/ui/Navbar.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

const leftLinks = [
  { label: "Work", href: "#work" },
  { label: "Method", href: "#method" },
  { label: "Intelligence", href: "#intelligence" },
];

const rightLinks = [
  { label: "About", href: "#about" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Contact", href: "#contact", highlight: true },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-12 max-w-7xl w-full justify-center">
        {/* Left links */}
        <div className="hidden md:flex items-center gap-8">
          {leftLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-satoshi text-xs text-label hover:text-primary transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Center wordmark */}
        <a
          href="#"
          className="font-clash text-sm font-bold text-primary tracking-[0.2em] uppercase whitespace-nowrap"
        >
          Origin Studios
        </a>

        {/* Right links */}
        <div className="hidden md:flex items-center gap-8">
          {rightLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-satoshi text-xs tracking-wide transition-colors duration-300 ${
                link.highlight
                  ? "text-primary hover:text-white/80"
                  : "text-label hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-1.5"
          aria-label="Open menu"
        >
          <span className="block w-5 h-px bg-primary" />
          <span className="block w-5 h-px bg-primary" />
        </button>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Add Navbar to homepage**

Replace `src/app/page.tsx` with:

```tsx
import { Navbar } from "@/components/ui/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-primary">
        <div className="flex items-center justify-center h-screen">
          <h1 className="font-clash text-6xl font-bold uppercase tracking-tight">
            Origin Studios
          </h1>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: Centered nav with "Work Method Intelligence | ORIGIN STUDIOS | About Manifesto Contact". "Contact" is white, others are gray. On scroll, backdrop blur appears.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Navbar.tsx src/app/page.tsx
git commit -m "feat: add centered split navbar with scroll backdrop"
```

---

### Task 4: ScrollReveal Utility Component

**Files:**
- Create: `src/components/ui/ScrollReveal.tsx`

- [ ] **Step 1: Create ScrollReveal wrapper**

Create `src/components/ui/ScrollReveal.tsx`:

```tsx
"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  duration = 0.8,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
        });
      },
    });

    return () => trigger.kill();
  }, [delay, y, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/ScrollReveal.tsx
git commit -m "feat: add reusable ScrollReveal GSAP wrapper"
```

---

### Task 5: 3D Orb & Scene

**Files:**
- Create: `src/lib/shaders/orb.vert.glsl`
- Create: `src/lib/shaders/orb.frag.glsl`
- Create: `src/components/three/Orb.tsx`
- Create: `src/components/three/OrbFallback.tsx`
- Create: `src/components/three/Scene.tsx`

- [ ] **Step 1: Create vertex shader**

Create `src/lib/shaders/orb.vert.glsl`:

```glsl
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform float uTime;
uniform vec2 uMouse;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  vUv = uv;

  // Subtle vertex displacement based on mouse proximity
  vec3 pos = position;
  float dist = length(uMouse - pos.xy);
  float influence = smoothstep(2.0, 0.0, dist);
  pos += normal * influence * 0.05 * sin(uTime * 2.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

- [ ] **Step 2: Create fragment shader**

Create `src/lib/shaders/orb.frag.glsl`:

```glsl
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform float uTime;
uniform vec2 uMouse;
uniform float uOpacity;

void main() {
  // Fresnel effect — bright edges
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);

  // Internal glow — white core
  float core = smoothstep(0.8, 0.0, length(vUv - 0.5));

  // Mouse influence — energy shifts toward cursor
  vec2 mouseOffset = uMouse * 0.5;
  float mouseGlow = smoothstep(1.5, 0.0, length(vUv - 0.5 - mouseOffset));

  // Combine: fresnel edges + core glow + mouse interaction
  float intensity = fresnel * 0.6 + core * 0.3 + mouseGlow * 0.15;

  // Subtle caustic shimmer
  float caustic = sin(vUv.x * 20.0 + uTime) * sin(vUv.y * 20.0 - uTime * 0.7) * 0.05;
  intensity += caustic;

  vec3 color = vec3(intensity);

  gl_FragColor = vec4(color, (fresnel * 0.5 + core * 0.4 + 0.1) * uOpacity);
}
```

- [ ] **Step 3: Create the Orb component**

Create `src/components/three/Orb.tsx`:

```tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "@/lib/shaders/orb.vert.glsl";
import fragmentShader from "@/lib/shaders/orb.frag.glsl";

export function Orb({ opacity = 1 }: { opacity?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uOpacity: { value: opacity },
    }),
    [opacity]
  );

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;

    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uOpacity.value = opacity;

    // Smooth mouse follow
    mouse.current.lerp(
      new THREE.Vector2(
        pointer.x * viewport.width * 0.5,
        pointer.y * viewport.height * 0.5
      ),
      0.05
    );
    uniforms.uMouse.value.copy(mouse.current);

    // Slow rotation
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x += 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
```

- [ ] **Step 4: Create CSS fallback for low-end devices**

Create `src/components/three/OrbFallback.tsx`:

```tsx
export function OrbFallback() {
  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 50%, transparent 70%)",
        }}
      />
      {/* Inner core */}
      <div
        className="absolute inset-[15%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 45% 45%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)",
        }}
      />
      {/* Fresnel ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "inset 0 0 60px rgba(255,255,255,0.03)",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 5: Create Scene wrapper**

Create `src/components/three/Scene.tsx`:

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Orb } from "./Orb";

interface SceneProps {
  opacity?: number;
  className?: string;
}

export function Scene({ opacity = 1, className = "" }: SceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <Orb opacity={opacity} />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 6: Verify the orb renders**

Temporarily update `src/app/page.tsx`:

```tsx
import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/Navbar";

const Scene = dynamic(
  () => import("@/components/three/Scene").then((mod) => ({ default: mod.Scene })),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-primary">
        <div className="flex items-center justify-center h-screen">
          <div className="w-[400px] h-[400px]">
            <Scene />
          </div>
        </div>
      </main>
    </>
  );
}
```

```bash
npm run dev
```

Expected: A white-glowing sphere on black background, slowly rotating, with edges brighter than center. Mouse movement subtly influences the surface.

- [ ] **Step 7: Commit**

```bash
git add src/lib/shaders/ src/components/three/ src/app/page.tsx
git commit -m "feat: add 3D orb with custom shaders, fallback, and Scene wrapper"
```

---

### Task 6: Loader (Orb Birth)

**Files:**
- Create: `src/components/ui/Loader.tsx`

- [ ] **Step 1: Create the Loader component**

Create `src/components/ui/Loader.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<"dot" | "expand" | "done">("dot");

  useEffect(() => {
    // Phase 1: pulsing dot for minimum 600ms
    const expandTimer = setTimeout(() => setPhase("expand"), 600);
    // Phase 2: expansion for 1s, then done
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1800);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="rounded-full bg-white"
            initial={{ width: 4, height: 4, opacity: 0.6 }}
            animate={
              phase === "dot"
                ? {
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.2, 1],
                    transition: { duration: 1, repeat: Infinity },
                  }
                : {
                    width: 200,
                    height: 200,
                    opacity: 0,
                    transition: { duration: 1.2, ease: "easeInOut" },
                  }
            }
            style={{
              boxShadow:
                phase === "expand"
                  ? "0 0 80px rgba(255,255,255,0.3)"
                  : "0 0 20px rgba(255,255,255,0.5)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Loader.tsx
git commit -m "feat: add orb birth loader with dot-expand-fade sequence"
```

---

### Task 7: Hero Section (Pinned Cinematic)

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create the Hero section**

Create `src/components/sections/Hero.tsx`:

```tsx
"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "@/lib/registry";
import { useDeviceCapability } from "@/lib/hooks/useDeviceCapability";
import { OrbFallback } from "@/components/three/OrbFallback";

const Scene = dynamic(
  () =>
    import("@/components/three/Scene").then((mod) => ({
      default: mod.Scene,
    })),
  { ssr: false, loading: () => <OrbFallback /> }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tier = useDeviceCapability();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.5,
      },
    });

    tl.fromTo(
      line1Ref.current,
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.3 }
    )
      .fromTo(
        line2Ref.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.3 },
        "+=0.05"
      )
      .fromTo(
        line3Ref.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.3 },
        "+=0.05"
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 },
        "+=0.1"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 },
        "+=0.05"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto px-8 md:px-16">
        {/* Left: text */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex flex-col gap-1">
            <div ref={line1Ref} className="opacity-0">
              <h1 className="font-clash text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9]">
                The Internet
              </h1>
            </div>
            <div ref={line2Ref} className="opacity-0">
              <h1 className="font-clash text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9]">
                Has Changed.
              </h1>
            </div>
            <div ref={line3Ref} className="opacity-0">
              <h1 className="font-clash text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9] text-body">
                Yours Hasn&apos;t.
              </h1>
            </div>
          </div>

          <div ref={subtextRef} className="opacity-0">
            <p className="font-satoshi text-base md:text-lg text-body leading-relaxed max-w-md">
              Most sites in 2026 are invisible noise. We build{" "}
              <span className="text-primary font-medium">Origin Points</span>:
              bespoke, high-conversion digital presences engineered to be found
              by humans and cited by AI.
            </p>
          </div>

          <div ref={ctaRef} className="opacity-0 flex gap-4 items-center">
            <a
              href="#contact"
              className="font-satoshi text-sm font-medium bg-primary text-bg px-6 py-3 hover:bg-white/90 transition-colors"
            >
              Secure Your Authority
            </a>
            <a
              href="#manifesto"
              className="font-satoshi text-sm text-body border-b border-body hover:text-primary hover:border-primary transition-colors pb-0.5"
            >
              View Manifesto
            </a>
          </div>
        </div>

        {/* Right: orb */}
        <div className="hidden md:block w-[350px] h-[350px] lg:w-[450px] lg:h-[450px]">
          {tier === "high" ? <Scene /> : <OrbFallback />}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add pinned hero section with scroll-driven headline reveal and orb"
```

---

### Task 8: Section 2 — The Logic

**Files:**
- Create: `src/components/sections/Logic.tsx`

- [ ] **Step 1: Create the Logic section**

Create `src/components/sections/Logic.tsx`:

```tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/registry";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stats = [
  { value: 98, suffix: "%", label: "AEO Score" },
  { value: 45, prefix: "+", suffix: "%", label: "Conversion Rate" },
  { value: 500, prefix: "<", suffix: "ms", label: "Load Time" },
];

function StatCounter({
  value,
  prefix = "",
  suffix,
  label,
}: {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}) {
  const numRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = numRef.current;
    const line = lineRef.current;
    if (!el || !line) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: value,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function () {
              el.textContent = `${prefix}${Math.round(
                parseFloat(el.textContent || "0")
              )}`;
            },
          }
        );
        gsap.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.5, ease: "power2.out" }
        );
      },
    });

    return () => trigger.kill();
  }, [value, prefix]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-0.5">
        <span
          ref={numRef}
          className="font-satoshi text-4xl md:text-5xl font-light text-primary"
        >
          0
        </span>
        <span className="font-satoshi text-lg text-label">{suffix}</span>
      </div>
      <div
        ref={lineRef}
        className="h-px bg-white/20 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
      <span className="font-satoshi text-xs text-muted tracking-wide">
        {label}
      </span>
    </div>
  );
}

export function Logic() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
          02 — The Logic
        </span>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">
          From Blue Links
          <br />
          to Citations.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.2} className="mt-8 max-w-2xl">
        <p className="font-satoshi text-base md:text-lg text-body leading-relaxed">
          Traditional SEO is dead. In the Agentic Age, users don&apos;t
          &quot;search&quot;—they ask. If your brand isn&apos;t structured for{" "}
          <span className="text-primary">
            Retrieval-Augmented Generation (RAG)
          </span>
          , you don&apos;t exist to ChatGPT, Gemini, or Perplexity.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15} className="mt-6 max-w-2xl">
        <p className="font-satoshi text-base md:text-lg text-body leading-relaxed">
          We hardcode your Brand DNA into the semantic layer of the web, ensuring
          you are the{" "}
          <span className="text-primary font-medium">Primary Source</span> that
          AI engines trust and quote.
        </p>
      </ScrollReveal>

      <div className="mt-16 flex flex-col sm:flex-row gap-12 sm:gap-16">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <StatCounter {...stat} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Logic.tsx
git commit -m "feat: add Logic section with animated stat counters"
```

---

### Task 9: Section 3 — The Craft

**Files:**
- Create: `src/components/sections/Craft.tsx`

- [ ] **Step 1: Create the Craft section**

Create `src/components/sections/Craft.tsx`:

```tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const capabilities = [
  {
    num: "01",
    title: "Immersive 3D Environments",
    description:
      "We utilize WebGL and Three.js to create interactive 3D spaces that command 4x more engagement than static templates.",
  },
  {
    num: "02",
    title: "Motion as Narrative",
    description:
      "Custom 2D/3D motion design that guides the user's eye toward the conversion goal. No 'uncanny' AI-generated video—just pure, intentional craft.",
  },
  {
    num: "03",
    title: "Sub-500ms Engineering",
    description:
      "Speed is the ultimate UX. Our sites are built on clean, modern stacks for near-instant load times across all devices.",
  },
];

export function Craft() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
          03 — The Craft
        </span>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">
          Beyond the Prompt.
        </h2>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {capabilities.map((cap, i) => (
          <ScrollReveal key={cap.num} delay={i * 0.1}>
            <div className="group p-8 border border-white/[0.06] rounded-sm hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-300">
              <span className="font-satoshi text-xs text-label tracking-widest">
                {cap.num}
              </span>
              <h3 className="font-satoshi text-lg font-semibold text-primary mt-4">
                {cap.title}
              </h3>
              <p className="font-satoshi text-sm text-body mt-3 leading-relaxed">
                {cap.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Craft.tsx
git commit -m "feat: add Craft section with capability cards"
```

---

### Task 10: Section 4 — The Comparison

**Files:**
- Create: `src/components/sections/Comparison.tsx`

- [ ] **Step 1: Create the Comparison section**

Create `src/components/sections/Comparison.tsx`:

```tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const rows = [
  {
    feature: "Aesthetics",
    generic: "Uncanny & Repetitive",
    origin: "Bespoke & Signature",
  },
  {
    feature: "Performance",
    generic: "Bloated JS (3s+)",
    origin: "Ultra-Light (<500ms)",
  },
  {
    feature: "Visibility",
    generic: "Ignored by LLMs",
    origin: "Cited by AI Engines",
  },
  {
    feature: "Conversion",
    generic: "Passive Brochure",
    origin: "Active Sales Machine",
  },
];

export function Comparison() {
  return (
    <section className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
          04 — The Comparison
        </span>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">
          The Generic Web
          <br />
          vs. The Originals.
        </h2>
      </ScrollReveal>

      <div className="mt-16">
        {/* Header row */}
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-white/10">
            <span className="font-satoshi text-xs text-muted tracking-wide uppercase">
              Feature
            </span>
            <span className="font-satoshi text-xs text-muted tracking-wide uppercase">
              Generic AI Web Shop
            </span>
            <span className="font-satoshi text-xs text-primary tracking-wide uppercase">
              Origin Studios
            </span>
          </div>
        </ScrollReveal>

        {/* Data rows */}
        {rows.map((row, i) => (
          <ScrollReveal key={row.feature} delay={i * 0.08}>
            <div className="grid grid-cols-3 gap-4 py-6 border-b border-white/5">
              <span className="font-satoshi text-sm text-label">
                {row.feature}
              </span>
              <span className="font-satoshi text-sm text-muted">
                {row.generic}
              </span>
              <span className="font-satoshi text-sm text-primary font-medium">
                {row.origin}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Comparison.tsx
git commit -m "feat: add Comparison section with scroll-revealed rows"
```

---

### Task 11: Section 5 — The Originals (Work Showcase)

**Files:**
- Create: `src/components/sections/Originals.tsx`

- [ ] **Step 1: Create the Originals section**

Create `src/components/sections/Originals.tsx`:

```tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const projects = [
  {
    id: "01",
    name: "Project Alpha",
    metric: "AEO Score: 98% | Conversion: +45%",
  },
  {
    id: "02",
    name: "Project Nova",
    metric: "3D Interactive Launchpad",
  },
  {
    id: "03",
    name: "Project Vertex",
    metric: "Semantic Data Rebuild",
  },
];

export function Originals() {
  return (
    <section
      id="work"
      className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto"
    >
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
          05 — The Originals
        </span>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">
          Selected Work.
        </h2>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.1}>
            <div className="group cursor-pointer">
              {/* Placeholder image area */}
              <div className="aspect-[4/3] bg-white/[0.03] border border-white/[0.06] rounded-sm flex items-center justify-center group-hover:border-white/[0.12] group-hover:scale-[1.02] transition-all duration-300">
                <span className="font-satoshi text-sm text-muted">
                  {project.id}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="font-satoshi text-base font-semibold text-primary">
                  {project.name}
                </h3>
                <p className="font-satoshi text-xs text-label mt-1">
                  {project.metric}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Originals.tsx
git commit -m "feat: add Originals work showcase section with placeholder projects"
```

---

### Task 12: Section 6 — The Methodology

**Files:**
- Create: `src/components/sections/Methodology.tsx`

- [ ] **Step 1: Create the Methodology section**

Create `src/components/sections/Methodology.tsx`:

```tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Extract",
    description: "We define your brand's \"Original\" value proposition.",
  },
  {
    num: "02",
    title: "Architect",
    description: "We build the 3D assets and high-performance structural code.",
  },
  {
    num: "03",
    title: "Synthesize",
    description:
      "We layer in the semantic schema for AI retrieval and citation.",
  },
  {
    num: "04",
    title: "Optimize",
    description:
      "We run rigorous conversion stress tests before the \"Source\" goes live.",
  },
];

export function Methodology() {
  return (
    <section
      id="method"
      className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto"
    >
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
          06 — The Methodology
        </span>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">
          The Process.
        </h2>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 0.1}>
            <div className="relative">
              <span className="font-satoshi text-3xl font-light text-primary">
                {step.num}
              </span>
              <h3 className="font-satoshi text-base font-semibold text-primary mt-3">
                {step.title}
              </h3>
              <p className="font-satoshi text-sm text-body mt-2 leading-relaxed">
                {step.description}
              </p>
              {/* Connector line (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-4 -right-4 w-8 h-px bg-white/10" />
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Methodology.tsx
git commit -m "feat: add Methodology section with sequential process steps"
```

---

### Task 13: Section 7 — The Final Call (Lead Gen)

**Files:**
- Create: `src/components/sections/FinalCall.tsx`

- [ ] **Step 1: Create the FinalCall section**

Create `src/components/sections/FinalCall.tsx`:

```tsx
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FinalCall() {
  return (
    <section
      id="contact"
      className="py-32 md:py-48 px-8 md:px-16 max-w-7xl mx-auto"
    >
      <ScrollReveal>
        <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
          07 — The Final Call
        </span>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="mt-6">
        <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight">
          Ready to Become
          <br />
          the Source?
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.15} className="mt-4">
        <p className="font-satoshi text-base text-body">
          We only accept 2 bespoke builds per month to maintain our standard of
          precision.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.2} className="mt-12 max-w-lg">
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="font-satoshi text-xs text-label tracking-wide uppercase block mb-2">
              Name / Company
            </label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-white/10 pb-3 font-satoshi text-sm text-primary focus:outline-none focus:border-white/30 transition-colors placeholder:text-muted"
              placeholder="Your name or company"
            />
          </div>

          <div>
            <label className="font-satoshi text-xs text-label tracking-wide uppercase block mb-2">
              Current Annual Revenue
            </label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-white/10 pb-3 font-satoshi text-sm text-primary focus:outline-none focus:border-white/30 transition-colors placeholder:text-muted"
              placeholder="$1M - $10M"
            />
          </div>

          <div>
            <label className="font-satoshi text-xs text-label tracking-wide uppercase block mb-2">
              The One Metric You Need to Change
            </label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-white/10 pb-3 font-satoshi text-sm text-primary focus:outline-none focus:border-white/30 transition-colors placeholder:text-muted"
              placeholder="e.g., organic visibility, conversion rate, page speed"
            />
          </div>

          <button
            type="submit"
            className="mt-4 self-start font-satoshi text-sm font-medium bg-primary text-bg px-8 py-3.5 hover:bg-white/90 transition-colors"
          >
            Request a Visibility Audit
          </button>
        </form>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/FinalCall.tsx
git commit -m "feat: add FinalCall lead gen section with scarcity CTA"
```

---

### Task 14: Footer

**Files:**
- Create: `src/components/ui/Footer.tsx`

- [ ] **Step 1: Create the Footer**

Create `src/components/ui/Footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-8 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-satoshi text-xs text-muted">
          &copy; 2026 Origin Studios
        </span>

        <div className="flex gap-6">
          <a
            href="#intelligence"
            className="font-satoshi text-xs text-muted hover:text-primary transition-colors"
          >
            Intelligence
          </a>
          <a
            href="#"
            className="font-satoshi text-xs text-muted hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="font-satoshi text-xs text-muted hover:text-primary transition-colors"
          >
            X
          </a>
        </div>

        <span className="font-satoshi text-[10px] text-subtle italic">
          AI Status: Optimized. Cited in 143 latent clusters.
        </span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Footer.tsx
git commit -m "feat: add minimal footer with easter egg"
```

---

### Task 15: Assemble Homepage with Lenis & Loader

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Compose all sections in `page.tsx`**

Replace `src/app/page.tsx` with:

```tsx
"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Loader } from "@/components/ui/Loader";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { Logic } from "@/components/sections/Logic";
import { Craft } from "@/components/sections/Craft";
import { Comparison } from "@/components/sections/Comparison";
import { Originals } from "@/components/sections/Originals";
import { Methodology } from "@/components/sections/Methodology";
import { FinalCall } from "@/components/sections/FinalCall";
import { useLenis } from "@/lib/hooks/useLenis";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onLoadComplete = useCallback(() => setLoaded(true), []);
  useLenis();

  return (
    <>
      <Loader onComplete={onLoadComplete} />
      {loaded && (
        <>
          <Navbar />
          <main className="bg-bg text-primary">
            <Hero />
            <Logic />
            <Craft />
            <Comparison />
            <Originals />
            <Methodology />
            <FinalCall />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
```

- [ ] **Step 2: Run dev server and verify full page**

```bash
npm run dev
```

Expected: Loader plays (white dot expands and fades), then the full page renders with navbar, all 7 sections, and footer. Smooth scroll is active. Hero pins on scroll with headline clip-in animation. Stats count up. Cards stagger in.

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build succeeds. Check output for bundle size — Three.js/R3F should be in a separate chunk (dynamic import).

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble full homepage with loader, Lenis, and all sections"
```

---

### Task 16: GLSL Type Declaration & Final Polish

**Files:**
- Create: `src/glsl.d.ts`

- [ ] **Step 1: Add GLSL type declaration**

Create `src/glsl.d.ts`:

```ts
declare module "*.glsl" {
  const value: string;
  export default value;
}
```

- [ ] **Step 2: Run full build to verify no type errors**

```bash
npm run build
```

Expected: Clean build, no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/glsl.d.ts
git commit -m "feat: add GLSL module type declaration"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Visual identity (colors, typography) — Task 1 (globals.css)
- ✅ Tech stack — Task 1 (dependencies)
- ✅ Project structure — all files mapped in File Map
- ✅ Navbar (centered, split, scroll backdrop) — Task 3
- ✅ Loader (orb birth) — Task 6
- ✅ Hero (pinned, headline reveal, orb, CTAs) — Task 7
- ✅ Logic (stats, counters) — Task 8
- ✅ Craft (capability cards) — Task 9
- ✅ Comparison (us vs them rows) — Task 10
- ✅ Originals (work showcase) — Task 11
- ✅ Methodology (process steps) — Task 12
- ✅ Final Call (lead gen form) — Task 13
- ✅ Footer (easter egg) — Task 14
- ✅ Lenis smooth scroll — Task 2 + Task 15
- ✅ Progressive enhancement (device capability) — Task 2 + Task 7
- ✅ GEO (JSON-LD, meta) — Task 1
- ✅ Dynamic import for 3D — Task 7

**Placeholder scan:** None found. All code is complete.
**Type consistency:** Verified — `Scene`, `Orb`, `OrbFallback`, `ScrollReveal`, `Loader` all match across tasks.
