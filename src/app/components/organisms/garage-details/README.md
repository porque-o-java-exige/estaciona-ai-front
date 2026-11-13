# Garage details (`app-garage-details`)

**Camada:** organism  
**Arquivos:** `garage-details.ts`, `garage-details.html`, `garage-details.scss`

## Responsabilidade

Apresenta os dados completos de uma garagem: foto, disponibilidade, preço diário, endereço, avaliação, características, proprietário e ações para chat e reserva.

## Composição

Usa os atoms `app-image`, `app-chip` e `app-button`.

## API

| API | Tipo | Descrição |
|---|---|---|
| Input `garage` | `GarageItem` obrigatório | Dados da garagem |
| Input `spotsRemainingText` | `string` obrigatório | Texto acessível da disponibilidade |
| Input `reviewsSubtext` | `string` obrigatório | Complemento da contagem de avaliações |
| Output `openChat` | `void` | Pedido para abrir conversa com proprietário |
| Output `addToBooking` | `void` | Pedido para criar/abrir reserva |

## Uso

```html
<app-garage-details
  [garage]="garage()"
  [spotsRemainingText]="spotsRemainingText()"
  [reviewsSubtext]="reviewsSubtext()"
  (openChat)="openChat()"
  (addToBooking)="addToBooking()">
</app-garage-details>
```

Navegação e alterações de estado ficam na página/serviços, não neste organism.
