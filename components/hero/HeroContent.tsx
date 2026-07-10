"use client";

import { type MotionValue, motion } from "framer-motion";

type HeroContentProps = Readonly<{
  ctaOpacity: MotionValue<number>;
  ctaY: MotionValue<number>;
  introOpacity: MotionValue<number>;
  titleOpacity: MotionValue<number>;
  titleY: MotionValue<number>;
}>;

export function HeroContent({
  ctaOpacity,
  ctaY,
  introOpacity,
  titleOpacity,
  titleY,
}: HeroContentProps) {
  return (
    <div className="relative z-10 flex min-h-screen max-w-7xl mx-auto flex-col justify-between px-5 pb-5 pt-32 sm:px-8 lg:px-12 lg:pb-14 lg:pt-36">
      <motion.p
        className="max-w-sm text-sm leading-7 text-white/62 sm:text-base"
        style={{ opacity: introOpacity }}
      >
        Portfólio interativo com experiências digitais, interfaces premium e
        desenvolvimento front-end de alta performance.
      </motion.p>

      <div className="ml-auto grid max-w-7xl justify-items-start gap-8 text-left lg:justify-items-end lg:text-right">
        <motion.h1
          className="text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-[7.4rem]"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          Design, Código e Experiências Digitais em Movimento
        </motion.h1>

        <motion.a
          className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-4 pr-6 text-sm font-semibold text-zinc-950 shadow-[0_24px_90px_rgba(255,255,255,0.15)] transition duration-300 hover:scale-[1.035] hover:shadow-[0_30px_110px_rgba(96,165,250,0.24)] focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black"
          href="#projetos"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-zinc-950 text-white transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 12 12 4M6 4h6v6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </span>
          Explorar projetos
        </motion.a>
      </div>
    </div>
  );
}
