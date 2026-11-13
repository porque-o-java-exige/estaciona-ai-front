# Payment checkout (`app-payment-checkout`)

**Camada:** organism  
**Arquivos:** `payment-checkout.ts`, `payment-checkout.html`, `payment-checkout.scss`

## Responsabilidade

Agrupa calendário ou duração por hora, resumo de valores, escolha do meio de pagamento e ação de pagar. Recebe o estado calculado e encaminha interações à página.

## Composição

Usa `app-button` para ações e `app-icon` para meios de pagamento.

## Inputs

`billingMode: BillingMode`, `selectedDays: readonly number[]`, `selectedHours: number`, `calendarDays: readonly number[]`, `weekDays: readonly string[]`, `paymentMethod: PaymentMethodType`, `walletBalance: number`, `baseSubtotal: number`, `serviceFee: number`, `discountAmount: number`, `finalTotal: number`, `payButtonVariant: buttonVariant` e `payButtonText: string`. Todos são obrigatórios.

## Outputs

`billingModeChange: BillingMode`, `calendarDayToggled: number`, `reserveSpot: void`, `hoursDecrement: void`, `hoursIncrement: void`, `paymentMethodChange: PaymentMethodType` e `paymentSubmitted: void`.

## Uso

```html
<app-payment-checkout
  [billingMode]="billingMode()"
  [selectedDays]="selectedDays()"
  [selectedHours]="selectedHours()"
  [calendarDays]="calendarDays"
  [weekDays]="weekDays"
  [paymentMethod]="paymentMethod()"
  [walletBalance]="walletBalance()"
  [baseSubtotal]="baseSubtotal()"
  [serviceFee]="serviceFee()"
  [discountAmount]="discountAmount()"
  [finalTotal]="finalTotal()"
  [payButtonVariant]="payButtonVariant()"
  [payButtonText]="payButtonText()"
  (paymentSubmitted)="submitPayment()">
</app-payment-checkout>
```
