"use client";

import { Canvas } from "@react-three/fiber";
import { Orb } from "./Orb";
import { Galaxy } from "./Galaxy";

interface SceneProps {
  opacity?: number;
  className?: string;
  mode?: "orb" | "galaxy";
}

export function Scene({ opacity = 1, className = "", mode = "orb" }: SceneProps) {
  const isGalaxy = mode === "galaxy";

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={isGalaxy ? { overflow: "visible" } : undefined}
    >
      <Canvas
        camera={{
          position: isGalaxy ? [0, 1, 3] : [0, 0, 4],
          fov: isGalaxy ? 75 : 50,
        }}
        gl={{
          antialias: true,
          alpha: !isGalaxy,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        dpr={[1, 1.5]}
      >
        {isGalaxy && <color attach="background" args={["#0a0a0a"]} />}
        {isGalaxy ? <Galaxy opacity={opacity} /> : <Orb opacity={opacity} />}
      </Canvas>
    </div>
  );
}
