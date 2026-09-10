"use client";

import { type MotionValue, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

type HeroContentProps = Readonly<{
  ctaOpacity: MotionValue<number>;
  ctaY: MotionValue<number>;
  introOpacity: MotionValue<number>;
  titleOpacity: MotionValue<number>;
  titleY: MotionValue<number>;
}>;

const headline = [
  { id: "onde", text: "Onde", variant: "script" },
  { id: "codigo", text: "código," },
  { id: "design", text: "design e" },
  { id: "experiencia", text: "experiência" },
  { id: "se", text: "se", variant: "script" },
  { id: "encontram", text: "encontram." },
];

export function HeroContent({
  ctaOpacity,
  ctaY,
  introOpacity,
  titleOpacity,
  titleY,
}: HeroContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !rootRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        {
          filter: "blur(18px)",
          opacity: 0,
          rotateX: -18,
          yPercent: 90,
        },
        {
          delay: 0.1,
          duration: 1.05,
          ease: "power4.out",
          filter: "blur(0px)",
          opacity: 1,
          rotateX: 0,
          stagger: 0.09,
          yPercent: 0,
        },
      );

      gsap.fromTo(
        ".hero-proof",
        { opacity: 0, y: 14 },
        {
          delay: 0.68,
          duration: 0.9,
          ease: "power3.out",
          opacity: 1,
          stagger: 0.12,
          y: 0,
        },
      );

      gsap.fromTo(
        ".hero-meta",
        { opacity: 0, y: -10 },
        {
          delay: 0.3,
          duration: 0.8,
          ease: "power3.out",
          opacity: 1,
          stagger: 0.08,
          y: 0,
        },
      );
    }, rootRef);

    return () => context.revert();
  }, [shouldReduceMotion]);

  return (
    <div
      className="relative z-10 mx-auto flex min-h-screen max-w-[92rem] flex-col justify-end px-5 pb-12 pt-[42vh] sm:px-8 sm:pb-14 lg:px-10 lg:pb-16"
      ref={rootRef}
    >
      <motion.div
        className="mt-auto mx-auto max-w-7xl grid w-full items-end gap-7 sm:grid-cols-4"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <motion.p
          className="hero-proof max-w-lg text-base leading-7 text-white/78 sm:col-span-2 sm:order-2 sm:justify-self-end sm:pb-2 sm:text-lg"
          style={{ opacity: introOpacity }}
        >
          Interfaces e experiências digitais sob medida, desenvolvidas para
          comunicar valor, transmitir confiança e transformar boas ideias em
          produtos claros, modernos e performáticos.
        </motion.p>

        <div className="sm:col-span-2 sm:order-1">
          <h1 className="max-w-[12ch] text-balance text-[clamp(2rem,5vw,4.8rem)] font-bold leading-[0.92] text-white">
            {headline.map((word) => (
              <span
                className="-my-[0.08em] inline-block overflow-hidden py-[0.08em] pr-[0.11em]"
                key={word.id}
              >
                <span
                  className="hero-word inline-block"
                  style={
                    word.variant === "outline"
                      ? {
                          WebkitTextFillColor: "transparent",
                          WebkitTextStroke: "1.4px rgba(255,255,255,0.92)",
                        }
                      : word.variant === "script"
                        ? {
                            fontFamily:
                              '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
                            fontStyle: "italic",
                            fontWeight: 100,
                            letterSpacing: "0",
                          }
                        : undefined
                  }
                >
                  {word.text}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          className="sm:col-span-4 sm:order-3 flex flex-col gap-4 sm:flex-row sm:items-center"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <Button href="#projetos">Explorar projetos</Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
