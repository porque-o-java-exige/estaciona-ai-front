// Conteúdo dos arquivos de documentação (INPUT.md, BUTTON.md, CHIP.md),
// embarcado como texto para viabilizar o download client-side na página
// de detalhe do componente, sem depender da pipeline de assets do Angular.
//
// IMPORTANTE: se o conteúdo de INPUT.md / BUTTON.md / CHIP.md mudar, atualize
// as strings abaixo também (são a mesma documentação, só embarcada aqui).
export const COMPONENT_DOCS: Record<string, string> = {
  input: `# 📥 InputComponent — \`app-input\`

> **Responsável:** BielVereda
> **Branch:** \`feat/input-component\`
> **Projeto:** Estaciona AI — Front-end
> **Tipo:** Atom (Design System)

---

## 📌 O que é este componente?

O \`input-component\` é o campo de entrada de texto reutilizável do projeto **Estaciona AI**. Ele foi construído como um átomo do Design System da aplicação, seguindo os princípios de Atomic Design.

O componente é **totalmente integrado com Reactive Forms do Angular** (via \`ControlValueAccessor\` + \`Validator\`) e usa a API moderna de **Signals** do Angular 19+.

---

## 🗂️ Estrutura da pasta

\`\`\`
input/
├── input.ts              # Lógica do componente (signals, inputs, outputs)
├── input.html            # Template com control flow moderno (@if / @for)
├── input.scss            # Estilos escopados + variáveis do design system global
├── input.spec.ts         # Testes unitários com Vitest
├── countries.ts          # Lista de países + DDI, usada no input de telefone
├── search-mock-data.ts   # Lista fictícia de resultados, usada no input de busca
├── demo-completa.png     # Screenshot da tela de testes com todos os inputs
└── INPUT.md              # Este arquivo
\`\`\`

---

## ⚙️ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Ícone à esquerda | \`user\`, \`email\`, \`phone\`, \`password\`, \`search\` ou \`none\` |
| Toggle de senha | Botão de olhinho para mostrar/ocultar senha |
| Botão de enviar | Ícone de seta para uso no campo de chat |
| Estado de erro | Borda vermelha + mensagem de erro abaixo |
| Hint | Texto de ajuda exibido abaixo do campo (some quando há erro) |
| Disabled | Campo desabilitado visualmente e funcionalmente |
| Reactive Forms | Compatível com \`FormControl\` e \`ngModel\` |
| **Validação de e-mail** | Com \`type="email"\`, exige o formato \`algo@provedor.algumaCoisa\` (aceita múltiplos pontos, ex: \`sme.prefeitura.br\`). Não valida o domínio final — quem confirma de verdade é o e-mail de verificação enviado pelo back-end |
| **Telefone com país** | Com \`type="tel"\`, mostra um seletor de país (\`countries.ts\`) e aplica máscara \`(DDD) NNNNN-NNNN\` automaticamente. O valor enviado pro \`FormControl\`/back-end já sai compactado (ex: \`+55 (11) 91335-9082\` → \`5511913359082\`) |
| **Sugestões de busca** | Com \`icon="search"\`, mostra até 3 resultados que combinam com o texto digitado, a partir de uma lista mockada em \`search-mock-data.ts\` |

---

## 🧩 Como usar

\`\`\`html
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
\`\`\`

> **Nota sobre o telefone:** o \`FormControl\`/\`ngModel\` recebe e envia o valor já compactado (só dígitos, com DDI), não o texto formatado que aparece na tela. Se precisar reidratar o campo (ex: \`form.patchValue(...)\`), basta passar essa mesma string compactada que o componente já reconstrói o país e a máscara sozinho.

---

## 📥 Inputs disponíveis

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| \`type\` | \`InputHtmlType\` | \`'text'\` | Tipo HTML do input (\`'tel'\` e \`'email'\` ativam validações automáticas) |
| \`icon\` | \`InputIconType\` | \`'none'\` | Ícone à esquerda (\`'search'\` ativa as sugestões de busca) |
| \`placeholder\` | \`string\` | \`''\` | Placeholder do campo |
| \`hint\` | \`string\` | \`''\` | Texto de ajuda abaixo |
| \`errorMessage\` | \`string\` | \`''\` | Mensagem de erro manual (tem prioridade sobre a validação automática de e-mail) |
| \`isDisabled\` | \`boolean\` (model) | \`false\` | Desabilita o campo |
| \`inputId\` | \`string\` | \`''\` | ID HTML do input |
| \`isShowSendButton\` | \`boolean\` | \`false\` | Exibe botão de enviar |

> A lista de países do input de telefone é fixa, vinda de \`countries.ts\` — não é configurável por \`@Input\` (ainda). Pra adicionar/remover país, é só editar esse arquivo.

## 📤 Outputs

| Output | Tipo | Descrição |
|---|---|---|
| \`send\` | \`string\` | Emitido ao clicar no botão de enviar ou pressionar Enter (apenas com \`isShowSendButton\`) |

---

## 📸 Tela de demonstração completa

Print da tela de testes (\`app.html\`) com todos os inputs juntos — texto simples, e-mail, senha, busca, telefone, chat, nome de usuário, erro e desabilitado.

Pra atualizar: rode \`ng serve\`, acesse [http://localhost:4200](http://localhost:4200), tire o print e salve o arquivo **nesta mesma pasta** com o nome \`demo-completa.png\` (substituindo o antigo). Não precisa mudar nada neste arquivo — a imagem abaixo é carregada direto desse arquivo.

![Tela de testes completa do InputComponent](./demo-completa.png)

---

## 🧪 Testes

\`\`\`bash
npm test
\`\`\`

- Cobertura atual (\`input.spec.ts\`): criação, placeholder, digitação, hint/erro, toggle de senha, botão de enviar, integração com Reactive Forms.
- **Pendente:** ainda não existem testes automatizados para as features novas (validação de e-mail, máscara/seletor de telefone e sugestões de busca) — recomendo adicionar antes de mergear.

---

## 📄 Baixando esta documentação

Este arquivo também pode ser baixado direto pela página de detalhe do componente Input, dentro do site do Design System (\`/component/input\`), através do botão **"Baixar documentação"** no topo da página.

---

## 🤝 Contribuição no projeto

Este componente compõe a camada de **átomos** do Design System do **Estaciona AI** junto com:

- \`app-chip\` — *Go_Brasil* (chips)
- \`app-button\` — *GabrielLima1534* (buttons)

As cores e variáveis globais usadas neste componente vêm do arquivo \`src/styles/_variables.scss\`, mantido pelo líder de front-end **Go_Brasil**.
`,
  button: `# 🔘 ButtonComponent — \`app-button\`

> **Responsável:** GabrielLima1534
> **Projeto:** Estaciona AI — Front-end
> **Tipo:** Atom (Design System)

---

## 📌 O que é este componente?

O \`button-component\` é o botão reutilizável do Design System do **Estaciona AI**. Ele foi construído como um átomo, oferecendo uma variante de estilo pronta pra cada contexto de uso da aplicação — desde ações principais até ações específicas do fluxo de pagamento via Pix.

O componente usa a API moderna de **Signals** do Angular (\`input()\` e \`computed()\`) e resolve automaticamente qual ícone exibir com base na variante escolhida.

---

## 🗂️ Estrutura da pasta

\`\`\`
button/
├── button.ts          # Lógica do componente (variantes, ícone automático)
├── button.html         # Template
├── button.scss         # Estilos escopados + variáveis do design system global
├── button.spec.ts      # Testes unitários com Vitest
└── BUTTON.md           # Este arquivo
\`\`\`

---

## ⚙️ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 12 variantes visuais | Uma classe CSS (\`button-{variant}\`) pra cada estilo de botão do app |
| Ícone automático | Algumas variantes (Google, Notification, Filter, Payment, Card, Pix Copy) já exibem um ícone à esquerda do texto, sem precisar configurar nada |
| Texto customizável | O texto do botão é 100% controlado por quem usa o componente |

---

## 🎨 Variantes disponíveis

| Variante | Ícone automático | Uso sugerido |
|---|---|---|
| \`primary\` | — | Ações principais, como cadastrar e entrar |
| \`secondary\` | — | Ações secundárias, como adicionar reservas |
| \`tertiary\` | — | Ações terciárias, como reservar vaga |
| \`google\` | \`google-icon.svg\` | Login com conta Google |
| \`notification\` | \`notification-icon.svg\` | Ícone de notificações |
| \`filter\` | \`filter-icon.svg\` | Ícone de filtros |
| \`payment\` | \`pix-icon.svg\` | Pagamento com Pix |
| \`card\` | \`card-icon.svg\` | Pagamento com cartão de crédito |
| \`pix-action\` | — | Ações específicas do fluxo Pix |
| \`pix-action-danger\` | — | Ações de cancelamento no fluxo Pix |
| \`pix-copy\` | \`pix-icon.svg\` | Copiar código Pix |
| \`pix-cancel\` | — | Cancelar pagamento |

> Os ícones ficam em \`assets/icons/\` e são resolvidos automaticamente pelo mapa \`variantIcon\` dentro de \`button.ts\`. Pra adicionar/trocar o ícone de uma variante, basta editar esse mapa.

---

## 🧩 Como usar

\`\`\`html
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
\`\`\`

---

## 📥 Inputs disponíveis

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| \`variant\` | \`buttonVariant\` | \`'primary'\` | Define o estilo visual e o ícone automático do botão |
| \`text\` | \`string\` | \`''\` | Texto exibido dentro do botão |

## 📤 Outputs

Nenhum output próprio no momento — o clique é tratado nativamente pelo \`<button>\` interno. Para reagir ao clique, use um \`(click)\` diretamente na tag \`<app-button>\` do lado de fora (ex.: \`<app-button (click)="minhaAcao()" ...></app-button>\`), já que o Angular propaga eventos nativos do host.

> **Melhoria futura sugerida:** expor um \`output<void>() disabled\` e um estado de \`loading\`, hoje o componente não trata esses casos.

---

## 🧪 Testes

\`\`\`bash
npm test
\`\`\`

- Cobertura atual (\`button.spec.ts\`): criação do componente.
- **Pendente:** testes cobrindo cada variante, a renderização condicional do ícone e o texto exibido.

---

## 📄 Baixando esta documentação

Este arquivo também pode ser baixado direto pela página de detalhe do componente Button, dentro do site do Design System (\`/component/button\`), através do botão **"Baixar documentação"** no topo da página.

---

## 🤝 Contribuição no projeto

Este componente compõe a camada de **átomos** do Design System do **Estaciona AI** junto com:

- \`app-input\` — *BielVereda* (inputs)
- \`app-chip\` — *Go_Brasil* (chips)

As cores e variáveis globais usadas neste componente vêm do arquivo \`src/styles/_variables.scss\`, mantido pelo líder de front-end **Go_Brasil**.
`,
  chip: `# 🏷️ ChipComponent — \`app-chip\`

> **Responsável:** Go_Brasil
> **Projeto:** Estaciona AI — Front-end
> **Tipo:** Atom (Design System)

---

## 📌 O que é este componente?

O \`chip-component\` é o elemento visual do Design System do **Estaciona AI** usado para exibir informações compactas e categorizadas — atributos de um estacionamento, avaliações, distância, contadores de mensagens, disponibilidade de vagas, filtros de reserva e status de processamento.

O componente usa a API moderna de **Signals** do Angular (\`input()\` e \`computed()\`) e resolve automaticamente os ícones de cada variante.

---

## 🗂️ Estrutura da pasta

\`\`\`
chip/
├── chip.ts          # Lógica do componente (variantes, ícones, estados)
├── chip.html         # Template
├── chip.scss         # Estilos escopados + variáveis do design system global
├── chip.spec.ts      # Testes unitários com Vitest
└── CHIP.md           # Este arquivo
\`\`\`

---

## ⚙️ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 7 variantes visuais | Uma classe CSS (\`chip-{variant}\`) pra cada estilo de chip do app |
| Ícones automáticos | Variantes \`rating\`, \`distance\` e \`chat\` já exibem ícone(s), sem configuração extra |
| Subtexto opcional | Texto auxiliar menor, exibido ao lado do texto principal (ex: tempo estimado na variante \`distance\`) |
| Estado ativo | Na variante \`reservation-filter\`, aplica a classe \`is-active\` quando selecionado |
| Estado pendente/concluído | Na variante \`status\`, aplica a classe \`is-pending-or-done\` para diferenciar visualmente do estado "em andamento" |

---

## 🎨 Variantes disponíveis

| Variante | Ícone(s) automático(s) | Uso sugerido |
|---|---|---|
| \`attribute\` | — | Atributos do estacionamento, ex: "Coberto" |
| \`rating\` | 5x \`star-icon.svg\` | Avaliação em estrelas |
| \`distance\` | \`distance-icon.svg\` | Distância até o local, com \`subtext\` opcional (ex: tempo estimado) |
| \`chat\` | \`chat-icon.svg\` | Contador de mensagens |
| \`parking-spots\` | — | Disponibilidade de vagas |
| \`reservation-filter\` | — | Filtro de reserva (usa \`isActive\` para estado ativo/inativo) |
| \`status\` | — | Status de processamento (usa \`isPendingOrDone\` para diferenciar "pendente/concluído" de "em andamento") |

---

## 🧩 Como usar

\`\`\`html
<!-- Atributo -->
<app-chip variant="attribute" text="Coberto"></app-chip>

<!-- Avaliação -->
<app-chip variant="rating" text="4.5"></app-chip>

<!-- Distância, com subtexto -->
<app-chip variant="distance" text="2.5 km" subtext="5 min"></app-chip>

<!-- Contador de chat -->
<app-chip variant="chat" text="3 mensagens"></app-chip>

<!-- Vagas disponíveis -->
<app-chip variant="parking-spots" text="15 vagas"></app-chip>

<!-- Filtro de reserva (inativo/ativo) -->
<app-chip variant="reservation-filter" text="Hoje" [isActive]="false"></app-chip>
<app-chip variant="reservation-filter" text="Amanhã" [isActive]="true"></app-chip>

<!-- Status -->
<app-chip variant="status" text="Pendente" [isPendingOrDone]="true"></app-chip>
<app-chip variant="status" text="Em andamento" [isPendingOrDone]="false"></app-chip>
\`\`\`

---

## 📥 Inputs disponíveis

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| \`variant\` | \`chipVariant\` | \`'attribute'\` | Define o estilo visual e os ícones automáticos do chip |
| \`text\` | \`string\` (obrigatório) | — | Texto principal exibido no chip |
| \`subtext\` | \`string\` | \`''\` | Texto auxiliar, exibido ao lado do texto principal quando presente |
| \`isActive\` | \`boolean\` | \`false\` | Usado apenas na variante \`reservation-filter\`, aplica o estado visual ativo |
| \`isPendingOrDone\` | \`boolean\` | \`false\` | Usado apenas na variante \`status\`, aplica o estado visual de pendente/concluído |

## 📤 Outputs

Nenhum output próprio no momento — o \`app-chip\` é puramente exibicional (display-only). Para reagir a cliques (ex.: selecionar um filtro), use um \`(click)\` diretamente na tag \`<app-chip>\` do lado de fora.

---

## 🧪 Testes

\`\`\`bash
npm test
\`\`\`

- Cobertura atual (\`chip.spec.ts\`): criação do componente.
- **Pendente:** testes cobrindo cada variante, a renderização condicional dos ícones, o \`subtext\` e os estados \`isActive\`/\`isPendingOrDone\`.

---

## 📄 Baixando esta documentação

Este arquivo também pode ser baixado direto pela página de detalhe do componente Chip, dentro do site do Design System (\`/component/chip\`), através do botão **"Baixar documentação"** no topo da página.

---

## 🤝 Contribuição no projeto

Este componente compõe a camada de **átomos** do Design System do **Estaciona AI** junto com:

- \`app-input\` — *BielVereda* (inputs)
- \`app-button\` — *GabrielLima1534* (buttons)

As cores e variáveis globais usadas neste componente vêm do arquivo \`src/styles/_variables.scss\`, mantido pelo líder de front-end **Go_Brasil**.
`,
};