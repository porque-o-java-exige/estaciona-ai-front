# 🏷️ ChipComponent — `app-chip`

> **Responsável:** Go_Brasil
> **Projeto:** Estaciona AI — Front-end
> **Tipo:** Atom (Design System)

---

## 📌 O que é este componente?

O `chip-component` é o elemento visual do Design System do **Estaciona AI** usado para exibir informações compactas e categorizadas — atributos de um estacionamento, avaliações, distância, contadores de mensagens, disponibilidade de vagas, filtros de reserva e status de processamento.

O componente usa a API moderna de **Signals** do Angular (`input()` e `computed()`) e resolve automaticamente os ícones de cada variante.

---

## 🗂️ Estrutura da pasta

```
chip/
├── chip.ts          # Lógica do componente (variantes, ícones, estados)
├── chip.html         # Template
├── chip.scss         # Estilos escopados + variáveis do design system global
├── chip.spec.ts      # Testes unitários com Vitest
└── CHIP.md           # Este arquivo
```

---

## ⚙️ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 7 variantes visuais | Uma classe CSS (`chip-{variant}`) pra cada estilo de chip do app |
| Ícones automáticos | Variantes `rating`, `distance` e `chat` já exibem ícone(s), sem configuração extra |
| Subtexto opcional | Texto auxiliar menor, exibido ao lado do texto principal (ex: tempo estimado na variante `distance`) |
| Estado ativo | Na variante `reservation-filter`, aplica a classe `is-active` quando selecionado |
| Estado pendente/concluído | Na variante `status`, aplica a classe `is-pending-or-done` para diferenciar visualmente do estado "em andamento" |

---

## 🎨 Variantes disponíveis

| Variante | Ícone(s) automático(s) | Uso sugerido |
|---|---|---|
| `attribute` | — | Atributos do estacionamento, ex: "Coberto" |
| `rating` | 5x `star-icon.svg` | Avaliação em estrelas |
| `distance` | `distance-icon.svg` | Distância até o local, com `subtext` opcional (ex: tempo estimado) |
| `chat` | `chat-icon.svg` | Contador de mensagens |
| `parking-spots` | — | Disponibilidade de vagas |
| `reservation-filter` | — | Filtro de reserva (usa `isActive` para estado ativo/inativo) |
| `status` | — | Status de processamento (usa `isPendingOrDone` para diferenciar "pendente/concluído" de "em andamento") |

---

## 🧩 Como usar

```html
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
```

---

## 📥 Inputs disponíveis

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `chipVariant` | `'attribute'` | Define o estilo visual e os ícones automáticos do chip |
| `text` | `string` (obrigatório) | — | Texto principal exibido no chip |
| `subtext` | `string` | `''` | Texto auxiliar, exibido ao lado do texto principal quando presente |
| `isActive` | `boolean` | `false` | Usado apenas na variante `reservation-filter`, aplica o estado visual ativo |
| `isPendingOrDone` | `boolean` | `false` | Usado apenas na variante `status`, aplica o estado visual de pendente/concluído |

## 📤 Outputs

Nenhum output próprio no momento — o `app-chip` é puramente exibicional (display-only). Para reagir a cliques (ex.: selecionar um filtro), use um `(click)` diretamente na tag `<app-chip>` do lado de fora.

---

## 🧪 Testes

```bash
npm test
```

- Cobertura atual (`chip.spec.ts`): criação do componente.
- **Pendente:** testes cobrindo cada variante, a renderização condicional dos ícones, o `subtext` e os estados `isActive`/`isPendingOrDone`.

---

## 📄 Baixando esta documentação

Este arquivo também pode ser baixado direto pela página de detalhe do componente Chip, dentro do site do Design System (`/component/chip`), através do botão **"Baixar documentação"** no topo da página.

---

## 🤝 Contribuição no projeto

Este componente compõe a camada de **átomos** do Design System do **Estaciona AI** junto com:

- `app-input` — *BielVereda* (inputs)
- `app-button` — *GabrielLima1534* (buttons)

As cores e variáveis globais usadas neste componente vêm do arquivo `src/styles/_variables.scss`, mantido pelo líder de front-end **Go_Brasil**.
