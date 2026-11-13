# Garage card (`app-garage-card`)

**Camada:** molecule  
**Arquivos:** `garage-card.ts`, `garage-card.html`, `garage-card.scss`, `garage-card.spec.ts`

## Responsabilidade

Exibe imagem, nome, endereço, disponibilidade, avaliação, distância e preço por hora de uma garagem. O card navega aos detalhes e emite a garagem escolhida.

## Composição

Usa `app-image`, `app-chip`, `app-icon` e `app-price`, combinados com `RouterLink`.

## API

| API | Tipo | Descrição |
|---|---|---|
| Input `garage` | `GarageItem` obrigatório | Garagem apresentada |
| Input `selected` | `boolean`, padrão `false` | Realça o card selecionado |
| Output `cardClick` | `GarageItem` | Emite a garagem ativada |

O destino de navegação é `/list/details?id=<garage.id>`. `spotsLabel` e `metaSummary` são derivados dos dados recebidos.

## Uso

```html
<app-garage-card
  [garage]="garage"
  [selected]="selectedGarageId() === garage.id"
  (cardClick)="onSelectGarage($event)">
</app-garage-card>
```

## Testes

`garage-card.spec.ts` verifica a criação e o rótulo de vagas. Execute com `npm test -- --watch=false`.
