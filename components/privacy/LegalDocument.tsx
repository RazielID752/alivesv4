import { ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

type LegalSection = Readonly<{
  title: string;
  content: ReactNode;
}>;

type LegalDocumentProps = Readonly<{
  title: string;
  description: string;
  sections: readonly LegalSection[];
}>;

export function LegalDocument({
  title,
  description,
  sections,
}: LegalDocumentProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50 px-5 pb-24 pt-40 text-zinc-950 sm:px-8 sm:pt-48 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <header className="border-zinc-950/10 border-b pb-16 sm:pb-20">
            <div className="flex items-center gap-3 text-blue-600">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-600/10">
                <ShieldCheck aria-hidden="true" className="h-4 w-4" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.2em]">
                Informações legais
              </p>
            </div>
            <h1 className="mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-[5.5rem]">
              {title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
              {description}
            </p>
            <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-zinc-500">
              Última atualização: 14 de julho de 2026
            </p>
          </header>

          <div className="grid gap-12 pt-10 lg:grid-cols-[15rem_1fr] lg:gap-20 lg:pt-16">
            <aside className="hidden lg:block">
              <nav
                aria-label={`Índice de ${title}`}
                className="sticky top-32 border-zinc-950/10 border-l pl-5"
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Neste documento
                </p>
                <ol className="space-y-3">
                  {sections.map((section, index) => (
                    <li key={section.title}>
                      <a
                        className="group flex gap-3 text-sm leading-5 text-zinc-500 transition hover:text-zinc-950"
                        href={`#legal-section-${index + 1}`}
                      >
                        <span className="font-mono text-[0.65rem] text-zinc-400 group-hover:text-blue-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="border-zinc-950/10 border-t">
              {sections.map((section, index) => (
                <section
                  className="scroll-mt-32 border-zinc-950/10 border-b py-10 sm:py-14"
                  id={`legal-section-${index + 1}`}
                  key={section.title}
                >
                  <div className="grid gap-5 sm:grid-cols-[3.5rem_1fr]">
                    <span className="pt-1 font-mono text-xs text-blue-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                        {section.title}
                      </h2>
                      <div className="mt-5 max-w-3xl space-y-4 text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
