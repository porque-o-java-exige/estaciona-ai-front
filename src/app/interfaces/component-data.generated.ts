// ⚠️ ARQUIVO GERADO AUTOMATICAMENTE — NÃO EDITE NA MÃO.
// Gerado por scripts/generate-components-data.mjs a partir dos arquivos
// "component.meta.json" encontrados dentro de src/app/components/.
//
// Pra adicionar um componente novo na Home, crie uma pasta em
// src/app/components/{atoms|molecules|organisms}/seu-componente/
// com um "component.meta.json" dentro. Não edite este arquivo direto,
// suas mudanças serão sobrescritas na próxima geração.

import { ComponentData } from './component-data.interface';

export const COMPONENTS_DATA: ComponentData[] = [
  {
    "id": "avatar",
    "name": "Avatar",
    "description": "Componente de avatar de usuário com suporte a imagem, iniciais, status e verificação",
    "category": "atoms",
    "longDescription": "O componente Avatar exibe a identidade visual de um usuário. Quando uma URL de imagem é fornecida, exibe a foto; caso contrário, gera automaticamente as iniciais do nome. Suporta três tamanhos (sm, md, lg), indicador de status online/offline e badge de conta verificada.",
    "examples": [
      "Avatar com imagem de perfil",
      "Avatar com iniciais (sem foto)",
      "Avatar tamanho sm — chats e listas",
      "Avatar tamanho md — cards de usuário",
      "Avatar tamanho lg — header de perfil",
      "Avatar com status online (bolinha verde)",
      "Avatar com status offline (bolinha vermelha)",
      "Avatar com badge de verificado"
    ]
  },
  {
    "id": "badge",
    "name": "Badge",
    "description": "Indicador numérico ou pontual para sobrepor a ícones e elementos",
    "category": "atoms",
    "longDescription": "O componente Badge é um indicador visual pequeno, usado para sobrepor contadores de notificações e mensagens sobre ícones ou outros elementos. Suporta variante 'dot' (apenas ponto, sem número) e 'count' (exibe número, com cap em 99+). Não é renderizado quando count é 0 na variante count.",
    "examples": [
      "Badge dot — ponto de notificação na tab bar",
      "Badge count 1 — 1 mensagem não lida",
      "Badge count 5 — contador de chats",
      "Badge count 99+ — cap de contagem alta"
    ]
  },
  {
    "id": "button",
    "name": "Button",
    "description": "Componente de botão com múltiplas variantes e estilos",
    "category": "atoms",
    "longDescription": "O componente Button oferece uma ampla variedade de estilos para diferentes contextos de uso, incluindo botões primários, secundários, de login social, notificações, filtros, pagamentos e ações específicas do sistema Pix. Cada variante é otimizada para seu caso de uso específico.",
    "examples": [
      "Button Primary - Ações principais como cadastrar e entrar",
      "Button Secondary - Ações secundárias como adicionar reservas",
      "Button Tertiary - Ações terciárias como reservar vaga",
      "Button Google - Login com conta Google",
      "Button Notification - Ícone de notificações",
      "Button Filter - Ícone de filtros",
      "Button Payment - Pagamento com Pix",
      "Button Card - Pagamento com cartão de crédito",
      "Button Pix Action - Ações específicas do Pix",
      "Button Pix Action Danger - Ações de cancelamento Pix",
      "Button Pix Copy - Copiar código Pix",
      "Button Pix Cancel - Cancelar pagamento"
    ]
  },
  {
    "id": "calendar",
    "name": "Calendar",
    "description": "Calendário mensal para seleção de datas com suporte a múltipla seleção",
    "category": "atoms",
    "longDescription": "O componente Calendar exibe um calendário mensal completo com grid de 7 colunas. Permite selecionar múltiplas datas (toggle: clicar novamente desseleciona). Destaca o dia de hoje com borda colorida e os dias selecionados com fundo azul. Dias de outros meses são exibidos em cinza e não são selecionáveis.",
    "examples": [
      "Calendar mês atual com hoje destacado",
      "Calendar com um dia selecionado (fundo azul)",
      "Calendar com múltiplos dias selecionados",
      "Calendar sem highlight de hoje"
    ]
  },
  {
    "id": "checkbox",
    "name": "Checkbox",
    "description": "Caixa de seleção customizada para listas e formulários",
    "category": "atoms",
    "longDescription": "O componente Checkbox é uma caixa de seleção visual customizada que substitui o checkbox nativo. Exibe um check branco sobre fundo azul quando marcado. Usado na tela de pagamento para seleção de estacionamentos. Implementa ControlValueAccessor para integração com formulários Angular.",
    "examples": [
      "Checkbox desmarcado — estacionamento não selecionado",
      "Checkbox marcado — estacionamento selecionado (fundo azul com check)",
      "Checkbox disabled — opção não selecionável"
    ]
  },
  {
    "id": "chip",
    "name": "Chip",
    "description": "Componente de chip para exibir informações compactas",
    "category": "atoms",
    "longDescription": "O componente Chip é ideal para exibir informações compactas e categorizadas, como atributos, avaliações, distâncias, contadores de mensagens, disponibilidade de vagas, filtros de reservas e status de processamento. Suporta diferentes estados visuais e variantes contextuais.",
    "examples": [
      "Chip Attribute - Exibir atributos como \"Coberto\"",
      "Chip Rating - Mostrar avaliações com estrelas",
      "Chip Distance - Exibir distância com subtexto",
      "Chip Chat - Contador de mensagens",
      "Chip Parking Spots - Disponibilidade de vagas",
      "Chip Reservation Filter - Filtros de reserva com estado ativo/inativo",
      "Chip Status - Indicadores de status (pendente, concluído, em andamento)"
    ]
  },
  {
    "id": "garage-card",
    "name": "Garage Card",
    "description": "Card de exibição de garagem/vaga com variantes para listagem e propriedade",
    "category": "atoms",
    "longDescription": "O componente GarageCard exibe as informações de uma garagem ou vaga de estacionamento. Na variante 'listing', apresenta thumbnail, nome, endereço, avaliação, distância, vagas disponíveis e preço — usado na lista de vagas próximas da Home. Na variante 'owned', exibe imagem full-width com badge de status (ativo/inativo), além de ganhos e reservas do mês — usado no perfil do proprietário.",
    "examples": [
      "GarageCard listing — 14 vagas, R$8/h, 0.2 mi",
      "GarageCard listing — 3 vagas (amarelo warning), R$10/h",
      "GarageCard listing — 1 vaga (vermelho urgente), R$15/h",
      "GarageCard owned ativo — $846,50 ganho este mês, 23 reservas",
      "GarageCard owned inativo — garagem desativada"
    ]
  },
  {
    "id": "icon",
    "name": "Icon",
    "description": "Wrapper semântico para ícones SVG do sistema",
    "category": "atoms",
    "longDescription": "O componente Icon é um wrapper padronizado para todos os ícones SVG do Design System do Estaciona AI. Mapeia um nome simbólico (ex: 'home', 'car', 'bell') para o arquivo SVG correspondente em assets/icons/, aplicando o tamanho correto automaticamente. Centraliza o catálogo completo de ícones do app.",
    "examples": [
      "Icon home tamanho md — tab bar Início",
      "Icon booking — tab bar Reservas",
      "Icon payment — tab bar Pagamento",
      "Icon chat-tab — tab bar Chat",
      "Icon profile — tab bar Perfil",
      "Icon back-arrow — botão voltar",
      "Icon chevron-right — navegação em lista",
      "Icon car tamanho lg — card de veículo",
      "Icon wallet — item de perfil conta",
      "Icon bell — item de perfil notificações"
    ]
  },
  {
    "id": "input",
    "name": "Input",
    "description": "Componente de entrada de texto com validação e máscaras",
    "category": "atoms",
    "longDescription": "O componente Input é um elemento fundamental de formulário que oferece suporte a diversos tipos de entrada como texto, e-mail, telefone, senha e busca. Inclui validação automática, máscaras de formatação, ícones contextuais e estados de erro.",
    "examples": [
      "Input de texto simples com placeholder",
      "Input de e-mail com validação automática",
      "Input de telefone com máscara (DDD) NNNNN-NNNN",
      "Input de senha com toggle de visibilidade",
      "Input de busca com resultados em tempo real",
      "Input com ícones contextuais (user, email, phone, password, search)",
      "Input com botão de enviar (chat)",
      "Input com estados de erro e desabilitado"
    ]
  },
  {
    "id": "label",
    "name": "Label",
    "description": "Átomo de tipografia para padronizar textos e títulos do design system",
    "category": "atoms",
    "longDescription": "O componente Label padroniza todos os estilos tipográficos do Estaciona AI em um único átomo reutilizável. Renderiza o elemento HTML semântico correto (h2, h3, p, span, label) de acordo com a variante, garantindo consistência visual em todo o app.",
    "examples": [
      "Label heading — Título de tela 'Onde vai estacionar hoje?'",
      "Label subheading — Subtítulo 'Vagas mais próximas de acordo com seu endereço'",
      "Label body — Textos corridos e descrições",
      "Label caption — Textos auxiliares pequenos como endereço e horário",
      "Label price — Preços destacados 'R$8/h'",
      "Label label — Rótulos de formulário"
    ]
  },
  {
    "id": "toggle",
    "name": "Toggle",
    "description": "Switch on/off animado para configurações e preferências",
    "category": "atoms",
    "longDescription": "O componente Toggle é um switch visual animado, ideal para configurações binárias como Dark Mode, Notificações e Idioma. Implementa ControlValueAccessor para integração com Reactive Forms e Template-driven Forms. Acessível com role='switch' e aria-checked.",
    "examples": [
      "Toggle off — Dark Mode desativado",
      "Toggle on — Notificações ativas",
      "Toggle on — Idioma Português ativo",
      "Toggle disabled — opção não disponível"
    ]
  }
];
