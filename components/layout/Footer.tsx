import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-zinc-50 py-8 text-zinc-600">
      <Container className="flex flex-col gap-6 border-t border-zinc-950/10 pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm">
          © 2026 Marcos N. Todos os direitos reservados.
        </p>
        <nav
          className="flex flex-wrap gap-5 text-xs font-bold uppercase tracking-[0.18em]"
          aria-label="Links do rodape"
        >
          <a className="transition hover:text-zinc-950" href="#inicio">
            Inicio
          </a>
          <a
            className="transition hover:text-zinc-950"
            href="https://www.linkedin.com/in/marcos-nathanael/"
            rel="noreferrer noopener"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            className="transition hover:text-zinc-950"
            href="https://github.com/RazielID752"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </a>
          <a
            className="transition hover:text-zinc-950"
            href="mailto:hello@marcosn.dev"
            rel="noreferrer noopener"
            target="_blank"
          >
            E-mail
          </a>
        </nav>
      </Container>
    </footer>
  );
}
