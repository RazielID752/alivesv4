"use client";

import Image from "next/image";
import { useState } from "react";
import Logo from "@/app/assets/logo-marcos.svg";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Abertura", href: "#inicio" },
  { label: "Origem", href: "#sobre" },
  { label: "Cases", href: "#projetos" },
  { label: "Ferramentas", href: "#servicos" },
  { label: "Metodo", href: "#processo" },
  { label: "Convite", href: "#contato" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-zinc-950/55 px-4 py-3 text-white shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <a
          className="flex items-center gap-3 text-sm font-semibold tracking-[-0.02em]"
          href="#inicio"
          aria-label="Ir para o inicio"
        >
          <Image src={Logo} alt="Logo" width={92} height={92} />
        </a>

        <nav
          className="hidden items-center gap-8 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-zinc-400 lg:flex"
          aria-label="Navegacao principal"
        >
          {navigation.map((item) => (
            <a
              className="transition hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contato" variant="secondary">
            Comecar projeto
          </Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white lg:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {isOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      <div
        className={cn(
          "mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950/90 text-white shadow-2xl backdrop-blur-2xl transition-all duration-300 lg:hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="grid gap-1 p-3" aria-label="Navegacao mobile">
          {navigation.map((item) => (
            <a
              className="rounded-2xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button className="mt-2" href="#contato" variant="primary">
            Comecar projeto
          </Button>
        </nav>
      </div>
    </header>
  );
}
