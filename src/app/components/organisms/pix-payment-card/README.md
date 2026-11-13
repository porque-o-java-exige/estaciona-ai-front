# PIX payment card (`app-pix-payment-card`)

**Camada:** organism  
**Arquivos:** `pix-payment-card.ts`, `pix-payment-card.html`, `pix-payment-card.scss`, `pix-payment-card.spec.ts`

## Responsabilidade

Apresenta o valor e código PIX, permite copiar o código com confirmação visual e pede confirmação antes de cancelar o pagamento.

## Composição

Usa `app-button`, o elemento nativo `dialog` e a API de clipboard/popover do navegador com estado visual de confirmação.

## API

| API | Tipo | Descrição |
|---|---|---|
| Input `amount` | `number` obrigatório | Total a pagar |
| Input `pixCode` | `string` obrigatório | Código para copiar |
| Output `cancelConfirmed` | `void` | Emitido apenas após confirmar o cancelamento |
| Output `paymentConfirmed` | `void` | Reservado para confirmação de pagamento |

Ao destruir o componente, o timer da confirmação é cancelado.

## Uso

```html
<app-pix-payment-card
  [amount]="finalTotal()"
  [pixCode]="pixCode()"
  (cancelConfirmed)="cancelPix()">
</app-pix-payment-card>
```

## Testes

`pix-payment-card.spec.ts` cobre a criação e o fluxo de copiar/cancelar. Execute com `npm test -- --watch=false`.
