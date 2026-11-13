# Payment garage card (`app-payment-garage-card`)

**Camada:** molecule  
**Arquivos:** `payment-garage-card.ts`, `payment-garage-card.html`, `payment-garage-card.scss`, `payment-garage-card.spec.ts`

## Responsabilidade

Apresenta uma garagem elegível para pagamento e comunica a seleção pelo identificador da reserva.

## Composição

Usa os atoms `app-image` e `app-selection-control`. O controle interno não navega: seleção é encaminhada ao componente pai.

## API

| API | Tipo | Descrição |
|---|---|---|
| Input `booking` | `BookingItem` obrigatório | Garagem e reserva representadas |
| Input `selected` | `boolean`, padrão `false` | Estado visual de seleção |
| Output `selectedChange` | `string` | ID da reserva selecionada |

## Uso

```html
<app-payment-garage-card
  [booking]="candidate"
  [selected]="selectedBookingId() === candidate.id"
  (selectedChange)="selectCandidate($event)">
</app-payment-garage-card>
```

## Testes

`payment-garage-card.spec.ts` verifica a emissão do ID ao selecionar o card. Execute com `npm test -- --watch=false`.
