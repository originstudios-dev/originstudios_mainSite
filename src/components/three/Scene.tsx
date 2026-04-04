"use client";

import { Canvas } from "@react-three/fiber";
import { Orb } from "./Orb";

interface SceneProps {
  opacity?: number;
  className?: string;
}

export function Scene({ opacity = 1, className = "" }: SceneProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
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
