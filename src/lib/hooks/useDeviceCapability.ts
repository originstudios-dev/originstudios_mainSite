"use client";

import { useState, useEffect } from "react";
import { getGPUTier } from "detect-gpu";

export type DeviceTier = "high" | "low";

export function useDeviceCapability(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("low");

  useEffect(() => {
    (async () => {
      const gpuTier = await getGPUTier();
      setTier(gpuTier.tier >= 2 ? "high" : "low");
    })();
  }, []);

  return tier;
}
