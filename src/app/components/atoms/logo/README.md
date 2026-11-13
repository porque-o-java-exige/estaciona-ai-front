# Logo (`app-logo`)

**Camada:** atom  
**Arquivos:** `logo.ts`, `logo.html`, `logo.scss`, `logo.spec.ts`

## Responsabilidade

Exibe a marca Estaciona AI em tamanhos padronizados e permite que ela navegue para uma rota.

## API

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `size` | `LogoSize` (`sm`, `md`, `lg`) | `'sm'` | Variante dimensional |
| `linkTo` | `string` | `'/home'` | Destino do link |

Não possui outputs.

## Uso

```html
<app-logo size="md" linkTo="/sign-in"></app-logo>
```

O símbolo SVG da marca fica em `assets/logos/svg/estaciona-ai-symbol.svg`. O texto acessível do link descreve a ação de retornar ao início.

## Testes

`logo.spec.ts` verifica a criação. Execute com `npm test -- --watch=false`.
