"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 8000;
const DUST_COUNT = 400;
const SCALE = 4.0;

function createStarTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.12, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.15)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// Lemniscate parametric: returns {x, z} for parameter t
function lemniscate(t: number, a: number) {
  const s = Math.sin(t);
  const c = Math.cos(t);
  const d = 1 + s * s;
  return { x: (a * c) / d, z: (a * s * c) / d };
}

export function Galaxy({ opacity = 1 }: { opacity?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);

  const starTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    return createStarTexture();
  }, []);

  // Each star has a base angle (t) and a speed — they flow along the curve
  const starData = useMemo(() => {
    const baseT = new Float32Array(STAR_COUNT);
    const speeds = new Float32Array(STAR_COUNT);
    const offsets = new Float32Array(STAR_COUNT * 3); // spread offsets
    const col = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i++) {
      baseT[i] = Math.random() * Math.PI * 2;
      // Vary speed — some fast, some slow, all same direction
      speeds[i] = 0.04 + Math.random() * 0.08;

      // Spread from the curve center — tighter = denser arms
      const spread = 0.05 + Math.random() * 0.2;
      offsets[i * 3] = (Math.random() - 0.5) * spread;
      offsets[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.3;
      offsets[i * 3 + 2] = (Math.random() - 0.5) * spread;

      // Colors
      const i3 = i * 3;
      const roll = Math.random();
      const brightness = 0.7 + Math.random() * 0.3;
      if (roll < 0.35) {
        col[i3] = 0.9 * brightness; col[i3 + 1] = 0.95 * brightness; col[i3 + 2] = 1.0 * brightness;
      } else if (roll < 0.5) {
        col[i3] = 1.0 * brightness; col[i3 + 1] = 0.92 * brightness; col[i3 + 2] = 0.4 * brightness;
      } else if (roll < 0.65) {
        col[i3] = 0.75 * brightness; col[i3 + 1] = 0.3 * brightness; col[i3 + 2] = 1.0 * brightness;
      } else if (roll < 0.78) {
        col[i3] = 0.3 * brightness; col[i3 + 1] = 0.65 * brightness; col[i3 + 2] = 1.0 * brightness;
      } else if (roll < 0.9) {
        col[i3] = 1.0 * brightness; col[i3 + 1] = 0.55 * brightness; col[i3 + 2] = 0.15 * brightness;
      } else {
        col[i3] = 1.0; col[i3 + 1] = 1.0; col[i3 + 2] = 1.0;
      }
    }
    return { baseT, speeds, offsets, colors: col };
  }, []);

  const dustData = useMemo(() => {
    const baseT = new Float32Array(DUST_COUNT);
    const speeds = new Float32Array(DUST_COUNT);
    const offsets = new Float32Array(DUST_COUNT * 3);
    const col = new Float32Array(DUST_COUNT * 3);

    for (let i = 0; i < DUST_COUNT; i++) {
      baseT[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.03 + Math.random() * 0.06;
      offsets[i * 3] = (Math.random() - 0.5) * 0.4;
      offsets[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      offsets[i * 3 + 2] = (Math.random() - 0.5) * 0.4;

      const i3 = i * 3;
      const roll = Math.random();
      if (roll < 0.4) {
        col[i3] = 0.35; col[i3 + 1] = 0.15; col[i3 + 2] = 0.6;
      } else if (roll < 0.7) {
        col[i3] = 0.15; col[i3 + 1] = 0.3; col[i3 + 2] = 0.6;
      } else {
        col[i3] = 0.6; col[i3 + 1] = 0.2; col[i3 + 2] = 0.4;
      }
    }
    return { baseT, speeds, offsets, colors: col };
  }, []);

  // Build geometries
  const starsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(STAR_COUNT * 3);
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(starData.colors, 3));
    return geo;
  }, [starData.colors]);

  const dustGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(DUST_COUNT * 3);
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(dustData.colors, 3));
    return geo;
  }, [dustData.colors]);

  const starsMat = useMemo(() => {
    if (!starTexture) return null;
    return new THREE.PointsMaterial({
      vertexColors: true,
      transparent: true,
      opacity: opacity * 0.9,
      sizeAttenuation: true,
      size: 0.045,
      map: starTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [opacity, starTexture]);

  const dustMat = useMemo(() => {
    if (!starTexture) return null;
    return new THREE.PointsMaterial({
      vertexColors: true,
      transparent: true,
      opacity: opacity * 0.12,
      sizeAttenuation: true,
      size: 0.18,
      map: starTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [opacity, starTexture]);

  // Animate stars flowing along the ∞ path + slow overall rotation
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Slow overall rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.03;
    }

    // Update star positions
    const starPos = starsGeo.attributes.position as THREE.BufferAttribute;
    const sp = starPos.array as Float32Array;
    for (let i = 0; i < STAR_COUNT; i++) {
      const t = starData.baseT[i] + time * starData.speeds[i];
      const { x, z } = lemniscate(t, SCALE);
      const i3 = i * 3;
      sp[i3] = x + starData.offsets[i3];
      sp[i3 + 1] = starData.offsets[i3 + 1];
      sp[i3 + 2] = z + starData.offsets[i3 + 2];
    }
    starPos.needsUpdate = true;

    // Update dust positions
    const dustPos = dustGeo.attributes.position as THREE.BufferAttribute;
    const dp = dustPos.array as Float32Array;
    for (let i = 0; i < DUST_COUNT; i++) {
      const t = dustData.baseT[i] + time * dustData.speeds[i];
      const { x, z } = lemniscate(t, SCALE * 0.85);
      const i3 = i * 3;
      dp[i3] = x + dustData.offsets[i3];
      dp[i3 + 1] = dustData.offsets[i3 + 1];
      dp[i3 + 2] = z + dustData.offsets[i3 + 2];
    }
    dustPos.needsUpdate = true;
  });

  useEffect(() => {
    return () => {
      starsGeo.dispose();
      dustGeo.dispose();
      starsMat?.dispose();
      dustMat?.dispose();
      starTexture?.dispose();
    };
  }, [starsGeo, dustGeo, starsMat, dustMat, starTexture]);

  if (!starsMat || !dustMat) return null;

  return (
    <group ref={groupRef} rotation={[0.6, 0, 0.2]}>
      <points ref={dustRef} geometry={dustGeo} material={dustMat} />
      <points ref={starsRef} geometry={starsGeo} material={starsMat} />
    </group>
  );
}
