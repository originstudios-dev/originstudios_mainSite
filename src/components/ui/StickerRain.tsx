"use client";

import { useRef, useEffect } from "react";

const STICKER_FILES = [
  "/svg/bear.svg",
  "/svg/capybara.svg",
  "/svg/catmusic.svg",
  "/svg/catspacec.svg",
  "/svg/chairdino.svg",
  "/svg/chairduck.svg",
  "/svg/chickenrock.svg",
  "/svg/cry.svg",
  "/svg/dinosor.svg",
  "/svg/duck2-removebg-preview.svg",
  "/svg/duck_lisa-removebg-preview.svg",
  "/svg/duckflp.svg",
  "/svg/elephant.svg",
  "/svg/firefrog.svg",
  "/svg/foxx.svg",
  "/svg/frogboxer.svg",
  "/svg/helmet.svg",
  "/svg/koala.svg",
  "/svg/lemonbara.svg",
  "/svg/lion.svg",
  "/svg/machlibara.svg",
  "/svg/perry-removebg-preview.svg",
  "/svg/pig.svg",
  "/svg/racon.svg",
  "/svg/redcapybara.svg",
  "/svg/schoolcat.svg",
  "/svg/shark.svg",
  "/svg/starcat.svg",
  "/svg/tamatar.svg",
  "/svg/tree.svg",
];

const PARTICLE_COUNT = 40;

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  driftAmplitude: number;
  driftFrequency: number;
  driftOffset: number;
  opacity: number;
  stickerIndex: number;
}

function createParticle(cw: number, ch: number, scatter: boolean): Particle {
  // Size distribution: mostly medium-large, some huge at edges
  const sizeRoll = Math.random();
  let size: number;
  if (sizeRoll < 0.15) {
    size = 180 + Math.random() * 80; // 15% huge (180-260px)
  } else if (sizeRoll < 0.5) {
    size = 120 + Math.random() * 60; // 35% large (120-180px)
  } else if (sizeRoll < 0.8) {
    size = 70 + Math.random() * 50; // 30% medium (70-120px)
  } else {
    size = 40 + Math.random() * 30; // 20% small depth particles (40-70px)
  }

  // Chaotic speed — some fall, some drift sideways, some barely move
  const speedRoll = Math.random();
  let speedY: number;
  let speedX: number;
  if (speedRoll < 0.3) {
    // Slow floaters
    speedY = 0.15 + Math.random() * 0.3;
    speedX = (Math.random() - 0.5) * 0.4;
  } else if (speedRoll < 0.7) {
    // Medium fallers with lateral drift
    speedY = 0.4 + Math.random() * 0.6;
    speedX = (Math.random() - 0.5) * 0.3;
  } else {
    // Fast chaotic
    speedY = 0.8 + Math.random() * 1.2;
    speedX = (Math.random() - 0.5) * 0.8;
  }

  // Opacity: bigger = more opaque, small = ghostly
  const opacity = size > 140 ? 0.6 + Math.random() * 0.2 : size > 80 ? 0.4 + Math.random() * 0.2 : 0.2 + Math.random() * 0.15;

  return {
    x: Math.random() * cw,
    y: scatter ? Math.random() * ch * 1.2 - ch * 0.1 : -(Math.random() * ch + size),
    size,
    speedY,
    speedX,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2.5,
    driftAmplitude: 20 + Math.random() * 60,
    driftFrequency: 0.0005 + Math.random() * 0.002,
    driftOffset: Math.random() * Math.PI * 2,
    opacity,
    stickerIndex: Math.floor(Math.random() * STICKER_FILES.length),
  };
}

export function StickerRain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLImageElement | null)[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    // Init — scatter across viewport so it looks populated immediately
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(w, h, true)
    );

    // Apply initial state
    particlesRef.current.forEach((p, i) => {
      const el = elementsRef.current[i];
      if (!el) return;
      el.style.width = `${p.size}px`;
      el.style.height = `${p.size}px`;
      el.style.opacity = `${p.opacity}`;
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`;
    });

    const animate = () => {
      timeRef.current += 16;
      const particles = particlesRef.current;
      const cw = container.clientWidth;
      const ch = container.clientHeight;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const el = elementsRef.current[i];
        if (!el) continue;

        // Movement
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        // Organic drift — compound sine for more chaotic movement
        const drift =
          Math.sin(timeRef.current * p.driftFrequency + p.driftOffset) * p.driftAmplitude +
          Math.sin(timeRef.current * p.driftFrequency * 2.3 + p.driftOffset * 1.7) * p.driftAmplitude * 0.3;

        // Reset when off screen (any edge)
        if (p.y > ch + p.size) {
          p.y = -p.size - Math.random() * 100;
          p.x = Math.random() * cw;
          p.stickerIndex = Math.floor(Math.random() * STICKER_FILES.length);
          el.src = STICKER_FILES[p.stickerIndex];
        }
        // Wrap horizontally
        if (p.x + drift > cw + p.size) p.x = -p.size;
        if (p.x + drift < -p.size) p.x = cw + p.size;

        el.style.transform = `translate3d(${p.x + drift}px, ${p.y}px, 0) rotate(${p.rotation}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
        <img
          key={i}
          ref={(el) => {
            elementsRef.current[i] = el;
          }}
          src={STICKER_FILES[i % STICKER_FILES.length]}
          alt=""
          draggable={false}
          className="absolute top-0 left-0 will-change-transform"
          style={{
            width: 100,
            height: 100,
            objectFit: "contain",
            opacity: 0,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
          }}
        />
      ))}
    </div>
  );
}
