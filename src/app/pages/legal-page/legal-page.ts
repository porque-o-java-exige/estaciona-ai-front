import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Footer } from '../../components/organisms/footer/footer';
import { CookieConsentService } from '../../services/cookie-consent.service';

interface LegalSection {
  heading: string;
  paragraphs: readonly string[];
  contactLead?: string;
  contactEmail?: string;
}

interface LegalDocument {
  key: 'privacy' | 'terms' | 'cookies';
  title: string;
  sections: readonly LegalSection[];
}

const LEGAL_DOCUMENTS: Record<LegalDocument['key'], LegalDocument> = {
  privacy: {
    key: 'privacy',
    title: 'Política de Privacidade',
    sections: [
      {
        heading: '1. Quem é responsável pelos dados',
        paragraphs: [
          'O Estaciona Ai é atualmente uma iniciativa, ainda sem pessoa jurídica constituída ou CNPJ.',
          'Antes do início da operação comercial, identifique o responsável pelo tratamento de dados e revise esta política.',
        ],
        contactLead: 'Para assuntos de privacidade, entre em contato pelo e-mail',
        contactEmail: 'estaciona.ai.2026@gmail.com',
      },
      {
        heading: '2. Dados tratados',
        paragraphs: [
          'O protótipo oferece campos para dados de cadastro e contato, foto de perfil, informações e placa de veículos, dados de garagens, reservas e preferências. Confirme quais desses dados serão efetivamente coletados, armazenados e compartilhados na versão publicada.',
        ],
      },
      {
        heading: '3. Finalidades e bases legais',
        paragraphs: [
          'Descreva aqui as finalidades efetivas do tratamento, as bases legais aplicáveis e os dados associados a cada finalidade, incluindo operação da conta, gestão de vagas e reservas, atendimento e segurança. Não publique esta seção sem validar a operação real.',
        ],
      },
      {
        heading: '4. Compartilhamento e retenção',
        paragraphs: [
          'Informe os fornecedores e destinatários que realmente recebem dados, inclusive serviços de hospedagem, pagamento, comunicação ou análise, se utilizados. Defina também os prazos de retenção e os critérios de exclusão aplicáveis.',
        ],
      },
      {
        heading: '5. Direitos e contato',
        paragraphs: [
          'O responsável deverá definir como a identidade será confirmada e os prazos de resposta adotados.',
        ],
        contactLead:
          'Para exercer direitos previstos na legislação de proteção de dados aplicável, incluindo a LGPD quando pertinente, ou tirar dúvidas, use o e-mail',
        contactEmail: 'estaciona.ai.2026@gmail.com',
      },
    ],
  },
  terms: {
    key: 'terms',
    title: 'Termos de Serviço',
    sections: [
      {
        heading: '1. Identificação do serviço',
        paragraphs: [
          'O Estaciona Ai é uma iniciativa em desenvolvimento, ainda sem pessoa jurídica constituída ou CNPJ.',
          'A identificação do responsável e as condições da oferta deverão ser definidas antes do lançamento comercial.',
        ],
        contactLead: 'Para entrar em contato, escreva para',
        contactEmail: 'estaciona.ai.2026@gmail.com',
      },
      {
        heading: '2. Conta e informações fornecidas',
        paragraphs: [
          'O usuário deve fornecer informações corretas e manter seus dados atualizados. Defina aqui os requisitos de idade, segurança da conta e procedimentos para correção ou encerramento.',
        ],
      },
      {
        heading: '3. Veículos, vagas e reservas',
        paragraphs: [
          'Descreva as regras de cadastro e verificação de veículos e vagas, a disponibilidade das vagas e as responsabilidades de usuários e anunciantes. Informe como conflitos, cancelamentos e alterações de reserva serão tratados.',
        ],
      },
      {
        heading: '4. Preços, pagamentos e cancelamentos',
        paragraphs: [
          'Informe como preços, taxas, descontos e formas de pagamento são apresentados. Preencha a política efetiva de cobranças, reembolsos, cancelamentos e contestação de pagamentos antes de disponibilizar o serviço.',
        ],
      },
      {
        heading: '5. Alterações e atendimento',
        paragraphs: [
          'Regras de responsabilidade e foro devem ser revisadas por assessoria jurídica antes da publicação.',
          'Mudanças nestes termos deverão ser comunicadas pelos canais oficiais do serviço.',
        ],
        contactLead: 'Para contato, escreva para',
        contactEmail: 'estaciona.ai.2026@gmail.com',
      },
    ],
  },
  cookies: {
    key: 'cookies',
    title: 'Política de Cookies',
    sections: [
      {
        heading: '1. O que são cookies',
        paragraphs: [
          'Cookies são pequenos dados armazenados pelo navegador. Este site usa um cookie próprio para lembrar a escolha de consentimento feita pelo visitante.',
        ],
      },
      {
        heading: '2. Cookie usado neste protótipo',
        paragraphs: [
          'O cookie “estaciona_ai_cookie_consent” guarda a preferência entre cookies necessários e opcionais por até 180 dias. Ele usa Path=/ e SameSite=Lax, e recebe o atributo Secure em conexões HTTPS.',
        ],
      },
      {
        heading: '3. Cookies opcionais',
        paragraphs: [
          'A opção de medição de uso permite registrar uma preferência para eventual integração futura. Atualmente, o protótipo não carrega ferramentas de análise, publicidade ou rastreamento de terceiros.',
        ],
      },
      {
        heading: '4. Como alterar sua escolha',
        paragraphs: [
          'Use o botão abaixo para rever suas preferências. Também é possível apagar cookies nas configurações do navegador; nesse caso, o aviso de consentimento poderá aparecer novamente.',
        ],
      },
    ],
  },
};

function resolveLegalDocument(key: unknown): LegalDocument {
  if (key === 'terms' || key === 'cookies') {
    return LEGAL_DOCUMENTS[key];
  }
  return LEGAL_DOCUMENTS.privacy;
}

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [RouterLink, Footer],
  templateUrl: './legal-page.html',
  styleUrl: './legal-page.scss',
})
export class LegalPage {
  private readonly cookieConsent = inject(CookieConsentService);
  private readonly route = inject(ActivatedRoute);

  readonly document = toSignal(
    this.route.data.pipe(map((data) => resolveLegalDocument(data['document']))),
    { initialValue: LEGAL_DOCUMENTS.privacy },
  );

  openCookieSettings = (): void => {
    this.cookieConsent.openSettings();
  };
}
