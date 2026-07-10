"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "inicio", label: "Início", number: "01" },
  { id: "sobre", label: "Sobre", number: "02" },
  { id: "galeria", label: "Galeria", number: "03" },
  { id: "projetos", label: "Projetos", number: "04" },
  { id: "contato", label: "Contato", number: "05" },
];

export function PageIndicator() {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    let animationFrame = 0;
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateActiveSection = () => {
      if (sectionElements.length === 0) {
        return;
      }

      const activationLine = window.innerHeight / 2;
      const currentSection = sectionElements.find((section) => {
        const rect = section.getBoundingClientRect();

        return rect.top <= activationLine && rect.bottom >= activationLine;
      });

      if (currentSection) {
        setActiveId(currentSection.id);
      }
    };

    const requestUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <aside
      aria-label="Indicador de páginas"
      className="pointer-events-none fixed right-[7vw] top-1/2 z-40 hidden -translate-y-1/2 mix-blend-difference md:block"
    >
      <nav className="flex flex-col items-center" aria-label="Seções da página">
        {sections.map((section, index) => {
          const isActive = section.id === activeId;
          const isFirst = index === 0;
          const isLast = index === sections.length - 1;

          return (
            <a
              aria-label={`Ir para ${section.label}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "pointer-events-auto relative flex h-5 w-10 items-center justify-center font-mono text-[0.65rem] font-medium text-white transition-[margin,transform,opacity] duration-500 ease-in-out",
                isActive
                  ? "my-24 scale-[3] opacity-100"
                  : "my-2 scale-100 opacity-55 hover:opacity-100",
              )}
              href={`#${section.id}`}
              key={section.id}
            >
              {!isFirst ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-1/2 top-[-1.50rem] h-5 w-px -translate-x-1/2 origin-bottom bg-white transition-transform duration-500 ease-in-out",
                    isActive ? "scale-y-100" : "scale-y-0",
                  )}
                />
              ) : null}
              <span>{section.number}</span>
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-[-1.50rem] left-1/2 h-5 w-px -translate-x-1/2 origin-top bg-white transition-transform duration-500 ease-in-out",
                    isActive ? "scale-y-100" : "scale-y-0",
                  )}
                />
              ) : null}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
