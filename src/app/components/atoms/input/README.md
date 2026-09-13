# 📥 InputComponent — `app-input`

> **Responsável:** BielVereda  
> **Branch:** `feat/input-component`  
> **Projeto:** Estaciona AI — Front-end  
> **Tipo:** Atom (Design System)

---

## 📌 O que é este componente?

O `input-component` é o campo de entrada de texto reutilizável do projeto **Estaciona AI**. Ele foi construído como um átomo do Design System da aplicação, seguindo os princípios de Atomic Design.

O componente é **totalmente integrado com Reactive Forms do Angular** (via `ControlValueAccessor` + `Validator`) e usa a API moderna de **Signals** do Angular 19+.

---

## 🗂️ Estrutura da pasta

```
input/
├── input.ts              # Lógica do componente (signals, inputs, outputs)
├── input.html             # Template com control flow moderno (@if / @for)
├── input.scss              # Estilos escopados + variáveis do design system global
├── input.spec.ts           # Testes unitários com Vitest
├── countries.ts            # Lista de países + DDI, usada no input de telefone
├── search-mock-data.ts     # Lista fictícia de resultados, usada no input de busca
├── demo-completa.png       # Screenshot da tela de testes com todos os inputs (ver seção abaixo)
└── README.md               # Este arquivo
```

---

## ⚙️ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Ícone à esquerda | `user`, `email`, `phone`, `password`, `search` ou `none` |
| Toggle de senha | Botão de olhinho para mostrar/ocultar senha |
| Botão de enviar | Ícone de seta para uso no campo de chat |
| Estado de erro | Borda vermelha + mensagem de erro abaixo |
| Hint | Texto de ajuda exibido abaixo do campo (some quando há erro) |
| Disabled | Campo desabilitado visualmente e funcionalmente |
| Reactive Forms | Compatível com `FormControl` e `ngModel` |
| **Validação de e-mail** | Com `type="email"`, exige o formato `algo@provedor.algumaCoisa` (aceita múltiplos pontos, ex: `sme.prefeitura.br`). Não valida o domínio final — quem confirma de verdade é o e-mail de verificação enviado pelo back-end |
| **Telefone com país** | Com `type="tel"`, mostra um seletor de país (`countries.ts`) e aplica máscara `(DDD) NNNNN-NNNN` automaticamente. O valor enviado pro `FormControl`/back-end já sai compactado (ex: `+55 (11) 91335-9082` → `5511913359082`) |
| **Sugestões de busca** | Com `icon="search"`, mostra até 3 resultados que combinam com o texto digitado, a partir de uma lista mockada em `search-mock-data.ts` |

---

## 🧩 Como usar

```html
<!-- Input simples -->
<app-input placeholder="Digite seu nome" hint="Ex: Gabriel Vereda" />

<!-- Input de e-mail (valida automaticamente o formato algo@provedor.algo) -->
<app-input type="email" icon="email" placeholder="E-mail" hint="Exemplo: teste@email.com" />

<!-- Input de senha -->
<app-input type="password" icon="password" placeholder="Senha" />

<!-- Input de busca (mostra até 3 sugestões mockadas) -->
<app-input type="search" icon="search" placeholder="Buscar..." />

<!-- Input de telefone (com seletor de país e máscara automática) -->
<app-input type="tel" icon="phone" placeholder="(11) 99999-9999" />

<!-- Input de chat (com botão de enviar) -->
<app-input [isShowSendButton]="true" placeholder="Mensagem..." (send)="onSend($event)" />

<!-- Com erro -->
<app-input errorMessage="Campo obrigatório" />

<!-- Desabilitado -->
<app-input [isDisabled]="true" />

<!-- Com Reactive Forms (o e-mail já valida sozinho: control.errors?.invalidEmail) -->
<app-input type="email" icon="email" [formControl]="meuControl" />
```

> **Nota sobre o telefone:** o `FormControl`/`ngModel` recebe e envia o valor já compactado (só dígitos, com DDI), não o texto formatado que aparece na tela. Se precisar reidratar o campo (ex: `form.patchValue(...)`), basta passar essa mesma string compactada que o componente já reconstrói o país e a máscara sozinho.

---

## 📥 Inputs disponíveis

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `type` | `InputHtmlType` | `'text'` | Tipo HTML do input (`'tel'` e `'email'` ativam validações automáticas) |
| `icon` | `InputIconType` | `'none'` | Ícone à esquerda (`'search'` ativa as sugestões de busca) |
| `placeholder` | `string` | `''` | Placeholder do campo |
| `hint` | `string` | `''` | Texto de ajuda abaixo |
| `errorMessage` | `string` | `''` | Mensagem de erro manual (tem prioridade sobre a validação automática de e-mail) |
| `isDisabled` | `boolean` | `false` | Desabilita o campo |
| `inputId` | `string` | `''` | ID HTML do input |
| `isShowSendButton` | `boolean` | `false` | Exibe botão de enviar |

> A lista de países do input de telefone é fixa, vinda de `countries.ts` — não é configurável por `@Input` (ainda). Pra adicionar/remover país, é só editar esse arquivo.

## 📤 Outputs

| Output | Tipo | Descrição |
|---|---|---|
| `send` | `string` | Emitido ao clicar no botão de enviar ou pressionar Enter (apenas com `isShowSendButton`) |

---

## 📸 Tela de demonstração completa

Print da tela de testes (`app.html`) com todos os inputs juntos — texto simples, e-mail, senha, busca, telefone, chat, nome de usuário, erro e desabilitado.

Pra atualizar: rode `ng serve`, acesse [http://localhost:4200](http://localhost:4200), tire o print e salve o arquivo **nesta mesma pasta** com o nome `demo-completa.png` (substituindo o antigo). Não precisa mudar nada no README — a imagem abaixo é carregada direto desse arquivo.

![Tela de testes completa do InputComponent](./demo-completa.png)

---

## 🧪 Testes

```bash
npm test
```

- Cobertura atual (`input.spec.ts`): criação, placeholder, digitação, hint/erro, toggle de senha, botão de enviar, integração com Reactive Forms.
- **Pendente:** ainda não existem testes automatizados para as features novas (validação de e-mail, máscara/seletor de telefone e sugestões de busca) — recomendo adicionar antes de mergear.

---

## 🤝 Contribuição no projeto

Este componente compõe a camada de **átomos** do Design System do **Estaciona AI** junto com:

- `app-chip` — *Go_Brasil* (chips)
- `app-button` — *GabrielLima1534* (buttons)

As cores e variáveis globais usadas neste componente vêm do arquivo `src/styles/_variables.scss`, mantido pelo líder de front-end **Go_Brasil**.