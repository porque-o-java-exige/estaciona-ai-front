# Footer (`app-footer`)

**Camada:** organism  
**Arquivos:** `footer.ts`, `footer.html`, `footer.scss`, `footer.spec.ts`

## Responsabilidade

Exibe rodapé compartilhado com links de navegação e o ano corrente definido pelo componente.

## Composição

Usa `RouterLink`. Não recebe inputs nem emite outputs.

## Uso

```html
<app-footer></app-footer>
```

## Testes

`footer.spec.ts` cobre a criação. Execute com `npm test -- --watch=false`.
