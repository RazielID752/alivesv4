import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers3,
  Target,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";

type CasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case nao encontrado",
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    alternates: {
      canonical: `/cases/${caseStudy.slug}`,
    },
    openGraph: {
      title: `${caseStudy.title} | Case`,
      description: caseStudy.summary,
      type: "article",
      url: `/cases/${caseStudy.slug}`,
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-zinc-950 text-white">
        <section className="relative isolate overflow-hidden px-0 pb-20 pt-32 sm:pt-40 lg:min-h-screen lg:pb-24">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(37,99,235,0.34),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(250,204,21,0.16),transparent_24%),linear-gradient(180deg,#050507_0%,#09090b_64%,#f9fafb_64%)]"
            aria-hidden="true"
          />
          <Container>
            <Link
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
              href="/#projetos"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Voltar para cases
            </Link>

            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-300">
                  {caseStudy.category}
                </p>
                <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
                  {caseStudy.title}
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
                  {caseStudy.summary}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  {caseStudy.projectUrl ? (
                    <Button href={caseStudy.projectUrl} icon={ArrowUpRight}>
                      Ver projeto
                    </Button>
                  ) : null}
                  {caseStudy.repositoryUrl ? (
                    <Button
                      href={caseStudy.repositoryUrl}
                      icon={Code2}
                      variant="secondary"
                    >
                      Repositorio
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-[0_40px_140px_rgba(0,0,0,0.36)] backdrop-blur-2xl">
                <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-zinc-950">
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-300" />
                      <span className="h-3 w-3 rounded-full bg-amber-300" />
                      <span className="h-3 w-3 rounded-full bg-emerald-300" />
                    </div>
                    <span className="text-xs font-medium text-white/45">
                      case-preview
                    </span>
                  </div>
                  <div className="grid min-h-[420px] gap-4 p-5 sm:grid-cols-[1fr_0.72fr]">
                    <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_24%_24%,rgba(96,165,250,0.55),transparent_28%),linear-gradient(135deg,#18181b,#030712)] p-6">
                      <div className="absolute bottom-0 right-0 h-44 w-44 rounded-tl-[4rem] bg-yellow-300/20" />
                      <div className="relative flex h-full flex-col justify-between">
                        <Layers3
                          aria-hidden="true"
                          className="h-9 w-9 text-blue-200"
                        />
                        <div>
                          <p className="text-sm font-semibold text-white/60">
                            Interface principal
                          </p>
                          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                            {caseStudy.title}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {caseStudy.metrics.map((metric) => (
                        <div
                          className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"
                          key={metric.label}
                        >
                          <p className="text-3xl font-semibold tracking-[-0.05em]">
                            {metric.value}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-zinc-400">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-zinc-50 py-20 text-zinc-950 lg:py-28">
          <Container>
            <div className="grid gap-5 md:grid-cols-4">
              {[
                ["Cliente", caseStudy.client],
                ["Papel", caseStudy.role],
                ["Ano", caseStudy.year],
                ["Duracao", caseStudy.duration],
              ].map(([label, value]) => (
                <div
                  className="rounded-3xl border border-zinc-950/10 bg-white p-6"
                  key={label}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                    {label}
                  </p>
                  <p className="mt-3 text-lg font-semibold tracking-[-0.03em]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {caseStudy.overview.map((item) => (
                <article
                  className="rounded-[1.5rem] border border-zinc-950/10 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)]"
                  key={item.title}
                >
                  <Target
                    aria-hidden="true"
                    className="h-6 w-6 text-blue-600"
                  />
                  <h2 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 text-zinc-950 lg:py-28">
          <Container>
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                Galeria
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                Troque estes blocos pelos prints reais do projeto
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {caseStudy.gallery.map((item, index) => (
                <article
                  className="group overflow-hidden rounded-[1.5rem] border border-zinc-950/10 bg-zinc-50"
                  key={item.title}
                >
                  <div className="relative min-h-72 overflow-hidden bg-zinc-950">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_26%,rgba(37,99,235,0.5),transparent_32%),radial-gradient(circle_at_24%_78%,rgba(250,204,21,0.22),transparent_28%)]" />
                    <span className="absolute right-5 top-4 text-7xl font-semibold tracking-[-0.06em] text-white/10">
                      0{index + 1}
                    </span>
                    <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                      <div className="h-24 rounded-xl bg-white/20 transition group-hover:bg-white/25" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-zinc-950 py-20 text-white lg:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">
                  Processo
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  Como o case foi construido
                </h2>
                <div className="mt-8 flex flex-wrap gap-2">
                  {caseStudy.stack.map((item) => (
                    <span
                      className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/65"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {caseStudy.process.map((item) => (
                  <article
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7"
                    key={item.title}
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="h-6 w-6 text-blue-300"
                    />
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-zinc-50 py-20 text-zinc-950 lg:py-28">
          <Container>
            <div className="rounded-[2rem] bg-zinc-950 p-8 text-white sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  Use este case como base para o proximo portfolio.
                </h2>
                <p className="mt-5 text-sm leading-7 text-zinc-400">
                  Duplique a entrada em data/caseStudies.ts, crie o slug e
                  conecte o card correspondente em data/projects.ts.
                </p>
              </div>
              <Button
                className="mt-8 lg:mt-0"
                href="/#contato"
                icon={ExternalLink}
              >
                Comecar outro projeto
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
