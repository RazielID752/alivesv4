"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";

const codeLines = [
  "const experience = {",
  '  ui: "clear",',
  '  motion: "purposeful",',
  "  accessible: true,",
  "  responsive: true,",
  "};",
  "",
  "return <Product {...experience} />;",
] as const;

const capabilities = [
  {
    description: "Arquitetura pensada para evoluir sem virar obstáculo.",
    label: "Arquitetura componentizada",
  },
  {
    description: "Movimento que orienta a atenção e explica a interface.",
    label: "Motion com propósito",
  },
  {
    description: "Experiências rápidas, responsivas e inclusivas por padrão.",
    label: "Qualidade de produção",
  },
] as const;

const stack = ["React", "Next.js", "Angular", "TypeScript", "GSAP"] as const;

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage) {
      return;
    }

    let context: { revert: () => void } | undefined;
    let media:
      | {
          add: (
            query: string,
            callback: () => (() => void) | undefined,
          ) => unknown;
          revert: () => void;
        }
      | undefined;
    let isMounted = true;

    const setupAnimation = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!isMounted) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        media = gsap.matchMedia();
        media.add(
          "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          () => {
            const select = <T extends HTMLElement>(selector: string) =>
              section.querySelector<T>(selector);
            const intro = select<HTMLElement>("[data-expertise-scene='intro']");
            const structure = select<HTMLElement>(
              "[data-expertise-scene='structure']",
            );
            const product = select<HTMLElement>(
              "[data-expertise-scene='product']",
            );
            const finale = select<HTMLElement>(
              "[data-expertise-scene='finale']",
            );
            const frame = select<HTMLElement>("[data-expertise-frame]");
            const codePanel = select<HTMLElement>("[data-expertise-code]");
            const previewPanel = select<HTMLElement>(
              "[data-expertise-preview]",
            );
            const codeRows = gsap.utils.toArray<HTMLElement>(
              "[data-expertise-code-row]",
              section,
            );
            const previewItems = gsap.utils.toArray<HTMLElement>(
              "[data-expertise-preview-item]",
              section,
            );
            const finalWords = gsap.utils.toArray<HTMLElement>(
              "[data-expertise-final-word]",
              section,
            );
            const finalChips = gsap.utils.toArray<HTMLElement>(
              "[data-expertise-final-chip]",
              section,
            );

            if (
              !intro ||
              !structure ||
              !product ||
              !finale ||
              !frame ||
              !codePanel ||
              !previewPanel
            ) {
              return;
            }

            gsap.set(intro, { autoAlpha: 1, y: 0 });
            gsap.set([structure, product, finale], { autoAlpha: 0 });

            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=360%",

                pin: section,
                pinSpacing: true,

                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            timeline
              .to(
                intro,
                {
                  autoAlpha: 0,
                  duration: 0.55,
                  ease: "power2.in",
                  y: -70,
                },
                0.8,
              )
              .fromTo(
                structure,
                { autoAlpha: 0, y: 48 },
                {
                  autoAlpha: 1,
                  duration: 0.7,
                  ease: "power3.out",
                  y: 0,
                },
                1.45,
              )
              .fromTo(
                frame,
                { autoAlpha: 0, rotateX: 8, scale: 0.84, y: 140 },
                {
                  autoAlpha: 1,
                  duration: 1.4,
                  ease: "power3.out",
                  rotateX: 0,
                  scale: 1,
                  y: 0,
                },
                1.5,
              )
              .fromTo(
                codeRows,
                { autoAlpha: 0, scaleX: 0.4, x: -14 },
                {
                  autoAlpha: 1,
                  duration: 0.55,
                  ease: "power2.out",
                  scaleX: 1,
                  stagger: 0.06,
                  x: 0,
                },
                2.1,
              )
              .to(
                structure,
                {
                  autoAlpha: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  y: -42,
                },
                3.45,
              )
              .fromTo(
                product,
                { autoAlpha: 0, y: 48 },
                {
                  autoAlpha: 1,
                  duration: 0.7,
                  ease: "power3.out",
                  y: 0,
                },
                4.05,
              )
              .to(
                codePanel,
                {
                  autoAlpha: 0,
                  duration: 1.35,
                  ease: "power2.inOut",
                  xPercent: -115,
                },
                4.15,
              )
              .to(
                previewPanel,
                {
                  duration: 1.35,
                  ease: "power2.inOut",
                  left: "2%",
                  width: "96%",
                },
                4.15,
              )
              .fromTo(
                previewItems,
                { autoAlpha: 0.35, y: 24 },
                {
                  autoAlpha: 1,
                  duration: 0.7,
                  ease: "power2.out",
                  stagger: 0.08,
                  y: 0,
                },
                4.9,
              )
              .to(
                frame,
                {
                  duration: 1,
                  ease: "power2.inOut",
                  rotateY: -2,
                  scale: 1.035,
                },
                4.85,
              )
              .to(
                product,
                {
                  autoAlpha: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  y: -42,
                },
                6.15,
              )
              .to(
                frame,
                {
                  autoAlpha: 0,
                  duration: 0.9,
                  ease: "power2.in",
                  scale: 0.86,
                  y: -120,
                },
                6.2,
              )
              .fromTo(
                finale,
                { autoAlpha: 0, y: 56 },
                {
                  autoAlpha: 1,
                  duration: 0.75,
                  ease: "power3.out",
                  y: 0,
                },
                6.9,
              )
              .fromTo(
                finalWords,
                { yPercent: 115 },
                {
                  duration: 0.8,
                  ease: "power3.out",
                  stagger: 0.08,
                  yPercent: 0,
                },
                7,
              )
              .fromTo(
                finalChips,
                { autoAlpha: 0, scale: 0.86, y: 20 },
                {
                  autoAlpha: 1,
                  duration: 0.55,
                  ease: "back.out(1.7)",
                  scale: 1,
                  stagger: 0.06,
                  y: 0,
                },
                7.65,
              )
              .to({}, { duration: 1.1 });

            return () => {
              timeline.scrollTrigger?.kill();
              timeline.kill();
            };
          },
        );
        media.add(
          "(min-width: 1024px) and (prefers-reduced-motion: reduce)",
          () => {
            const intro = section.querySelector<HTMLElement>(
              "[data-expertise-scene='intro']",
            );
            const finale = section.querySelector<HTMLElement>(
              "[data-expertise-scene='finale']",
            );

            if (!intro || !finale) {
              return;
            }

            gsap.set(intro, { autoAlpha: 0 });
            gsap.set(finale, { autoAlpha: 1, y: 0 });

            return () => {
              gsap.set([intro, finale], { clearProps: "all" });
            };
          },
        );

        document.fonts.ready.then(() => {
          if (!isMounted) return;

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (isMounted) {
                ScrollTrigger.refresh();
              }
            });
          });
        });
      }, section);
    };

    setupAnimation();

    return () => {
      isMounted = false;
      media?.revert();
      context?.revert();
    };
  }, []);

  return (
    <section
      className="relative bg-[#050507] text-white"
      id="comeco"
      ref={sectionRef}
    >
      <div
        className="relative hidden min-h-svh overflow-hidden lg:block"
        ref={stageRef}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(59,130,246,0.14),transparent_34%),radial-gradient(circle_at_15%_90%,rgba(139,92,246,0.1),transparent_30%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:72px_72px]"
        />

        <div
          className="absolute inset-0 z-10 flex items-center"
          data-expertise-scene="intro"
        >
          <Container>
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-blue-300">
              Role para executar
            </p>
            <h2 className="max-w-6xl text-balance text-6xl font-semibold leading-[0.88] tracking-[-0.07em] lg:text-[7.5rem] xl:text-[9rem]">
              Código é só
              <span className="block bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                o começo.
              </span>
            </h2>
            <p className="mt-10 max-w-lg text-lg leading-8 text-zinc-400">
              A diferença aparece quando engenharia, experiência e movimento
              começam a trabalhar como um único sistema.
            </p>
          </Container>
        </div>

        <div
          className="invisible absolute left-8 top-[18%] z-30 w-[29%] opacity-0 lg:left-[max(2.5rem,calc((100vw_-_1280px)/2_+_2.5rem))]"
          data-expertise-scene="structure"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-300">
            01 / Estrutura
          </p>
          <h3 className="mt-5 text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-6xl">
            Antes do pixel, existe engenharia.
          </h3>
          <p className="mt-6 max-w-md text-base leading-7 text-zinc-400">
            Componentes, estado, acessibilidade e performance pensados para o
            produto crescer sem perder qualidade.
          </p>
        </div>

        <div
          className="invisible absolute left-8 top-[18%] z-30 w-[29%] opacity-0 lg:left-[max(2.5rem,calc((100vw_-_1280px)/2_+_2.5rem))]"
          data-expertise-scene="product"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">
            02 / Experiência
          </p>
          <h3 className="mt-5 text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-6xl">
            Quando funciona, a tecnologia desaparece.
          </h3>
          <p className="mt-6 max-w-md text-base leading-7 text-zinc-400">
            A interface assume o protagonismo: responde, orienta e transforma
            complexidade em uma experiência natural.
          </p>
        </div>

        <div
          className="invisible absolute right-8 top-[27%] z-20 h-[min(45vh,27rem)] w-[44vw] max-w-[614px] origin-center rounded-2xl border border-white/6 bg-[#111114]/40 backdrop-blur-2xl p-1.5 opacity-0 shadow-[0_40px_140px_rgba(0,0,0,0.58)] backdrop-blur-2xl [transform-style:preserve-3d] lg:right-[max(2.5rem,calc((100vw_-_1280px)/2_+_2.5rem))]"
          data-expertise-frame
        >
          <div className="flex h-9 items-center justify-between px-3.5">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c940]" />
            </div>
            <span className="font-mono text-[0.54rem] tracking-[0.16em] text-zinc-500">
              Experience.tsx
            </span>
          </div>

          <div className="relative h-[calc(100%-2.25rem)] overflow-hidden rounded-[1.25rem] border border-white/8 bg-[#08080b]">
            <div
              className="absolute bottom-[2%] left-[1.5%] top-[2%] w-[41%] overflow-hidden rounded-[1rem] border border-white/8 bg-[#0c0c10] p-4 shadow-2xl"
              data-expertise-code
            >
              <div className="mb-4 flex items-center justify-between border-white/8 border-b pb-3">
                <span className="font-mono text-[0.56rem] text-zinc-500">
                  Experience.tsx
                </span>
                <span className="font-mono text-[0.54rem] text-blue-300">
                  TSX
                </span>
              </div>
              <code className="block font-mono text-[clamp(0.55rem,0.67vw,0.72rem)] leading-[1.65] text-zinc-300">
                {codeLines.map((line, index) => (
                  <span
                    className="block origin-left whitespace-pre"
                    data-expertise-code-row
                    key={`${index}-${line}`}
                  >
                    <span className="mr-2 inline-block w-3 select-none text-right text-zinc-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {line || " "}
                  </span>
                ))}
              </code>
            </div>

            <div
              className="absolute bottom-[2%] backdrop-blur-2xl left-[44%] top-[2%] w-[54.5%] overflow-hidden rounded-[1rem] border border-black/5 bg-[#f5f5f7] p-5 text-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
              data-expertise-preview
            >
              <div
                className="flex items-center justify-between"
                data-expertise-preview-item
              >
                <span className="text-[0.56rem] font-bold uppercase tracking-[0.18em] text-blue-600">
                  Build overview
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Ready
                </span>
              </div>

              <div className="mt-[9%]" data-expertise-preview-item>
                <p className="max-w-lg text-balance text-[clamp(1.2rem,2vw,2.5rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
                  Clareza em cada camada.
                </p>
                <p className="mt-3 hidden max-w-sm text-[clamp(0.66rem,0.82vw,0.82rem)] leading-5 text-zinc-600 xl:block">
                  Uma interface simples para quem usa e sólida para quem mantém.
                </p>
              </div>

              <div className="absolute inset-x-5 bottom-4 border-zinc-950/10 border-t">
                {capabilities.map((item, index) => (
                  <div
                    className="grid grid-cols-[1.5rem_1fr_auto] items-center gap-2 border-zinc-950/8 border-b py-2 last:border-b-0"
                    data-expertise-preview-item
                    key={item.label}
                  >
                    <span className="font-mono text-[0.52rem] text-zinc-400">
                      0{index + 1}
                    </span>
                    <span className="truncate text-[clamp(0.66rem,0.8vw,0.78rem)] font-medium tracking-[-0.01em]">
                      {item.label}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="invisible absolute inset-0 z-30 flex items-center opacity-0"
          data-expertise-scene="finale"
        >
          <Container className="text-center">
            <p className="mb-7 font-mono text-xs uppercase tracking-[0.22em] text-blue-300">
              05 / Entrega
            </p>
            <h3 className="mx-auto max-w-7xl text-balance text-6xl font-semibold leading-[0.88] tracking-[-0.07em] lg:text-[7.2rem] xl:text-[8.5rem]">
              <span className="block overflow-hidden">
                <span className="block" data-expertise-final-word>
                  Design chama
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent"
                  data-expertise-final-word
                >
                  atenção.
                </span>
              </span>
              <span className="mt-2 block overflow-hidden">
                <span className="block" data-expertise-final-word>
                  Código faz permanecer.
                </span>
              </span>
            </h3>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-zinc-400 lg:text-lg">
              Eu uno os dois para criar produtos que seu time consegue lançar,
              medir e evoluir.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-2">
              {stack.map((item) => (
                <span
                  className="rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-zinc-300 backdrop-blur"
                  data-expertise-final-chip
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-10 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-zinc-500">
              Próximo capítulo · vamos construir juntos ↓
            </p>
          </Container>
        </div>
      </div>

      <Container className="py-24 lg:hidden">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-300">
          05 / Engenharia em movimento
        </p>
        <h2 className="mt-7 text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.06em]">
          Código é só o começo.
        </h2>
        <p className="mt-6 text-base leading-7 text-zinc-400">
          Eu conecto arquitetura, interface e movimento para transformar ideias
          em produtos digitais prontos para crescer.
        </p>

        <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0c0c10] p-5 shadow-2xl">
          <div className="mb-5 flex items-center justify-between border-white/8 border-b pb-4">
            <span className="font-mono text-[0.6rem] text-zinc-400">
              EXPERIENCE.TSX
            </span>
            <span className="font-mono text-[0.6rem] text-emerald-300">
              RUNNING
            </span>
          </div>
          <code className="block overflow-x-auto font-mono text-[0.66rem] leading-6 text-zinc-300">
            {codeLines.slice(0, 10).map((line, index) => (
              <span className="block whitespace-pre" key={`${index}-${line}`}>
                <span className="mr-3 inline-block w-3 select-none text-zinc-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {line || " "}
              </span>
            ))}
          </code>
        </div>

        <div className="mt-4 rounded-[1.5rem] bg-[#f5f5f7] p-6 text-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between">
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-blue-600">
              Build overview
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Ready
            </span>
          </div>
          <h3 className="mt-12 text-balance text-4xl font-semibold leading-[0.94] tracking-[-0.05em]">
            Clareza em cada camada.
          </h3>
          <p className="mt-4 text-sm leading-6 text-zinc-600">
            Uma interface simples para quem usa e sólida para quem mantém.
          </p>
          <div className="mt-12 border-zinc-950/10 border-t">
            {capabilities.map((item, index) => (
              <div
                className="grid grid-cols-[2rem_1fr_auto] items-start gap-2 border-zinc-950/10 border-b py-4 last:border-b-0"
                key={item.label}
              >
                <span className="pt-0.5 font-mono text-[0.6rem] text-zinc-600">
                  0{index + 1}
                </span>
                <div>
                  <h4 className="text-sm font-semibold">{item.label}</h4>
                  <p className="mt-1 text-xs leading-5 text-zinc-600">
                    {item.description}
                  </p>
                </div>
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-300">
            03 / Entrega
          </p>
          <h3 className="mt-6 text-balance text-5xl font-semibold leading-[0.92] tracking-[-0.06em]">
            Design chama atenção. Código faz permanecer.
          </h3>
          <p className="mt-6 text-sm leading-7 text-zinc-400">
            Produtos que seu time consegue lançar, medir e evoluir.
          </p>
        </div>
      </Container>
    </section>
  );
}
