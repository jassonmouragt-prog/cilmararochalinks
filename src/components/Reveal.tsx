"use client";

import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { resolveTheme } from "@/config/theme";

export function Reveal({ children, delay = 0, className }: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const controls = useAnimationControls();
  const { duration, distance } = resolveTheme().motion;
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      controls.set({ opacity: 1, y: 0 });
      return;
    }
    controls.set({ opacity: 0, y: Number.parseFloat(distance) });
    const frame = requestAnimationFrame(() => {
      void controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: Number.parseFloat(duration) / 1000, delay, ease: [0.16, 1, 0.3, 1] },
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [controls, delay, distance, duration]);

  return (
    <motion.div className={className} initial={false} animate={controls}>{children}</motion.div>
  );
}
