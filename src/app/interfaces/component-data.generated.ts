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
  }
];
