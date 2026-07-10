import type { ProcessStep } from "@/types/process";

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    title: "Descoberta",
    description: "Entendimento dos objetivos, usuarios, contexto e problema.",
  },
  {
    id: "definition",
    title: "Definicao",
    description:
      "Organizacao dos requisitos, fluxos, prioridades e oportunidades.",
  },
  {
    id: "design",
    title: "Design",
    description:
      "Criacao de wireframes, interfaces, prototipos e componentes visuais.",
  },
  {
    id: "development",
    title: "Desenvolvimento",
    description:
      "Construcao do front-end com codigo limpo, responsivo e escalavel.",
  },
  {
    id: "delivery",
    title: "Entrega",
    description: "Testes, refinamentos, otimizacao e lancamento com confianca.",
  },
];
