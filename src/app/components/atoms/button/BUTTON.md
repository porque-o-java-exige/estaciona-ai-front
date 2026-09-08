# 🔘 ButtonComponent — `app-button`

> **Responsável:** GabrielLima1534
> **Projeto:** Estaciona AI — Front-end
> **Tipo:** Atom (Design System)

---

## 📌 O que é este componente?

O `button-component` é o botão reutilizável do Design System do **Estaciona AI**. Ele foi construído como um átomo, oferecendo uma variante de estilo pronta pra cada contexto de uso da aplicação — desde ações principais até ações específicas do fluxo de pagamento via Pix.

O componente usa a API moderna de **Signals** do Angular (`input()` e `computed()`) e resolve automaticamente qual ícone exibir com base na variante escolhida.

---

## 🗂️ Estrutura da pasta

```
button/
├── button.ts          # Lógica do componente (variantes, ícone automático)
├── button.html         # Template
├── button.scss         # Estilos escopados + variáveis do design system global
├── button.spec.ts      # Testes unitários com Vitest
└── BUTTON.md           # Este arquivo
```

---

## ⚙️ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 12 variantes visuais | Uma classe CSS (`button-{variant}`) pra cada estilo de botão do app |
| Ícone automático | Algumas variantes (Google, Notification, Filter, Payment, Card, Pix Copy) já exibem um ícone à esquerda do texto, sem precisar configurar nada |
| Texto customizável | O texto do botão é 100% controlado por quem usa o componente |

---

## 🎨 Variantes disponíveis

| Variante | Ícone automático | Uso sugerido |
|---|---|---|
| `primary` | — | Ações principais, como cadastrar e entrar |
| `secondary` | — | Ações secundárias, como adicionar reservas |
| `tertiary` | — | Ações terciárias, como reservar vaga |
| `google` | `google-icon.svg` | Login com conta Google |
| `notification` | `notification-icon.svg` | Ícone de notificações |
| `filter` | `filter-icon.svg` | Ícone de filtros |
| `payment` | `pix-icon.svg` | Pagamento com Pix |
| `card` | `card-icon.svg` | Pagamento com cartão de crédito |
| `pix-action` | — | Ações específicas do fluxo Pix |
| `pix-action-danger` | — | Ações de cancelamento no fluxo Pix |
| `pix-copy` | `pix-icon.svg` | Copiar código Pix |
| `pix-cancel` | — | Cancelar pagamento |

> Os ícones ficam em `assets/icons/` e são resolvidos automaticamente pelo mapa `variantIcon` dentro de `button.ts`. Pra adicionar/trocar o ícone de uma variante, basta editar esse mapa.

---

## 🧩 Como usar

```html
<!-- Botão primário -->
<app-button variant="primary" text="Cadastrar"></app-button>

<!-- Botão secundário -->
<app-button variant="secondary" text="Adicionar reserva"></app-button>

<!-- Login social (com ícone automático) -->
<app-button variant="google" text="Entrar com Google"></app-button>

<!-- Pagamento Pix (com ícone automático) -->
<app-button variant="payment" text="Pagar com Pix"></app-button>

<!-- Ação de cancelamento Pix -->
<app-button variant="pix-action-danger" text="Cancelar Pix"></app-button>
```

---

## 📥 Inputs disponíveis

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `buttonVariant` | `'primary'` | Define o estilo visual e o ícone automático do botão |
| `text` | `string` | `''` | Texto exibido dentro do botão |

## 📤 Outputs

Nenhum output próprio no momento — o clique é tratado nativamente pelo `<button>` interno. Para reagir ao clique, use um `(click)` diretamente na tag `<app-button>` do lado de fora (ex.: `<app-button (click)="minhaAcao()" ...></app-button>`), já que o Angular propaga eventos nativos do host.

> **Melhoria futura sugerida:** expor um `output<void>() disabled` e um estado de `loading`, hoje o componente não trata esses casos.

---

## 🧪 Testes

```bash
npm test
```

- Cobertura atual (`button.spec.ts`): criação do componente.
- **Pendente:** testes cobrindo cada variante, a renderização condicional do ícone e o texto exibido.

---

## 📄 Baixando esta documentação

Este arquivo também pode ser baixado direto pela página de detalhe do componente Button, dentro do site do Design System (`/component/button`), através do botão **"Baixar documentação"** no topo da página.

---

## 🤝 Contribuição no projeto

Este componente compõe a camada de **átomos** do Design System do **Estaciona AI** junto com:

- `app-input` — *BielVereda* (inputs)
- `app-chip` — *Go_Brasil* (chips)

As cores e variáveis globais usadas neste componente vêm do arquivo `src/styles/_variables.scss`, mantido pelo líder de front-end **Go_Brasil**.
