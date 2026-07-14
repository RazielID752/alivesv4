import type { Metadata } from "next";
import { LegalDocument } from "@/components/privacy/LegalDocument";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade, proteção de dados e uso de cookies do site Marcos N.",
  alternates: {
    canonical: "/politica-de-privacidade",
  },
};

const sections = [
  {
    title: "Aviso prévio",
    content: (
      <>
        <p>
          Esta Política de Privacidade regula, de forma transparente e objetiva,
          quais dados e informações poderão ser obtidos, quando poderão ser
          utilizados e como o usuário poderá atualizá-los ou excluí-los. A
          política se aplica ao site Marcos N e aos seus produtos. Ao acessar o
          site, o usuário atesta seu conhecimento das condições desta política.
        </p>
        <p>
          Esta Política de Privacidade foi elaborada em conformidade com a Lei
          Federal nº 12.965, de 23 de abril de 2014 (Marco Civil da Internet), e
          com a Lei Federal nº 13.709, de 14 de agosto de 2018 (Lei Geral de
          Proteção de Dados Pessoais), e poderá ser atualizada mediante aviso no
          site e/ou por e-mail.
        </p>
      </>
    ),
  },
  {
    title: "Privacidade e dados pessoais",
    content: (
      <>
        <p>
          A Marcos N reconhece a importância de proteger a privacidade dos dados
          e informações fornecidos por quem visita seu site e suas redes
          sociais. Poderão ser coletadas informações inseridas ativamente pelo
          usuário e informações coletadas automaticamente durante a utilização
          das páginas, como IP, data e hora da conexão e dados técnicos do
          acesso.
        </p>
        <p>
          Dados pessoais poderão ser coletados no atendimento, em campanhas ou
          na seção “Fale Conosco”, quando forem inseridos pelo próprio usuário.
          Esses dados podem incluir nome completo, e-mail, gênero, data de
          nascimento, cidade e estado. As informações serão utilizadas para
          atender solicitações e, mediante consentimento, divulgar produtos,
          campanhas, materiais publicitários e eventos.
        </p>
        <p>
          O consentimento para comunicações poderá ser revogado a qualquer
          momento pelos canais de contato desta política. Os dados somente serão
          armazenados quando houver uma base legal aplicável, incluindo o
          consentimento expresso do titular quando necessário.
        </p>
        <p>
          A Marcos N não compartilhará ou fornecerá dados pessoais a terceiros,
          salvo mediante autorização do usuário, quando necessário para prestar
          um serviço solicitado, para proteger seus interesses em conflitos ou
          por decisão judicial ou requisição de autoridade competente.
        </p>
        <p>
          O usuário poderá solicitar acesso, correção, atualização, limitação,
          portabilidade ou exclusão de seus dados pelos canais de contato
          indicados nesta política.
        </p>
      </>
    ),
  },
  {
    title: "Dados não pessoais e cookies",
    content: (
      <>
        <p>
          Algumas páginas guardam no navegador informações chamadas cookies.
          Eles ajudam o site a lembrar preferências e permitem entender como e
          quando as páginas são visitadas, quantos usuários as acessam e como a
          experiência pode ser aprimorada.
        </p>
        <p>
          Os cookies não têm como finalidade identificar diretamente o usuário.
          A qualquer momento, o consentimento para cookies opcionais poderá ser
          revogado por meio do link “Cookies” no rodapé ou pelas configurações
          do navegador.
        </p>
      </>
    ),
  },
  {
    title: "Política de cookies",
    content: (
      <>
        <p>
          Cookies são pequenos textos enviados ao navegador por um site visitado
          e ajudam a lembrar informações sobre a experiência do usuário. No site
          da Marcos N, são utilizados para proporcionar uma navegação adequada,
          melhorar o desempenho e registrar estatísticas de acesso.
        </p>
        <p>
          <strong className="text-zinc-950">Cookies exigidos:</strong> são
          essenciais para a navegação e para recursos básicos do site. Podem ser
          armazenados durante a sessão de navegação.
        </p>
        <p>
          <strong className="text-zinc-950">
            Cookies de funcionalidade e analíticos:
          </strong>{" "}
          permitem analisar a utilização do site, medir seu desempenho e
          orientar melhorias. Podem ser inseridos pela Marcos N ou por terceiros
          em seu nome e somente são ativados após a aceitação na barra de
          cookies.
        </p>
        <p>
          <strong className="text-zinc-950">
            Cookies de publicidade e mídia social:
          </strong>{" "}
          podem memorizar preferências e medir a performance de comunicações de
          marketing. Quando utilizados, seus dados poderão ser compartilhados
          com os respectivos fornecedores, de acordo com o consentimento do
          usuário.
        </p>
      </>
    ),
  },
  {
    title: "Redes sociais",
    content: (
      <>
        <p>
          O site poderá oferecer links ou integrações com redes sociais. Ao
          interagir com uma rede social usando uma conta já registrada, a
          atividade poderá ser disponibilizada àquela plataforma conforme suas
          configurações de privacidade.
        </p>
        <p>
          Para impedir esse tipo de transferência, o usuário poderá sair da rede
          social antes de acessar o site ou alterar as configurações da conta.
          Recomendamos a leitura das políticas de cada plataforma para conhecer
          suas práticas de coleta e transferência de informações.
        </p>
      </>
    ),
  },
  {
    title: "Retenção das informações",
    content: (
      <>
        <p>
          Os dados coletados serão excluídos quando deixarem de ser úteis para
          as finalidades informadas ou quando o titular solicitar sua
          eliminação, ressalvadas as hipóteses previstas em lei.
        </p>
        <p>
          Informações poderão ser conservadas para o cumprimento de obrigação
          legal ou regulatória, desde que respeitados os requisitos de
          tratamento de dados, ou utilizadas de forma anonimizada.
        </p>
      </>
    ),
  },
  {
    title: "Segurança dos dados",
    content: (
      <>
        <p>
          A Marcos N armazena os dados em servidores próprios ou contratados e
          adota soluções compatíveis com a natureza, o contexto e a finalidade
          do tratamento, considerando os riscos aos direitos e liberdades do
          usuário.
        </p>
        <p>
          Embora sejam empregados os melhores esforços, nenhum site é totalmente
          seguro. A Marcos N não pode garantir integralmente que as informações
          não serão alvo de acesso não autorizado, especialmente por culpa
          exclusiva de terceiros ou do próprio usuário. Por isso, recomendamos
          que cada pessoa também adote medidas adequadas de proteção.
        </p>
        <p>
          Caso ocorra uma violação de segurança capaz de causar alto risco aos
          direitos e liberdades dos titulares, os usuários afetados serão
          comunicados em prazo adequado.
        </p>
      </>
    ),
  },
  {
    title: "Canais de contato e encarregado",
    content: (
      <>
        <p>
          Para esclarecer dúvidas, conhecer os dados mantidos ou exercer
          direitos de proteção de dados, entre em contato com Marcos Nathanael,
          encarregado pelo tratamento de dados.
        </p>
        <p>
          E-mail:{" "}
          <a
            className="font-semibold text-zinc-950 underline decoration-zinc-950/25 underline-offset-4 hover:decoration-zinc-950"
            href="mailto:contato.marcos.nathanael@gmail.com"
          >
            contato.marcos.nathanael@gmail.com
          </a>
          <br />
          Telefone:{" "}
          <a
            className="font-semibold text-zinc-950 underline decoration-zinc-950/25 underline-offset-4 hover:decoration-zinc-950"
            href="tel:+5521974131359"
          >
            +55 (21) 97413-1359
          </a>
        </p>
      </>
    ),
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      description="Como os dados são tratados, quais cookies podem ser usados e como exercer seus direitos de privacidade."
      sections={sections}
      title="Política de Privacidade"
    />
  );
}
