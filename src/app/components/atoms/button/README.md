# Button (`app-button`)

**Camada:** atom  
**Arquivos:** `button.ts`, `button.html`, `button.scss`, `button.spec.ts`

## Responsabilidade

Botão reutilizável do design system. Mantém comportamento nativo de `button`, estilos por variante, estado desabilitado, largura total e ícone opcional.

## API

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `buttonVariant` | `'primary'` | Estilo: `primary`, `secondary`, `tertiary`, `google`, `notification`, `filter`, `filter-option`, `payment`, `card`, ações PIX, `back`, `reload`, `add` ou `chat` |
| `text` | `string` | `''` | Rótulo visível |
| `buttonType` | `'button' \| 'submit'` | `'button'` | Tipo HTML do botão |
| `fullWidth` | `boolean` | `false` | Ocupa a largura disponível |
| `isDisabled` | `boolean` | `false` | Desabilita o controle |
| `isActive` | `boolean` | `false` | Estado selecionado visual; também define `aria-pressed` para `filter-option` |

Não possui outputs; o evento nativo `(click)` é propagado pelo host.

## Uso

```html
<app-button variant="primary" text="Entrar" [fullWidth]="true"></app-button>
<app-button
  variant="filter-option"
  [text]="option"
  [isActive]="selected"
  (click)="select(option)">
</app-button>
```

Variantes que possuem ilustração usam SVG em `assets/icons/svg/`. Use `buttonType="submit"` dentro de formulários; para ações sem envio, mantenha `buttonType="button"`.

## Testes

`button.spec.ts` cobre a criação. Execute com `npm test -- --watch=false`.
