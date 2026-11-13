# Icon (`app-icon`)

**Camada:** atom  
**Arquivos:** `icon.ts`, `icon.html`, `icon.scss`, `icon.spec.ts`

## Responsabilidade

Exibe um ícone do catálogo de imagens com dimensão uniforme. O catálogo pode usar PNG ou SVG; ambos são exibidos como imagens. Ícones sem texto alternativo são marcados como decorativos para tecnologias assistivas.

## API

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `name` | `IconName` | obrigatório | Nome tipado do ícone cadastrado em `icon.ts` |
| `size` | `number` | `18` | Largura e altura em pixels |
| `alt` | `string` | `''` | Texto alternativo; vazio torna o ícone decorativo |

Não possui outputs.

## Uso

```html
<app-icon name="star" [size]="13"></app-icon>
<app-icon name="back" [size]="20" alt="Voltar"></app-icon>
```

Os nomes são resolvidos para caminhos de imagem no mapa tipado em `icon.ts`. Para adicionar um ícone, coloque o arquivo em `assets/icons/png/` ou `assets/icons/svg/` e registre a chave e o caminho no catálogo.

## Testes

`icon.spec.ts` verifica a resolução da URL e o estado decorativo. Execute com `npm test -- --watch=false`.
