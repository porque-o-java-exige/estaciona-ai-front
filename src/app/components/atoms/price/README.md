# Price (`app-price`)

**Camada:** atom  
**Arquivos:** `price.ts`, `price.html`, `price.scss`, `price.spec.ts`

## Responsabilidade

Apresenta um valor monetário formatado, com moeda e sufixo opcionais. Não calcula tarifas, descontos ou totais.

## API

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `amount` | `number` | obrigatório | Valor numérico |
| `currency` | `string` | `'R$'` | Prefixo monetário |
| `suffix` | `string` | `''` | Complemento, por exemplo `/h` |
| `appearance` | `'compact' \| 'prominent'` | `'compact'` | Estilo de apresentação |

Inteiros são exibidos sem casas decimais; valores fracionários usam duas casas e vírgula decimal.

## Uso

```html
<app-price [amount]="garage.hourlyPrice" suffix="/h"></app-price>
<app-price [amount]="booking.totalAmount" currency="R$ " appearance="prominent"></app-price>
```

## Testes

`price.spec.ts` verifica a formatação de moeda e sufixo. Execute com `npm test -- --watch=false`.
