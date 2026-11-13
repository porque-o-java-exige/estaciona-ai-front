# Selection control (`app-selection-control`)

**Camada:** atom  
**Arquivos:** `selection-control.ts`, `selection-control.html`, `selection-control.scss`, `selection-control.spec.ts`

## Responsabilidade

Botão acessível de seleção binária, renderizado como caixa de seleção estilizada. É controlado pelo pai e não mantém estado interno.

## API

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `selected` | `boolean` | `false` | Estado selecionado |
| `ariaLabel` | `string` | obrigatório | Nome acessível da ação |

| Output | Tipo | Descrição |
|---|---|---|
| `toggled` | `void` | Emitido ao ativar o botão |

O output sinaliza uma interação; cabe ao consumidor alterar e fornecer novamente `selected`.

## Uso

```html
<app-selection-control
  [selected]="isSelected"
  ariaLabel="Selecionar garagem"
  (toggled)="selectGarage()">
</app-selection-control>
```

## Testes

`selection-control.spec.ts` verifica `aria-pressed` e o evento. Execute com `npm test -- --watch=false`.
