# Origin Studios — Homepage Design Spec

## Overview
Awwwards-level homepage for Origin Studios, a premium design & engineering house. The site itself must be living proof of the claims made: 95+ Lighthouse, sub-1s load, GEO-optimized.

## Visual Identity

### Theme
- **Mood:** Cinematic Dark — deep blacks, dramatic lighting, maximum contrast
- **Color:** Pure black & white monochrome
  - Background: `#0a0a0a`
  - Headlines/primary: `#ffffff`
  - Body text: `#888888`
  - Labels/secondary: `#666666`
  - Muted: `#444444`
  - Subtle: `#222222`
- **No accent color in v1.** The 3D orb provides all visual drama.

### Typography
- **Headlines:** Clash Display — 800-900 weight, ALL CAPS, tight letter-spacing
- **Body/UI/Nav/CTAs:** Satoshi — 300-500 weight, variable
- **Stats/numbers:** Satoshi 300 (thin weight = premium feel)
- Both fonts from Fontshare (free commercial license)
- Two fonts total. Weight contrast creates hierarchy.

## Tech Stack
- **Framework:** Next.js 15 (App Router, TypeScript, SSR)
- **3D:** React Three Fiber + Drei + custom GLSL shaders
- **Animation:** GSAP (ScrollTrigger) + Framer Motion (page/layout transitions)
- **Scroll:** Lenis (smooth scroll)
- **Styling:** Tailwind CSS 4
- **Deploy:** Vercel

## Project Structure
```
src/
  app/
    layout.tsx            — root layout, fonts, metadata, Lenis provider
    page.tsx              — homepage (composes all sections)
  components/
    three/
      Scene.tsx           — R3F Canvas wrapper
      Orb.tsx             — hero orb (shader material, cursor reactivity)
      OrbLoader.tsx       — "orb birth" loading sequence
    sections/
      Hero.tsx            — pinned hero with orb + headline reveal
      Logic.tsx           — GEO/AEO pitch + stats
      Craft.tsx           — capabilities cards
      Comparison.tsx      — us vs them table
      Originals.tsx       — work showcase grid
      Methodology.tsx     — process steps
      FinalCall.tsx       — lead gen form + CTA
    ui/
      Navbar.tsx          — centered logo, split nav
      Footer.tsx          — minimal footer + easter egg
      ScrollReveal.tsx    — reusable GSAP scroll-triggered reveal wrapper
      MagneticButton.tsx  — cursor-magnetic CTA component
      CustomCursor.tsx    — custom cursor (desktop only)
  lib/
    shaders/              — GLSL vertex/fragment shaders for the orb
    hooks/
      useDeviceCapability.ts  — detect GPU tier for progressive enhancement
      useSmoothScroll.ts      — Lenis setup
```

## Navbar
- Centered "ORIGIN STUDIOS" wordmark (Clash Display, 900 weight, letter-spacing 3px)
- Nav links split evenly on either side:
  - Left: Work, Method, Intelligence
  - Right: About, Manifesto, Contact
- "Contact" in white (#fff) while other links are gray (#666) — amber-text style differentiation without color
- Transparent on hero, gains subtle backdrop-blur on scroll
- Fixed position, slim height

## Page Loading Experience — Orb Birth
1. Black screen, single white dot (2px) at center (CSS animation, no JS dependency)
2. Dot pulses gently while assets load
3. As loading progresses, dot expands organically into a rough sphere
4. At 100%, sphere refines into the full hero orb (shaders activate, glass material appears)
5. Orb settles into hero position, headline clips in from left
6. Minimum animation duration: ~1.5-2s (never feels janky even on fast connections)

## Section 1: Hero (Pinned Cinematic)
- Full viewport height, scroll-pinned for ~1.5 scroll-lengths
- **Left side:** Headline reveals line by line on scroll within the pin:
  - "THE INTERNET" — clips in
  - "HAS CHANGED." — follows
  - "YOURS HASN'T." — lighter gray (#999)
  - Sub-text and CTAs fade in last
- **Right side:** The orb — slowly rotating, internal energy shifts toward cursor
- **Background:** Very sparse particle field, low opacity, drifting slowly
- **On pin release:** Orb scales down and fades as user scrolls to Section 2
- **Primary CTA:** "Secure Your Authority" — white background, black text
- **Secondary CTA:** "View Manifesto" — underlined gray text

### The Orb
- Glass/crystal material with fresnel edge glow (white edges)
- Internal volumetric light — white core, subtle caustic patterns
- Cursor proximity: internal energy shifts toward pointer, slight surface distortion
- Slow ambient rotation

## Section 2: The Logic (GEO/AEO Pitch)
- Section label: `02 — THE LOGIC`
- Headline: "FROM BLUE LINKS TO CITATIONS."
- Body: explains RAG, the new search reality, the Origin Fix
- Stats row with count-up animation on viewport entry: 98%, +45%, <500ms
- Each stat has a thin line that draws itself as numbers count
- Text-heavy, no 3D — let the words land

## Section 3: The Craft (Capabilities)
- Headline: "BEYOND THE PROMPT."
- Three capability cards, stagger-in from bottom on scroll:
  1. Immersive 3D — WebGL + Three.js environments
  2. Motion Narrative — Custom 2D/3D animation
  3. Sub-500ms Stack — Speed as ultimate UX
- Cards: numbered label, title, description
- Hover: translateY -4px, border brightens
- Horizontal row desktop, vertical stack mobile

## Section 4: The Comparison (Us vs. Them)
- Headline: "THE GENERIC WEB VS. THE ORIGINALS."
- Two-column layout: left (gray/muted) = generic, right (white/bright) = Origin Studios
- Rows reveal one by one on scroll, staggered fade-in
- Features: Aesthetics, Performance, Visibility, Conversion
- Thin vertical divider line draws itself downward as rows appear

## Section 5: The Originals (Work Showcase)
- Headline: "SELECTED WORK."
- 3-column grid of project cards with high-fidelity mockup placeholders
- Each card: project name, one-line result metric
- Hover: slight scale-up, border brighten
- Placeholder content for v1 (no real projects yet)

## Section 6: The Methodology (The Lab)
- Headline: "THE PROCESS."
- Four steps in a horizontal flow: Extract → Architect → Synthesize → Optimize
- Step numbers in thin weight, labels below
- Connecting arrows or lines between steps
- Steps reveal sequentially on scroll

## Section 7: The Final Call (Lead Gen)
- Headline: "READY TO BECOME THE SOURCE?"
- Sub-text: "We only accept 2 bespoke builds per month."
- Form fields: Name/Company, Current Annual Revenue, The One Metric You Need to Change
- CTA button: "Request a Visibility Audit" — white bg, black text
- Scarcity framing to filter leads

## Footer
- Minimal single row
- Left: © 2026 Origin Studios
- Center: Intelligence, LinkedIn, X links
- Right (easter egg): "AI Status: Optimized. Cited in 143 latent clusters." in barely-visible #222

## Scroll Behavior
- **Hybrid model:** Hero is pinned cinematic, rest is fluid long-scroll
- Lenis smooth scroll throughout
- GSAP ScrollTrigger for: hero pin, headline reveal, stat counters, card stagger, comparison row reveals, methodology step sequence
- Framer Motion for: page load transitions, layout animations

## Mobile Strategy — Progressive Enhancement
- Detect device GPU capability (via `useDeviceCapability` hook using GPU tier detection)
- **High-end mobile:** Full 3D orb with reduced polygon count and simplified shaders
- **Low-end mobile:** CSS radial gradient with subtle pulse animation (2D fallback)
- All scroll animations present on both tiers, reduced complexity
- Single-column stacked layout
- Nav collapses to hamburger with full-screen overlay menu

## GEO Optimization
- JSON-LD structured data: ProfessionalService / WebDesignAgency schema
- Semantic HTML throughout (proper heading hierarchy, section elements, landmark roles)
- OpenGraph + Twitter Card meta tags
- Meta description optimized for AI citation
- Keywords embedded: GEO, AEO, Bespoke 3D Web Design, High-Conversion UX

## Performance Targets
- Lighthouse: 95+ (all categories)
- LCP: < 1s
- CLS: 0
- FID/INP: < 100ms
- Total bundle: minimize with dynamic imports for Three.js/R3F (only load on canvas viewport entry)
- Fonts: preload critical weights, swap display
