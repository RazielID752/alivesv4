export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudySection = {
  title: string;
  description: string;
};

export type CaseStudyGalleryItem = {
  title: string;
  description: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  year: string;
  role: string;
  client: string;
  duration: string;
  stack: string[];
  projectUrl?: string;
  repositoryUrl?: string;
  metrics: CaseStudyMetric[];
  overview: CaseStudySection[];
  process: CaseStudySection[];
  gallery: CaseStudyGalleryItem[];
};
