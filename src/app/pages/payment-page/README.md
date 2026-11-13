# Payment page (`app-payment-page`)

**Rotas:** `/payment`, `/payment/pix`  
**Arquivos:** `payment-page.ts`, `payment-page.html`, `payment-page.scss`, `payment-page.spec.ts`

## Responsabilidade

Coordena seleção de reserva, cobrança por dia ou hora, cálculo do total, escolha do meio de pagamento e etapa PIX.

## Composição e estado

Usa `app-payment-garage-card`, `app-payment-checkout`, `app-pix-payment-card` e `app-footer`. Estado de reservas, duração, valores e métodos é mantido por `BookingService`.

## Interações

- `bookingId` em query params seleciona a reserva.
- `/payment/pix` ou `?pix=true` abre a etapa PIX.
- PIX exibe o código do serviço; cancelar retorna à seleção.
- Pagamento não PIX marca a reserva paga e retorna a `/booking`.

## Testes

`payment-page.spec.ts` cobre os fluxos de cobrança e pagamento. Execute com `npm test -- --watch=false`.
