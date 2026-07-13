"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { stats } from "@/data/stats";

const featuredStat = {
  value: "1",
  label: "direcao clara",
  eyebrow: "O ponto de partida",
  title: "Todo projeto precisa encontrar seu primeiro eixo.",
  context:
    "Antes dos numeros, existe uma escolha: encontrar a ideia central que guia o projeto inteiro.",
};

const supportingStats = stats.slice(0, 3);

const showStepMarkers = true;

function StepMarker({
  description,
  label,
}: Readonly<{
  description: string;
  label: string;
}>) {
  if (!showStepMarkers) {
    return null;
  }

  return (
    <div className="pointer-events-none mb-4 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-rose-700">
      <span>{label}</span>
      <span className="h-1 w-1 rounded-full bg-rose-500" />
      <span className="normal-case tracking-normal">{description}</span>
    </div>
  );
}

export function ScrollStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isFinalActive, setIsFinalActive] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsFinalActive(latest >= 0.92);
  });

  const leadY = useTransform(
    scrollYProgress,
    [0, 0.24, 0.5, 0.68],
    [0, 0, 344, 604],
  );
  const leadX = useTransform(
    scrollYProgress,
    [0, 0.24, 0.5, 0.68],
    [
      "calc(300% + 3rem)",
      "calc(300% + 3rem)",
      "calc(300% + 3rem)",
      "calc(300% + 3rem)",
    ],
  );
  const leadScale = useTransform(
    scrollYProgress,
    [0, 0.24, 0.5, 0.68],
    [0.96, 1, 1, 1],
  );
  const leadOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.68, 0.88, 1],
    [1, 1, 1, 0, 0],
  );
  const cardsOpacity = useTransform(scrollYProgress, [0.24, 0.46], [0, 1]);
  const cardsY = useTransform(scrollYProgress, [0.24, 0.46], [28, 0]);
  const expandedOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.82, 1],
    [0, 1, 1],
  );
  const expandedY = useTransform(scrollYProgress, [0.58, 0.82], [70, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.58, 0.68, 1], [1, 0, 0]);
  const gridScale = useTransform(scrollYProgress, [0.62, 0.78], [1, 0.94]);
  const contextOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.34, 0.62, 0.76],
    [1, 1, 0, 0, 1],
  );
  const contextY = useTransform(scrollYProgress, [0, 0.34, 0.76], [0, -34, 0]);
  const contextLineScale = useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);

  return (
    <section className="bg-zinc-50 text-zinc-950" ref={sectionRef}>
      <div className="hidden h-[250vh] md:block">
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-24">
          <Container>
            <div className="relative mx-auto max-w-7xl">
              <motion.div
                className="mb-14 grid min-h-72 grid-cols-4 gap-4"
                style={{ opacity: contextOpacity, y: contextY }}
              >
                <div className="col-span-3 self-center">
                  <StepMarker
                    description="texto inicial + card ao lado"
                    label="01 origem"
                  />
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-blue-600">
                    {featuredStat.eyebrow}
                  </p>
                  <h3 className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] lg:text-6xl">
                    {featuredStat.title}
                  </h3>
                  <p className="mt-7 max-w-xl text-base leading-8 text-zinc-600">
                    {featuredStat.context}
                  </p>
                  <div className="mt-8 h-px overflow-hidden bg-zinc-950/10">
                    <motion.span
                      className="block h-full origin-left bg-zinc-950"
                      style={{ scaleX: contextLineScale }}
                    />
                  </div>
                </div>
                <div aria-hidden="true" />
              </motion.div>

              <motion.div
                className="relative"
                style={{ opacity: gridOpacity, scale: gridScale }}
              >
                <StepMarker
                  description="card pequeno encontra os outros 3"
                  label="02 linha"
                />
                <div className="grid min-h-72 grid-cols-4 gap-4">
                  {supportingStats.map((stat, index) => (
                    <motion.article
                      className="rounded-[1.5rem] border border-zinc-950/10 bg-white/80 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur"
                      key={stat.label}
                      style={{ opacity: cardsOpacity, y: cardsY }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <strong className="block text-4xl font-semibold tracking-[-0.05em] text-zinc-950">
                        {stat.value}
                      </strong>
                      <span className="mt-3 block text-sm leading-5 text-zinc-600">
                        {stat.label}
                      </span>
                    </motion.article>
                  ))}
                  <div aria-hidden="true" />
                </div>
              </motion.div>

              <motion.article
                className={`absolute left-0 top-0 z-10 flex min-h-72 w-[calc((100%_-_3rem)/4)] flex-col justify-between rounded-[1.5rem] border border-zinc-950/10 bg-zinc-950 p-6 text-white shadow-[0_34px_110px_rgba(15,23,42,0.26)] ${
                  isFinalActive ? "invisible pointer-events-none" : ""
                }`}
                aria-hidden={isFinalActive}
                style={{
                  opacity: leadOpacity,
                  scale: leadScale,
                  x: leadX,
                  y: leadY,
                }}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-200">
                    {featuredStat.eyebrow}
                  </p>
                  <strong className="mt-8 block text-5xl font-semibold tracking-[-0.06em]">
                    {featuredStat.value}
                  </strong>
                </div>
                <span className="block text-sm leading-5 text-white/72">
                  {featuredStat.label}
                </span>
              </motion.article>

              <motion.div
                className="absolute inset-x-0 top-[25rem] z-30 mx-auto max-w-7xl"
                style={{ opacity: expandedOpacity, y: expandedY }}
              >
                <StepMarker
                  description="card grande deve permanecer ate acabar"
                  label="03 final"
                />
                <article className="flex min-h-80 flex-col justify-between rounded-[1.75rem] border border-zinc-950/10 bg-zinc-950 p-8 text-white shadow-[0_40px_140px_rgba(15,23,42,0.34)] lg:p-12">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200">
                      {featuredStat.eyebrow}
                    </p>
                    <strong className="mt-8 block text-8xl font-semibold tracking-[-0.08em]">
                      {featuredStat.value}
                    </strong>
                  </div>
                  <span className="block text-base leading-6 text-white/64">
                    {featuredStat.label}
                  </span>
                </article>
              </motion.div>
            </div>
          </Container>
        </div>
      </div>

      <Container className="grid gap-4 py-16 md:hidden">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-blue-600">
            {featuredStat.eyebrow}
          </p>
          <h3 className="mt-4 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em]">
            {featuredStat.title}
          </h3>
          <p className="mt-5 text-sm leading-7 text-zinc-600">
            {featuredStat.context}
          </p>
        </div>

        <article className="rounded-[1.5rem] bg-zinc-950 p-6 text-white">
          <strong className="block text-5xl font-semibold tracking-[-0.06em]">
            {featuredStat.value}
          </strong>
          <span className="mt-3 block text-sm text-white/70">
            {featuredStat.label}
          </span>
        </article>
        {supportingStats.map((stat) => (
          <article
            className="rounded-[1.5rem] border border-zinc-950/10 bg-white p-5"
            key={stat.label}
          >
            <strong className="block text-3xl font-semibold tracking-[-0.04em]">
              {stat.value}
            </strong>
            <span className="mt-2 block text-sm text-zinc-600">
              {stat.label}
            </span>
          </article>
        ))}
      </Container>
    </section>
  );
}
