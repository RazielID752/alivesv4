"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Projetos", href: "#projetos" },
  { label: "Experiência", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function HeroHeader() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 80);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 py-5 sm:px-8 lg:px-12">
      <div
        className={cn(
          "mx-auto flex max-w-[90rem] items-center justify-between rounded-full border px-4 py-3 text-white transition duration-500",
          hasScrolled
            ? "border-white/10 bg-black/48 shadow-[0_18px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          aria-label="Ir para o início"
          className="text-sm font-semibold tracking-[-0.02em] text-white"
          href="#inicio"
        >
          Marcos N.
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/55 lg:flex"
        >
          {navigation.map((item) => (
            <a
              className="group relative transition hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          className="hidden rounded-full border border-white/12 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/30 hover:bg-white/8 hover:text-white sm:inline-flex"
          href="#contato"
        >
          Contato
        </a>
      </div>
    </header>
  );
}
