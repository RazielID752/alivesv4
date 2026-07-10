import type { Project, ProjectCategory } from "@/types/project";

export const projectCategories: Array<"Todos" | ProjectCategory> = [
  "Todos",
  "Front-End",
  "UX/UI Design",
  "Dashboard",
  "Landing Page",
  "Sistema Web",
  "Portfolio",
];

export const projects: Project[] = [
  {
    id: "aura-interiores",
    title: "Aura Interiores",
    category: "UX/UI Design",
    description:
      "Experiencia editorial para uma marca de interiores com foco em desejo, clareza e conversao.",
    technologies: ["UX/UI", "Next.js", "Tailwind"],
    projectUrl: "#contato",
    repositoryUrl: "#",
  },
  {
    id: "nexa-analytics",
    title: "Nexa Analytics",
    category: "Dashboard",
    description:
      "Dashboard escuro para leitura rapida de metricas, graficos e decisoes operacionais.",
    technologies: ["React", "TypeScript", "APIs"],
    projectUrl: "#contato",
  },
  {
    id: "kali-skincare",
    title: "Kali Skincare",
    category: "Landing Page",
    description:
      "Landing page premium para produto, combinando narrativa visual, performance e responsividade.",
    technologies: ["Next.js", "UI Design", "SEO"],
    projectUrl: "#contato",
  },
  {
    id: "marcos-n-portfolio",
    title: "Marcos N Portfolio",
    category: "Portfolio",
    description:
      "Portfolio institucional com parallax, storytelling e arquitetura front-end escalavel.",
    technologies: ["Next.js", "Framer Motion", "Tailwind"],
    projectUrl: "#inicio",
    repositoryUrl: "#",
  },
  {
    id: "flow-system",
    title: "Flow System",
    category: "Sistema Web",
    description:
      "Sistema web com componentes reutilizaveis, fluxo claro e interface orientada a produtividade.",
    technologies: ["React", "Design System", "TypeScript"],
    projectUrl: "#contato",
  },
  {
    id: "campaign-lab",
    title: "Campaign Lab",
    category: "Front-End",
    description:
      "Interfaces de campanha com visual marcante, microinteracoes e codigo limpo.",
    technologies: ["Front-End", "JavaScript", "CSS"],
    projectUrl: "#contato",
    repositoryUrl: "#",
  },
];
