import type { Metadata } from "next";
import { LegalDocument } from "@/components/privacy/LegalDocument";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos aplicáveis à utilização do site Marcos N.",
  alternates: {
    canonical: "/termos",
  },
};

const sections = [
  {
    title: "Aceitação dos termos",
    content: (
      <p>
        Ao acessar e utilizar o site Marcos N, o usuário declara ter
        conhecimento destes Termos de Uso e da Política de Privacidade. Caso não
        concorde com as condições apresentadas, deverá interromper a utilização
        do site e poderá recusar os cookies opcionais.
      </p>
    ),
  },
  {
    title: "Privacidade e proteção de dados",
    content: (
      <p>
        O tratamento de dados pessoais relacionado ao uso do site observa a Lei
        Federal nº 12.965/2014 (Marco Civil da Internet) e a Lei Federal nº
        13.709/2018 (Lei Geral de Proteção de Dados Pessoais). As finalidades,
        bases de tratamento, direitos do titular e canais de contato estão
        descritos na Política de Privacidade.
      </p>
    ),
  },
  {
    title: "Cookies e preferências",
    content: (
      <>
        <p>
          Cookies essenciais poderão ser utilizados para viabilizar recursos
          básicos e manter preferências necessárias ao funcionamento do site.
          Cookies analíticos, de funcionalidade, publicidade ou mídia social
          somente serão ativados após o consentimento do usuário quando exigido.
        </p>
        <p>
          A escolha poderá ser alterada a qualquer momento pelo link “Cookies”
          no rodapé do site ou pelas configurações do navegador.
        </p>
      </>
    ),
  },
  {
    title: "Links e redes de terceiros",
    content: (
      <p>
        O site poderá conter links para redes sociais e serviços de terceiros.
        Cada plataforma possui suas próprias condições e políticas de
        privacidade. A interação com esses serviços poderá disponibilizar dados
        à respectiva plataforma conforme as configurações da conta do usuário.
      </p>
    ),
  },
  {
    title: "Segurança e responsabilidade",
    content: (
      <p>
        A Marcos N emprega esforços para preservar a segurança e a privacidade
        das informações. Contudo, nenhum ambiente digital é totalmente seguro.
        Não há responsabilidade por fatos decorrentes de culpa exclusiva de
        terceiros, como ataques não autorizados, ou do usuário, como o
        compartilhamento voluntário de seus dados com outras pessoas.
      </p>
    ),
  },
  {
    title: "Alterações",
    content: (
      <p>
        Estes termos e a Política de Privacidade poderão ser atualizados a
        qualquer momento. Alterações relevantes poderão ser comunicadas no
        próprio site e/ou por e-mail, quando aplicável.
      </p>
    ),
  },
  {
    title: "Contato",
    content: (
      <p>
        Dúvidas relacionadas a estes termos, à privacidade ou ao tratamento de
        dados podem ser enviadas para{" "}
        <a
          className="font-semibold text-zinc-950 underline decoration-zinc-950/25 underline-offset-4 hover:decoration-zinc-950"
          href="mailto:contato.marcos.nathanael@gmail.com"
        >
          contato.marcos.nathanael@gmail.com
        </a>{" "}
        ou pelo telefone{" "}
        <a
          className="font-semibold text-zinc-950 underline decoration-zinc-950/25 underline-offset-4 hover:decoration-zinc-950"
          href="tel:+5521974131359"
        >
          +55 (21) 97413-1359
        </a>
        .
      </p>
    ),
  },
] as const;

export default function TermsPage() {
  return (
    <LegalDocument
      description="Condições gerais para navegar pelo site, utilizar seus recursos e gerenciar preferências de privacidade."
      sections={sections}
      title="Termos de Uso"
    />
  );
}
