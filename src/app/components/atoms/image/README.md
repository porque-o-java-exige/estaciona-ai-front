# Image (`app-image`)

**Camada:** atom  
**Arquivos:** `image.ts`, `image.html`, `image.scss`, `image.spec.ts`

## Responsabilidade

Envolve uma imagem nativa com dimensões, carregamento e `object-fit` configuráveis. A borda do host recorta o conteúdo; o consumidor pode aplicar classes para proporção e arredondamento.

## API

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `src` | `string` | obrigatório | URL da imagem |
| `alt` | `string` | `''` | Texto alternativo; vazio define a imagem como decorativa |
| `width` | `string \| number` | `'100%'` | Largura CSS do host |
| `height` | `string \| number` | `'100%'` | Altura CSS do host |
| `loading` | `'eager' \| 'lazy'` | `'lazy'` | Estratégia nativa de carregamento |
| `objectFit` | `'cover' \| 'contain'` | `'cover'` | Ajuste da imagem ao host |
| `fetchPriority` | `'high' \| 'low' \| 'auto'` | `'auto'` | Prioridade de busca do navegador |

Não possui outputs.

## Uso

```html
<app-image
  class="garage-photo"
  [src]="garage.imageUrl"
  [alt]="garage.name"
  [width]="320"
  [height]="150">
</app-image>
```

As dimensões são aplicadas ao host e a imagem preenche o host. Use imagens em `assets/images/png/`; ícones pertencem a `app-icon` e `assets/icons/`.

## Testes

`image.spec.ts` valida URL, texto alternativo e dimensões. Execute com `npm test -- --watch=false`.
