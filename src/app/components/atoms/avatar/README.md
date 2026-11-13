# Avatar (`app-avatar`)

**Camada:** atom  
**Arquivos:** `avatar.ts`, `avatar.html`, `avatar.scss`, `avatar.spec.ts`

## Responsabilidade

Renderiza uma imagem de pessoa com tamanho e indicadores opcionais de presença ou verificação. Centraliza o recorte, o posicionamento e o significado visual desses indicadores para uso em chat e perfil.

## API

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `src` | `string` | obrigatório | URL da imagem |
| `alt` | `string` | obrigatório | Texto alternativo da imagem |
| `size` | `number` | `48` | Largura e altura em pixels |
| `status` | `'online' \| 'busy' \| 'away' \| null` | `null` | Indicador de presença |
| `verified` | `boolean` | `false` | Exibe o selo de conta verificada |

Não possui outputs.

## Uso

```html
<app-avatar
  [src]="conversation.avatarUrl"
  [alt]="conversation.contactName"
  [size]="60"
  [status]="conversation.status">
</app-avatar>
```

O selo verificado usa `assets/images/png/verified-check-badge.png`. Use `alt=""` somente quando o avatar for decorativo e não carregar informação que já esteja disponível em texto adjacente.

## Testes

`avatar.spec.ts` valida texto alternativo, presença do indicador e dimensões. Execute com `npm test -- --watch=false`.
