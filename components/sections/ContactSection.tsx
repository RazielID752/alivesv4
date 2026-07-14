import {
  ArrowRight,
} from "lucide-react";
import { AnimatedWrapper } from "@/components/ui/AnimatedWrapper";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ContactSection() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-zinc-50 py-24 text-zinc-950 lg:py-32"
    >
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-zinc-950/10 to-transparent"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-2 lg:grid-cols-[0.75fr_1fr] lg:items-center">
          <AnimatedWrapper>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-blue-600">
              06 / Convite
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              A proxima cena pode ser o seu projeto.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-zinc-600">
              Me conte sobre sua ideia, desafio ou objetivo. Eu te ajudo a
              transformar isso em uma experiencia clara, bonita e pronta para
              avancar.
            </p>
          </AnimatedWrapper>

          <AnimatedWrapper className="rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(191,219,254,0.9),rgba(221,214,254,0.9),rgba(253,186,116,0.75))] p-8 shadow-[0_30px_100px_rgba(15,23,42,0.14)] lg:p-10">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="max-w-md text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
                  Vamos criar uma historia que o usuario queira continuar.
                </h3>
                <div className="mt-6 flex items-center gap-4">
                  <Button href="mailto:hello@marcosn.dev" icon={ArrowRight}>
                    Entrar em contato
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </Container>
    </section>
  );
}
