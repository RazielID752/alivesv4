"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { HeroContent } from "@/components/hero/HeroContent";

const HeroCanvas = dynamic(
  () => import("@/components/hero/HeroCanvas").then((mod) => mod.HeroCanvas),
  {
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(56,189,248,0.22),transparent_28%),radial-gradient(circle_at_34%_72%,rgba(236,72,153,0.16),transparent_30%),#020203]" />
    ),
    ssr: false,
  },
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { stiffness: 90, damping: 24 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 90, damping: 24 });
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
      className="relative isolate min-h-screen overflow-hidden bg-black text-white"
      id="inicio"
      onPointerMove={(event) => {
        cursorX.set(event.clientX - 24);
        cursorY.set(event.clientY - 24);
      }}
      ref={sectionRef}
    >
      <div className="absolute inset-0 -z-30 bg-[#020203]" />
      {shouldReduceMotion ? (
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_30%,rgba(56,189,248,0.25),transparent_30%),radial-gradient(circle_at_38%_72%,rgba(236,72,153,0.18),transparent_28%),radial-gradient(circle_at_72%_78%,rgba(250,204,21,0.12),transparent_24%)]" />
      ) : (
        <div className="absolute inset-0 -z-20">
          <HeroCanvas scrollProgress={scrollYProgress} />
        </div>
      )}

      <HeroContent
        ctaOpacity={ctaOpacity}
        ctaY={ctaY}
        introOpacity={introOpacity}
        titleOpacity={titleOpacity}
        titleY={titleY}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-12 w-12 rounded-full border border-white/18 bg-white/8 shadow-[0_0_60px_rgba(56,189,248,0.2)] backdrop-blur-xl lg:block"
        style={{ x: smoothCursorX, y: smoothCursorY }}
      />
    </section>
  );
}
