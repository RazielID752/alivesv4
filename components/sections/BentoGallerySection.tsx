"use client";

import { useEffect, useRef } from "react";
import image6 from "@/app/assets/eldorado-brasil.png";
import image2 from "@/app/assets/imac-perdigao.png";
import image8 from "@/app/assets/iPad-Pro-nestle.png";
import image7 from "@/app/assets/linkedin-studio.png";
import image9 from "@/app/assets/macbook-codezone.png";
import image10 from "@/app/assets/novanoite.png";
import image1 from "@/app/assets/subway-ipad.png";
import image5 from "@/app/assets/tigre.png";

const galleryItems = [
  {
    alt: "Subway® - Subway da quebrada.",
    src: image1.src,
  },
  {
    alt: "Tigre® - Portal Tigre.",
    src: image5.src,
  },
  {
    alt: "Perdigão® - Promoção chester.",
    src: image2.src,
  },
  {
    alt: "CodeZone® - Website comercial.",
    src: image9.src,
  },
  {
    alt: "Nestlé® - Nancare novo produto.",
    src: image8.src,
  },
  {
    alt: "NovoNoite® - Campanha publicitária.",
    src: image10.src,
  },
  {
    alt: "LinkedIn® - Studio astros.",
    src: image7.src,
  },
  {
    alt: "Eldorado® - Brasil.",
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
      id="experiencia"
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
            03 / Experiência
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            Tecnologia, design e experiências que geram impacto
          </h3>
          <div className="mt-6 space-y-4 leading-relaxed text-zinc-300">
            <p>
              Sou Desenvolvedor Front-End com experiência na criação de
              aplicações web modernas, escaláveis e de alta performance,
              utilizando tecnologias como React, Next.js, Angular e TypeScript.
            </p>

            <p>
              Minha experiência em UX/UI Design me permite unir desenvolvimento
              e design centrado no usuário. Dessa forma, transformo necessidades
              de negócio em interfaces intuitivas, acessíveis e visualmente
              consistentes.
            </p>

            <p>
              Ao longo da minha trajetória, participei de projetos para marcas
              como Perdigão®, Nestlé®, Subway®, Tigre®, LinkedIn®, Eldorado
              Brasil®, Codezone® e Novanoite®, contribuindo para a criação de
              produtos e experiências digitais voltados a diferentes públicos e
              objetivos.
            </p>

            <p>
              Também possuo experiência com pesquisa de UX, testes de
              usabilidade, prototipação, criação de interfaces e desenvolvimento
              de design systems, acompanhando o produto desde a concepção até a
              implementação.
            </p>

            <p>
              Anteriormente, atuei como Instrutor de Front-End no SENAI/FIRJAN,
              compartilhando conhecimentos sobre HTML, CSS, JavaScript, lógica
              de programação e desenvolvimento web com novos profissionais da
              área.
            </p>

            <p>
              Atualmente, trabalho com Angular, React e Next.js no
              desenvolvimento de soluções focadas em performance,
              escalabilidade, qualidade de código e facilidade de manutenção.
            </p>

            <p>
              Minha principal stack inclui React, Next.js, Angular, TypeScript,
              JavaScript, HTML, CSS, Tailwind CSS, APIs REST, NgRx, React Query
              e RxJS.
            </p>

            <p>
              Estou sempre em busca de novos desafios e oportunidades para
              contribuir com produtos que facilitem a vida das pessoas e
              proporcionem experiências digitais relevantes.
            </p>

            <p className="mt-6 text-[10px] font-semibold text-zinc-400">
              Os direitos autorais e a propriedade intelectual dos projetos
              apresentados nesta página pertencem aos seus respectivos
              titulares. Os trabalhos são exibidos exclusivamente para
              demonstrar minha participação, experiência profissional e
              habilidades aplicadas em cada projeto. A utilização de imagens,
              textos, marcas e demais elementos não representa associação,
              endosso ou parceria com seus proprietários.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              aria-label="Conversar no WhatsApp"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white decoration-transparent underline-offset-4 transition hover:underline hover:decoration-current focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-zinc-950"
              href="https://wa.me/5521974131359"
              rel="noreferrer noopener"
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
              href="https://www.linkedin.com/in/marcos-nathanael"
              rel="noreferrer noopener"
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
