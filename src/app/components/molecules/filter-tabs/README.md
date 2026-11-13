# Filter tabs (`app-filter-tabs`)

**Camada:** molecule  
**Arquivos:** `filter-tabs.ts`, `filter-tabs.html`, `filter-tabs.scss`, `filter-tabs.spec.ts`

## Responsabilidade

Apresenta um conjunto horizontal de opções de filtro. Encapsula os botões, estado visual ativo e acessibilidade; a filtragem continua sob responsabilidade do consumidor.

## Composição

Cada opção é um `app-button` com a variante `filter-option`.

## API

| API | Tipo | Descrição |
|---|---|---|
| Input `options` | `readonly T[]` obrigatório | Opções disponíveis (`T extends string`) |
| Input `activeOption` | `T` obrigatório | Opção selecionada |
| Input `ariaLabel` | `string` obrigatório | Rótulo acessível do grupo |
| Output `optionSelected` | `T` | Opção ativada pelo usuário |

## Uso

```html
<app-filter-tabs
  [options]="filterOptions"
  [activeOption]="activeFilter()"
  ariaLabel="Filtrar reservas por status"
  (optionSelected)="setFilter($event)">
</app-filter-tabs>
```

## Testes

`filter-tabs.spec.ts` valida a emissão da opção e o estado acessível. Execute com `npm test -- --watch=false`.
