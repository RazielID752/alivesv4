"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FractalGlassHero } from "@/components/hero/FractalGlassHero";
import { HeroContent } from "@/components/hero/HeroContent";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const introOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0.55]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.68], [1, 0.42]);

  return (
    <section
      className="relative isolate min-h-screen overflow-hidden bg-[#010318] text-white"
      id="inicio"
      ref={sectionRef}
    >
      <FractalGlassHero />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(1,3,24,0.08),rgba(1,3,24,0.28)_46%,rgba(1,3,24,0.82))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(1,3,24,0.76)_0%,rgba(1,3,24,0.34)_42%,rgba(1,3,24,0.08)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-black/30 to-transparent"
      />

      <HeroContent
        ctaOpacity={ctaOpacity}
        ctaY={ctaY}
        introOpacity={introOpacity}
        titleOpacity={titleOpacity}
        titleY={titleY}
      />
    </section>
  );
}
