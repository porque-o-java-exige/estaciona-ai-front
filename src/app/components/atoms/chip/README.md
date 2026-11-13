# Chip (`app-chip`)

**Camada:** atom  
**Arquivos:** `chip.ts`, `chip.html`, `chip.scss`, `chip.spec.ts`

## Responsabilidade

Exibe um rótulo compacto de atributo, nota, distância, disponibilidade, status ou filtro. Seu `variant` determina a apresentação; não realiza ações nem navegação.

## API

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `chipVariant` | `'attribute'` | `attribute`, `availability`, `rating`, `distance`, `parking-spots`, `reservation-filter` ou `status` |
| `text` | `string` | obrigatório | Conteúdo principal |
| `subtext` | `string` | `''` | Complemento opcional |
| `isActive` | `boolean` | `false` | Ativa o visual do filtro |
| `isPendingOrDone` | `boolean` | `false` | Aplica a tonalidade alternativa de status |
| `tone` | `'high' \| 'medium' \| 'low'` | `'high'` | Nível de disponibilidade |

Não possui outputs.

## Uso

```html
<app-chip variant="rating" [text]="garage.rating.toString()" [subtext]="reviews"></app-chip>
<app-chip
  variant="availability"
  [tone]="garage.availabilityLevel"
  [text]="spotsLabel">
</app-chip>
```

Para filtros interativos, prefira a molecule `app-filter-tabs`, que envolve o chip/ação em um controle acessível. Ícones de variantes são resolvidos pelo catálogo em `assets/icons/svg/`.

## Testes

`chip.spec.ts` cobre a criação. Execute com `npm test -- --watch=false`.
