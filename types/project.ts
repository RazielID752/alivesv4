export type ProjectCategory =
  | "Front-End"
  | "UX/UI Design"
  | "Dashboard"
  | "Landing Page"
  | "Sistema Web"
  | "Portfolio";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  technologies: string[];
  projectUrl: string;
  caseSlug?: string;
  repositoryUrl?: string;
};
