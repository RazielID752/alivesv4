"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Blocks,
  FolderKanban,
  Globe2,
  Layers3,
  LayoutDashboard,
  type LucideIcon,
  Palette,
  PanelsTopLeft,
} from "lucide-react";
import { useState } from "react";
import { AnimatedWrapper } from "@/components/ui/AnimatedWrapper";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { projectCategories, projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/project";

type ActiveCategory = "Todos" | ProjectCategory;

const categoryIcons: Record<ActiveCategory, LucideIcon> = {
  Todos: Layers3,
  "Front-End": Blocks,
  "UX/UI Design": Palette,
  Dashboard: LayoutDashboard,
  "Landing Page": PanelsTopLeft,
  "Sistema Web": Globe2,
  Portfolio: FolderKanban,
};

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("Todos");
  const visibleProjects = projects
    .map((project, index) => ({ project, originalIndex: index }))
    .filter(
      ({ project }) =>
        activeCategory === "Todos" || project.category === activeCategory,
    );

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
          {projectCategories.map((category) => {
            const Icon = categoryIcons[category];

            return (
              <button
                type="button"
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition",
                  activeCategory === category
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-950/10 bg-white text-zinc-500 hover:border-zinc-950/30 hover:text-zinc-950",
                )}
                aria-pressed={activeCategory === category}
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                {category}
              </button>
            );
          })}
        </AnimatedWrapper>

        <p className="sr-only" aria-live="polite">
          {visibleProjects.length}{" "}
          {visibleProjects.length === 1 ? "case" : "cases"}
          {activeCategory === "Todos" ? " exibidos" : ` em ${activeCategory}`}
        </p>

        <motion.div
          className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          layout
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleProjects.map(({ project, originalIndex }) => (
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -12 }}
                initial={{ opacity: 0, scale: 0.97, y: 18 }}
                key={project.id}
                layout
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard index={originalIndex} project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
