"use client";

import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

export function useScrollAnimation(target?: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll(
    target ? { target, offset: ["start end", "end start"] } : undefined,
  );

  const slowY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-36, 36],
  );
  const fastY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-80, 80],
  );
  const subtleScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [0.96, 1.04],
  );

  return {
    fastY,
    slowY,
    subtleScale,
  };
}
