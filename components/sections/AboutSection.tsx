"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  AnimatedItem,
  AnimatedList,
  AnimatedWrapper,
} from "@/components/ui/AnimatedWrapper";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const storyText =
  "Sou Marcos Nathanael. Eu uno UX, UI e front-end para transformar ideias complexas em experiencias digitais claras, fluidas e memoraveis. Meu trabalho e guiar o usuario: primeiro ele entende, depois confia, e entao sabe exatamente qual passo dar.";

const storyBlocks = [
  {
    label: "Contexto",
    title: "Entender antes de impressionar",
    description:
      "ront-End com experiência na construção de aplicações web escaláveis utilizando tecnologias modernas como React, Next.js, Angular e TypeScript",
  },
  {
    label: "Ritmo",
    title: "Uma ideia por vez",
    description:
      "Tenho uma sólida base em UX/UI Design, o que me permite combinar implementação técnica com princípios de design centrado no usuário para criar interfaces intuitivas e de alta performance.",
  },
  {
    label: "03 / Acao",
    title: "Clareza ate a decisao",
    description:
      "A experiencia termina com um caminho evidente para contato, compra, cadastro ou exploracao.",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filledWords, setFilledWords] = useState(0);
  const words = useMemo(() => {
    const counts = new Map<string, number>();

    return storyText.split(" ").map((word) => {
      const normalizedWord = word.toLowerCase().replace(/\W/g, "");
      const count = counts.get(normalizedWord) ?? 0;
      counts.set(normalizedWord, count + 1);

      return {
        id: `${normalizedWord}-${count}`,
        value: word,
      };
    });
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setFilledWords(
      Math.min(words.length, Math.max(0, Math.ceil(latest * words.length))),
    );
  });

  return (
    <section id="sobre" className="bg-zinc-50 text-zinc-950">
      <div ref={sectionRef} className="relative h-[190vh]">
        <div className="sticky top-0 flex min-h-screen items-center py-28">
          <Container>
            <div className="mx-auto max-w-5xl">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-blue-600">
                02 - Sobre mim
              </p>
              <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                {words.map((word, index) => (
                  <span
                    className={cn(
                      "mr-[0.22em] inline-block transition-colors duration-300",
                      index < filledWords ? "text-zinc-950" : "text-zinc-500",
                    )}
                    key={word.id}
                  >
                    {word.value}
                  </span>
                ))}
              </h2>
              <div className="mt-9 h-1 max-w-2xl overflow-hidden rounded-full bg-zinc-200">
                <motion.span
                  className="block h-full origin-left rounded-full bg-blue-600"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* <Container className="pb-50 pt-50 lg:pb-32">
        <AnimatedWrapper className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-blue-600">
            Como a historia ganha forma
          </p>
          <h3 className="mt-4 text-balance text-3xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl">
            Depois do texto, entram os blocos que sustentam a experiencia.
          </h3>
        </AnimatedWrapper>

        <AnimatedList className="mt-12 grid gap-4 md:grid-cols-3">
          {storyBlocks.map((block) => (
            <AnimatedItem key={block.label}>
              <article className="min-h-72 rounded-[1.5rem] border border-zinc-950/10 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600">
                  {block.label}
                </p>
                <h4 className="mt-10 text-2xl font-semibold tracking-[-0.04em]">
                  {block.title}
                </h4>
                <p className="mt-4 text-sm leading-7 text-zinc-600">
                  {block.description}
                </p>
              </article>
            </AnimatedItem>
          ))}
        </AnimatedList>
      </Container> */}
    </section>
  );
}
