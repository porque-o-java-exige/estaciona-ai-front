# Header (`app-header`)

**Camada:** organism  
**Arquivos:** `header.ts`, `header.html`, `header.scss`, `header.spec.ts`

## Responsabilidade

Cabeçalho global com marca, busca de garagens, acesso a filtros e notificações, além das informações do usuário.

## Composição

Usa `app-logo`, `app-input` e `app-button`, `FormsModule` e navegação do Angular.

## API

| Output | Tipo | Descrição |
|---|---|---|
| `filterClick` | `void` | Emitido quando a ação de filtros é ativada |
| `notificationClick` | `void` | Emitido quando o painel de notificações é alternado |

Não recebe inputs. A busca escreve em `GarageService`; usuário vem de `AuthService`. Notificações são atualmente dados mockados no componente e abrem em um diálogo modal centralizado.

## Uso

```html
<app-header></app-header>
```

## Testes

`header.spec.ts` cobre a criação. Execute com `npm test -- --watch=false`.
