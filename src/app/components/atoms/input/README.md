# 📥 InputComponent — `app-input`

> **Responsável:** Gabriel Vereda  
> **Branch:** `feat/input-component`  
> **Projeto:** Estaciona AI — Front-end  
> **Tipo:** Átomo (Design System)

---

## 📌 O que é este componente?

O `InputComponent` é o campo de entrada de texto reutilizável do projeto **Estaciona AI**. Ele foi construído como um átomo do Design System da aplicação, seguindo os princípios de Atomic Design.

O componente é **totalmente integrado com Reactive Forms do Angular** (via `ControlValueAccessor`) e usa a API moderna de **Signals** do Angular 19+.

---

## 🗂️ Estrutura da pasta

```
input/
├── input.ts          # Lógica do componente (signals, inputs, outputs)
├── input.html        # Template com control flow moderno (@if / @for)
├── input.scss        # Estilos escopados + variáveis do design system global
├── input.spec.ts     # Testes unitários com Vitest
└── README.md         # Este arquivo
```

---

## ⚙️ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Ícone à esquerda | `user`, `email`, `phone`, `password`, `search` ou `none` |
| Toggle de senha | Botão de olhinho para mostrar/ocultar senha |
| Botão de enviar | Ícone de seta para uso no campo de chat |
| Estado de erro | Borda vermelha + mensagem de erro abaixo |
| Hint | Texto de ajuda exibido abaixo do campo |
| Disabled | Campo desabilitado visualmente e funcionalmente |
| Reactive Forms | Compatível com `FormControl` e `ngModel` |

---

## 🧩 Como usar

```html
<!-- Input simples -->
<app-input placeholder="Digite seu nome" hint="Ex: Gabriel Vereda" />

<!-- Input de e-mail -->
<app-input type="email" icon="email" placeholder="E-mail" />

<!-- Input de senha -->
<app-input type="password" icon="password" placeholder="Senha" />

<!-- Input de busca -->
<app-input type="search" icon="search" placeholder="Buscar..." />

<!-- Input de chat (com botão de enviar) -->
<app-input [showSendButton]="true" placeholder="Mensagem..." (send)="onSend($event)" />

<!-- Com erro -->
<app-input errorMessage="Campo obrigatório" />

<!-- Desabilitado -->
<app-input [disabled]="true" />

<!-- Com Reactive Forms -->
<app-input [formControl]="meuControl" />
```

---

## 📥 Inputs disponíveis

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `type` | `InputHtmlType` | `'text'` | Tipo HTML do input |
| `icon` | `InputIconType` | `'none'` | Ícone à esquerda |
| `placeholder` | `string` | `''` | Placeholder do campo |
| `hint` | `string` | `''` | Texto de ajuda abaixo |
| `errorMessage` | `string` | `''` | Mensagem de erro |
| `disabled` | `boolean` | `false` | Desabilita o campo |
| `inputId` | `string` | `''` | ID HTML do input |
| `showSendButton` | `boolean` | `false` | Exibe botão de enviar |

## 📤 Outputs

| Output | Tipo | Descrição |
|---|---|---|
| `send` | `string` | Emitido ao clicar no botão de enviar ou pressionar Enter (apenas com `showSendButton`) |

---

## 🎨 Tela de demonstração

> Execute `ng serve` e acesse [http://localhost:4200](http://localhost:4200) para visualizar todos os exemplos na tela de testes.

<!-- Adicione aqui um screenshot da tela de demo quando estiver pronto -->

---

## 🧪 Testes

```bash
npm test
```

- **14 testes** passando no total (2 em `app.spec.ts` + 12 em `input.spec.ts`)
- Cobre: criação, placeholder, digitação, hint/erro, toggle de senha, botão de enviar, integração com Reactive Forms

---

## 🤝 Contribuição no projeto

Este componente compõe a camada de **átomos** do Design System do **Estaciona AI** junto com:

- `app-chip` — *Vinícius Go_Brasil* (tags/filtros)
- `app-button` — *Gabriel (buttons)* (botões da aplicação)

As cores e variáveis globais usadas neste componente vêm do arquivo `src/styles/_variables.scss`, mantido pelo líder de front **Vinícius Go_Brasil**.
