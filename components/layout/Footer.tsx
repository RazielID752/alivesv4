import { ScrollText, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/privacy/CookiePreferencesButton";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-zinc-50 py-8 text-zinc-600">
      <Container className="flex flex-col gap-6 border-t border-zinc-950/10 pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm">
          © 2026 Marcos N. Todos os direitos reservados.
        </p>
        <nav
          className="flex flex-wrap gap-5 text-xs font-bold  tracking-[0.18em]"
          aria-label="Links do rodape"
        >
          <Link
            className="inline-flex text-[12px] items-center gap-1.5 transition  hover:text-blue-600"
            href="/politica-de-privacidade"
          >
            Privacidade
          </Link>
          <Link
            className="inline-flex text-[12px] items-center gap-1.5 transition  hover:text-blue-600"
            href="/termos"
          >
            Termos
          </Link>
          <CookiePreferencesButton />
          <Link
            className="inline-flex text-[12px] items-center gap-1.5 transition  hover:text-blue-600"
            href="https://www.linkedin.com/in/marcos-nathanael/"
            rel="noreferrer noopener"
            target="_blank"
          >
            LinkedIn
          </Link>
          <Link
            className="inline-flex text-[12px] items-center gap-1.5 transition  hover:text-blue-600"
            href="https://github.com/RazielID752"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </Link>
          <Link
            className="inline-flex text-[12px] items-center gap-1.5 transition  hover:text-blue-600"
            href="https://wa.me/5521974131359"
            rel="noreferrer noopener"
            target="_blank"
          >
            WhatsApp
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
