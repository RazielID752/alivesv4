import type { Project } from "@/types/project";
import { Button } from "./Button";

type ProjectCardProps = Readonly<{
  project: Project;
  index: number;
}>;

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-zinc-950/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-2">
      <div className="relative min-h-64 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(96,165,250,0.48),transparent_28%),radial-gradient(circle_at_30%_80%,rgba(251,191,36,0.24),transparent_30%)]" />
        <div className="absolute left-6 top-6 rounded-full border border-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
          {project.category}
        </div>
        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl transition duration-300 group-hover:translate-y-[-0.35rem]">
          <div className="mb-4 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <div className="grid grid-cols-[1fr_0.65fr] gap-3">
            <span className="h-24 rounded-xl bg-white/20" />
            <span className="h-24 rounded-xl bg-blue-400/30" />
          </div>
        </div>
        <span className="absolute right-5 top-5 text-6xl font-semibold tracking-[-0.06em] text-white/10">
          0{index + 1}
        </span>
      </div>
      <div className="p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          Cena 0{index + 1}
        </p>
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
          {project.title}
        </h3>
        <p className="mt-3 min-h-20 text-sm leading-7 text-zinc-600">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              className="rounded-full border border-zinc-950/10 px-3 py-1 text-xs font-medium text-zinc-600"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            className="min-h-10 px-4"
            href={project.projectUrl}
            variant="dark"
          >
            Projeto
          </Button>
          {project.repositoryUrl ? (
            <Button
              className="min-h-10 px-4"
              href={project.repositoryUrl}
              variant="light"
            >
              Repositorio
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
