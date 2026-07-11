"use client";

import { useEffect, useRef } from "react";
import image1 from "@/app/assets/subway-ipad.png";
import image2 from "@/app/assets/imac-perdigao.png";
import image5 from "@/app/assets/tigre.png";
import image6 from "@/app/assets/eldorado-brasil.png";
import image7 from "@/app/assets/linkedin-studio.png";
import image8 from "@/app/assets/iPad-Pro-nestle.png";
import image9 from "@/app/assets/macbook-codezone.png";
import image10 from "@/app/assets/novanoite.png";

const galleryItems = [
  {
    alt: "Padrao visual abstrato em tons frios",
    src: image1.src,
  },
  {
    alt: "Retrato editorial com luz contrastada",
    src: image5.src,
  },
  {
    alt: "Retrato artistico em composicao vertical",
    src: image2.src,
  },
  {
    alt: "Padrao visual abstrato com textura",
    src: image9.src,
  },
  {
    alt: "Retrato em close com fundo colorido",
    src: image8.src,
  },
  {
    alt: "Retrato editorial com gesto expressivo",
    src: image10.src,
  },
  {
    alt: "Padrao visual abstrato em composicao grafica",
    src: image7.src,
  },
  {
    alt: "Retrato em enquadramento vertical",
    src: image6.src,
  },
];

export function BentoGallerySection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const gallery = galleryRef.current;

    if (!wrap || !gallery) {
      return;
    }

    let context: { revert: () => void } | undefined;
    let removeResizeListener: (() => void) | undefined;
    let isMounted = true;

    const setupGallery = async () => {
      const [{ gsap }, { Flip }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/Flip"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!isMounted) {
        return;
      }

      gsap.registerPlugin(Flip, ScrollTrigger);

      const createTween = () => {
        context?.revert();
        gallery.classList.remove("scrubbed-bento--final");

        context = gsap.context(() => {
          const items = gsap.utils.toArray<HTMLElement>(
            ".scrubbed-bento__item",
            gallery,
          );

          gallery.classList.add("scrubbed-bento--final");
          const state = Flip.getState(items);
          gallery.classList.remove("scrubbed-bento--final");

          const flip = Flip.to(state, {
            ease: "expoScale(1, 5)",
            simple: true,
          });

          gsap
            .timeline({
              scrollTrigger: {
                end: "+=100%",
                pin: wrap,
                scrub: true,
                start: "center center",
                trigger: gallery,
              },
            })
            .add(flip);

          return () => {
            gsap.set(items, { clearProps: "all" });
            gallery.classList.remove("scrubbed-bento--final");
          };
        }, wrap);
      };

      createTween();
      window.addEventListener("resize", createTween);
      removeResizeListener = () => {
        window.removeEventListener("resize", createTween);
      };
    };

    setupGallery();

    return () => {
      isMounted = false;
      removeResizeListener?.();
      context?.revert();
    };
  }, []);

  return (
    <section
      id="galeria"
      className="relative overflow-hidden bg-zinc-950 text-white"
    >
      {/* <Container className="py-20 lg:py-28">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-blue-300">
            Capitulo 03 / Composicao
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-5xl lg:text-7xl">
            Um mosaico que muda de forma com o scroll.
          </h2>
        </div>
      </Container> */}

      <div className="scrubbed-bento-wrap" ref={wrapRef}>
        <ul
          aria-label="Galeria animada de composicoes visuais"
          className="scrubbed-bento"
          ref={galleryRef}
        >
          {galleryItems.map((item) => (
            <li className="scrubbed-bento__item" key={item.src}>
              {/* biome-ignore lint/performance/noImgElement: This section intentionally mirrors the CodePen's external image gallery. */}
              <img alt={item.alt} src={item.src} />
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-zinc-950 pb-24">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Capitulo 04 / Sobre
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            Marcos Nathanael
          </h3>

          <div className="mt-6 space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Desenvolvedor Front-End com experiencia na construcao de
              aplicacoes web escalaveis utilizando tecnologias modernas como
              React, Next.js, Angular e TypeScript.
            </p>
            <p>
              Tenho uma solida base em UX/UI Design, o que me permite combinar
              implementacao tecnica com principios de design centrado no usuario
              para criar interfaces intuitivas e de alta performance.
            </p>
            <p>
              Atualmente trabalho com Angular, React e Next.js para desenvolver
              aplicacoes modernas focadas em performance, escalabilidade e
              manutenibilidade.
            </p>
            <p>
              Anteriormente, atuei como Instrutor de Front-End no SENAI/FIRJAN,
              ensinando conceitos de desenvolvimento web, incluindo HTML, CSS,
              JavaScript e logica de programacao para novos desenvolvedores.
            </p>
            <p>
              Minha experiencia tambem inclui pesquisa de UX, testes de
              usabilidade, design systems e design de interfaces de produtos
              para aplicacoes reais.
            </p>
            <p>
              Stack Tecnologica: React.js, Next.js, Angular, TypeScript /
              JavaScript, HTML / CSS / Tailwind, APIs REST, NgRx / React Query /
              RxJS.
            </p>
            <p>
              Estou sempre em busca de contribuir com produtos que impactem a
              vida das pessoas e melhorem as experiencias digitais.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              aria-label="Conversar no WhatsApp"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white decoration-transparent underline-offset-4 transition hover:underline hover:decoration-current focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-zinc-950"
              href="https://wa.me/5500000000000"
              rel="noreferrer"
              target="_blank"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/25 text-white transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
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
              WhatsApp
            </a>
            <a
              aria-label="Abrir perfil no LinkedIn"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white decoration-transparent underline-offset-4 transition hover:underline hover:decoration-current focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-zinc-950"
              href="https://linkedin.com"
              rel="noreferrer"
              target="_blank"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/25 text-white transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
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
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
