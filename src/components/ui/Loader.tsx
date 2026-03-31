"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<"dot" | "expand" | "done">("dot");

  useEffect(() => {
    const expandTimer = setTimeout(() => setPhase("expand"), 600);
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
