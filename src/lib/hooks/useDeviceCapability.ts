"use client";

import { useState, useEffect } from "react";
import { getGPUTier } from "detect-gpu";

export type DeviceTier = "high" | "low";

export function useDeviceCapability(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("low");

  useEffect(() => {
    (async () => {
      try {
        const gpuTier = await getGPUTier();
        // tier >= 1 allows most modern phones (was >= 2 which excluded many mobiles)
        setTier(gpuTier.tier >= 1 ? "high" : "low");
      } catch {
        // If detect-gpu fails (some mobile browsers), check for WebGL support directly
        try {
          const canvas = document.createElement("canvas");
          const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
          setTier(gl ? "high" : "low");
        } catch {
          setTier("low");
        }
      }
    })();
  }, []);

  return tier;
}
