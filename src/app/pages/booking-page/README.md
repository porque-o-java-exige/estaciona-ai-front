# Booking page (`app-booking-page`)

**Rota:** `/booking`  
**Arquivos:** `booking-page.ts`, `booking-page.html`, `booking-page.scss`, `booking-page.spec.ts`

## Responsabilidade

Lista as reservas do usuário, permite filtrá-las por status e encaminha a reserva selecionada para pagamento.

## Composição e estado

Usa `app-filter-tabs`, `app-booking-card` e `app-footer`. Lê reservas, opções e filtro ativo de `BookingService`; ao selecionar uma reserva, atualiza a seleção no serviço.

## Interações

- Seleção de um filtro chama `BookingService.setFilter`.
- Seleção de um card chama `BookingService.selectBooking`.
- O card fornece o link para `/payment?bookingId=<id>`.
- Sem resultados, exibe estado vazio.

## Testes

`booking-page.spec.ts` valida renderização e filtros. Execute com `npm test -- --watch=false`.
