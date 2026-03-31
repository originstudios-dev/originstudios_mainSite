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
    []
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
