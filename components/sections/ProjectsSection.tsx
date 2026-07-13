"use client";

import { useMemo, useState } from "react";
import {
  AnimatedItem,
  AnimatedList,
  AnimatedWrapper,
} from "@/components/ui/AnimatedWrapper";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { projectCategories, projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/project";

type ActiveCategory = "Todos" | ProjectCategory;

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("Todos");
  const visibleProjects = useMemo(() => {
    if (activeCategory === "Todos") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="projetos"
      className="relative overflow-hidden bg-zinc-50 py-24 text-zinc-950 lg:py-32"
    >
      <div
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-950/10 to-transparent lg:left-24"
        aria-hidden="true"
      />
      <Container>
        <SectionTitle
          overline="04 - Cases"
          title="Agora entram as provas"
          description="Projetos que mostram essa logica em acao: narrativa, interface, interacao e codigo trabalhando juntos."
        />

        <AnimatedWrapper className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {projectCategories.map((category) => (
            <button
              type="button"
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition",
                activeCategory === category
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-950/10 bg-white text-zinc-500 hover:border-zinc-950/30 hover:text-zinc-950",
              )}
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </AnimatedWrapper>

        <AnimatedList className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <AnimatedItem key={project.id}>
              <ProjectCard index={index} project={project} />
            </AnimatedItem>
          ))}
        </AnimatedList>
      </Container>
    </section>
  );
}
