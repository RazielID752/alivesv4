import type { CaseStudy } from "@/types/case-study";

export const caseStudies: CaseStudy[] = [
  {
    slug: "promo-perdigao-chester",
    title: "Promo Perdigao Chester",
    category: "UX/UI Design",
    summary:
      "Template de case para apresentar contexto, estrategia visual, processo e impacto de uma campanha digital com narrativa clara.",
    year: "2026",
    role: "UX/UI Designer e Front-End",
    client: "Cliente exemplo",
    duration: "4 semanas",
    stack: ["UX", "UI", "Research", "Next.js", "Tailwind"],
    metrics: [
      { value: "+42%", label: "clareza na jornada" },
      { value: "3x", label: "mais rapido para explicar o projeto" },
      { value: "100%", label: "layout responsivo" },
    ],
    overview: [
      {
        title: "Contexto",
        description:
          "O projeto precisava transformar uma campanha promocional em uma experiencia facil de entender, com entrada rapida, regras claras e uma narrativa visual forte.",
      },
      {
        title: "Desafio",
        description:
          "Organizar informacoes de mecanica, participacao e impacto social sem deixar a interface pesada ou dispersa em telas menores.",
      },
      {
        title: "Solucao",
        description:
          "Criei uma estrutura guiada por blocos de decisao, destaques visuais e chamadas objetivas para conduzir o usuario da descoberta ate a acao.",
      },
    ],
    process: [
      {
        title: "01. Leitura do problema",
        description:
          "Mapeamento de objetivos, conteudos obrigatorios, friccoes da jornada e momentos em que o usuario poderia abandonar a campanha.",
      },
      {
        title: "02. Arquitetura da pagina",
        description:
          "Definicao da hierarquia das secoes, priorizando entendimento imediato, prova visual e chamada para participacao.",
      },
      {
        title: "03. Interface e responsividade",
        description:
          "Construcao de componentes flexiveis para manter ritmo visual, contraste e legibilidade em desktop e mobile.",
      },
    ],
    gallery: [
      {
        title: "Hero do case",
        description:
          "Espaco para substituir por print, mockup ou imagem principal do projeto.",
      },
      {
        title: "Fluxo principal",
        description:
          "Area pensada para destacar telas, estados ou momentos-chave da experiencia.",
      },
      {
        title: "Sistema visual",
        description:
          "Resumo de componentes, cores, cards, secoes e padroes usados no projeto.",
      },
    ],
  },
  {
    slug: "nexa-analytics",
    title: "Nexa Analytics",
    category: "Dashboard",
    summary:
      "Template para dashboard com foco em metricas, leitura rapida e interface operacional.",
    year: "2026",
    role: "Front-End Developer",
    client: "Cliente exemplo",
    duration: "5 semanas",
    stack: ["React", "TypeScript", "APIs", "Design System"],
    metrics: [
      { value: "12", label: "componentes base" },
      { value: "-35%", label: "tempo de leitura" },
      { value: "24/7", label: "monitoramento" },
    ],
    overview: [
      {
        title: "Contexto",
        description:
          "Times precisavam acompanhar indicadores em uma tela objetiva, com estados claros e informacoes comparaveis.",
      },
      {
        title: "Desafio",
        description:
          "Evitar excesso visual enquanto mantinha densidade suficiente para decisoes recorrentes.",
      },
      {
        title: "Solucao",
        description:
          "Estruturei uma experiencia com cards de status, tabelas resumidas e hierarquia visual orientada a scanning.",
      },
    ],
    process: [
      {
        title: "01. Priorizacao",
        description:
          "Organizacao dos indicadores por frequencia de uso, criticidade e relacao com a decisao do usuario.",
      },
      {
        title: "02. Componentizacao",
        description:
          "Criacao de componentes reutilizaveis para metricas, filtros, listas e paineis de detalhe.",
      },
      {
        title: "03. Validacao visual",
        description:
          "Ajustes de contraste, responsividade e hierarquia para leitura consistente em diferentes larguras.",
      },
    ],
    gallery: [
      {
        title: "Visao geral",
        description: "Mockup principal com metricas e leitura de status.",
      },
      {
        title: "Detalhamento",
        description:
          "Bloco para explicar tabelas, filtros ou estados internos.",
      },
      {
        title: "Design system",
        description: "Area para demonstrar tokens e componentes do dashboard.",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
