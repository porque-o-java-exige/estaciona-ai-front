# Booking card (`app-booking-card`)

**Camada:** molecule  
**Arquivos:** `booking-card.ts`, `booking-card.html`, `booking-card.scss`, `booking-card.spec.ts`

## Responsabilidade

Resume uma `BookingItem` e fornece navegação à etapa de pagamento daquela reserva. A tonalidade e o rótulo do total dependem do status.

## Composição

Usa os atoms `app-chip`, `app-icon` e `app-price`, além de `RouterLink`.

## API

| API | Tipo | Descrição |
|---|---|---|
| Input `booking` | `BookingItem` obrigatório | Reserva apresentada |
| Output `cardSelect` | `BookingItem` | Emitido ao selecionar o card |

O card navega para `/payment?bookingId=<id>`. A composição do layout não deve ser duplicada na página.

## Uso

```html
<app-booking-card
  [booking]="booking"
  (cardSelect)="onSelectBooking($event)">
</app-booking-card>
```

## Testes

`booking-card.spec.ts` cobre a criação e renderização do status. Execute com `npm test -- --watch=false`.
