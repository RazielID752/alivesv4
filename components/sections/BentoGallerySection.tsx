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
            03 / Galeria
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            Galeria de projetos
          </h3>
          <div className="mt-6 space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Desenvolvedor Front-End com experiência na construção de
              aplicações web escaláveis utilizando tecnologias modernas como
              React, Next.js, Angular e TypeScript.
            </p>
            <p>
              Tenho uma sólida base em UX/UI Design, o que me permite combinar
              implementação técnica com princípios de design centrado no usuário
              para criar interfaces intuitivas e de alta performance.
            </p>
            <p>
              Já criei projetos que impactaram positivamente a vida de usuários
              e empresas, como por exemplo: Perdigão®, Codezone®, Nestlé®,
              Subway®, Tigre®, Novanoite®, LinkedIn®, Eldorado Brasil®.
            </p>
            <p>
              Atualmente trabalho com Angular, React e Next.js para desenvolver
              aplicações modernas focadas em performance, escalabilidade e
              manutenibilidade.
            </p>
            <p>
              Anteriormente, atuei como Instrutor de Front-End no SENAI/FIRJAN,
              ensinando conceitos de desenvolvimento web, incluindo HTML, CSS,
              JavaScript e lógica de programação para novos desenvolvedores.
            </p>
            <p>
              Minha experiência também inclui pesquisa de UX, testes de
              usabilidade, design systems e design de interfaces de produtos
              para aplicações reais.
            </p>
            <p>
              Stack Tecnológica: React.js, Next.js, Angular, TypeScript /
              JavaScript, HTML / CSS / Tailwind, APIs REST, NgRx / React Query /
              RxJS.
            </p>
            <p>
              Estou sempre em busca de contribuir com produtos que impactem a
              vida das pessoas e melhorem as experiências digitais.
            </p>
            <p className="mt-6 text-[10px] font-semibold text-zinc-400">
              Todos os direitos autorais e propriedade intelectual relacionados
              ao projeto apresentado nesta página pertencem exclusivamente as
              respectivas partes. Este trabalho é exibido com o único propósito
              de demonstrar minhas habilidades e experiência profissional
              aplicadas nesses cases de sucesso de design UX. O uso das imagens,
              textos e demais elementos deste projeto não implica em qualquer
              tipo de associação, endosso ou parceria.Todas as marcas
              comerciais, logotipos e nomes de produtos pertencem aos seus
              respectivos proprietários.
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
