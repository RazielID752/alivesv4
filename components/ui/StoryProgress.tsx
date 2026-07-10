"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const chapters = [
  { id: "inicio", label: "Abertura", number: "01" },
  { id: "sobre", label: "Origem", number: "02" },
  { id: "projetos", label: "Cases", number: "03" },
  { id: "servicos", label: "Ferramentas", number: "04" },
  { id: "processo", label: "Metodo", number: "05" },
  { id: "contato", label: "Convite", number: "06" },
];

export function StoryProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <aside
      aria-label="Progresso da historia"
      className="pointer-events-none fixed bottom-4 left-4 right-4 z-40 hidden lg:bottom-auto lg:left-6 lg:right-auto lg:top-1/2 lg:block lg:-translate-y-1/2"
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-zinc-950/60 px-3 py-2 text-white shadow-[0_20px_80px_rgba(0,0,0,0.26)] backdrop-blur-2xl lg:flex-col lg:rounded-[1.75rem] lg:p-3">
        <div className="relative hidden h-28 w-px overflow-hidden rounded-full bg-white/15 lg:block">
          <motion.span
            className="absolute inset-x-0 top-0 block origin-top bg-blue-300"
            style={{ scaleY }}
          />
        </div>
        <nav className="flex gap-1 lg:flex-col" aria-label="Capitulos">
          {chapters.map((chapter) => (
            <a
              className={cn(
                "group grid h-10 w-10 place-items-center rounded-full border border-white/10 text-[0.65rem] font-bold text-zinc-400 transition hover:border-blue-300/60 hover:bg-white/10 hover:text-white",
              )}
              href={`#${chapter.id}`}
              key={chapter.id}
              title={chapter.label}
            >
              {chapter.number}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
