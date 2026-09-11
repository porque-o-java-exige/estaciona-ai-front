# Badge Component

## O que é
O componente Badge é um indicador numérico ou pontual para sobrepor a ícones e elementos, como notificações ou mensagens.

## Estrutura da pasta
```text
badge/
├── badge.ts
├── badge.html
├── badge.scss
├── badge.spec.ts
├── badge.component.meta.json
└── BADGE.md
```

## Funcionalidades
| Feature | Descrição |
|---|---|
| Contador numérico | Exibe números com limite de 99+. |
| Ponto de notificação | Variante "dot" para indicadores simples, sem número. |
| Ocultar se zero | A variante 'count' se oculta caso o número seja 0. |

## Como usar
```html
<div style="position: relative">
  <img src="icon.svg" />
  <app-badge variant="count" [count]="5"></app-badge>
</div>
```

## Inputs disponíveis
| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `'dot' \| 'count'` | `'count'` | Tipo de badge. |
| `count` | `number` | `0` | Número exibido (oculto se 0 e variante for `count`). |
