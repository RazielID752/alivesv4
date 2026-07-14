"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const renderY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const sceneRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative isolate min-h-screen overflow-hidden bg-[#050507] pt-32 text-white sm:pt-36"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_38%,rgba(37,99,235,0.28),transparent_24%),radial-gradient(circle_at_78%_72%,rgba(245,158,11,0.16),transparent_18%),linear-gradient(180deg,#050507,#090a0d_58%,#101114)]" />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-zinc-50 to-transparent"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: glowY }}
        className="absolute right-[7vw] top-24 -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-600/18 blur-3xl"
        aria-hidden="true"
      />
      <Container className="grid min-h-[calc(100vh-8rem)] items-center gap-12 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-300">
            Capitulo 01 / Antes da interface
          </p>
          <h1 className="mt-7 text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Experiencias digitais que conduzem, respondem e parecem{" "}
            <span className="font-serif italic tracking-[-0.04em] text-white/90">
              inevitáveis.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-300">
            Eu desenho e desenvolvo sites, produtos e interfaces como narrativas
            interativas: cada scroll revela uma decisao, cada clique aproxima o
            usuario do proximo passo.
          </p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {["Contexto", "Tensao", "Transformacao"].map((item, index) => (
              <div
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
                key={item}
              >
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-blue-200">
                  0{index + 1}
                </span>
                <p className="mt-3 text-sm font-medium text-white">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#sobre">Começar a história</Button>
            <Button href="#sobre">Role para explorar</Button>
          </div>
        </motion.div>

        <motion.div
          style={{ y: renderY, rotate: sceneRotate }}
          className="relative hidden min-h-[38rem] lg:block"
          aria-hidden="true"
        >
          <div className="absolute left-16 top-8 h-[31rem] w-[27rem] rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_35px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </div>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/45">
                Story Mode
              </span>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-white p-5 text-zinc-950">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
                  Cena ativa
                </p>
                <h2 className="mt-5 text-4xl font-semibold leading-none tracking-[-0.05em]">
                  Usuario entende antes de decidir.
                </h2>
              </div>
              <div className="grid grid-cols-[0.8fr_1.2fr] gap-4">
                <div className="rounded-3xl border border-white/10 bg-blue-400/18 p-5">
                  <span className="block h-16 rounded-2xl bg-white/20" />
                  <span className="mt-4 block h-2 rounded-full bg-white/35" />
                  <span className="mt-2 block h-2 w-2/3 rounded-full bg-white/20" />
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                  <span className="block h-3 w-24 rounded-full bg-amber-200/70" />
                  <span className="mt-5 block h-20 rounded-2xl bg-white/15" />
                  <span className="mt-4 block h-10 rounded-full bg-white text-center text-xs font-bold uppercase leading-10 tracking-[0.16em] text-zinc-950">
                    Avancar
                  </span>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  <span>Clareza</span>
                  <span>Emocao</span>
                  <span>Acao</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full w-4/5 rounded-full bg-blue-300" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-2 top-28 h-72 w-44 rounded-[2rem] border border-white/10 bg-zinc-950/70 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur">
            <div className="mx-auto h-1 w-12 rounded-full bg-white/25" />
            <div className="mt-5 rounded-2xl bg-white p-4">
              <span className="block h-20 rounded-xl bg-zinc-950" />
              <span className="mt-4 block h-2 rounded-full bg-zinc-950/20" />
              <span className="mt-2 block h-2 w-3/4 rounded-full bg-zinc-950/10" />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
