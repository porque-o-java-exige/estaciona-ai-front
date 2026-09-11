# Checkbox

O componente Checkbox é uma caixa de seleção visual customizada que substitui o checkbox nativo. Exibe um check branco sobre fundo azul quando marcado. Usado na tela de pagamento para seleção de estacionamentos. Implementa `ControlValueAccessor` para integração com formulários Angular.

## Como usar

```html
<app-checkbox [(checked)]="isSelected" (changed)="onCheckboxChanged($event)"></app-checkbox>
<app-checkbox [disabled]="true" [checked]="true"></app-checkbox>
```

## API

### Signals (Inputs/Models)
- `checked`: `model<boolean>` - Define o estado do checkbox.
- `disabled`: `input<boolean>` - Define se o checkbox está desabilitado.

### Outputs
- `changed`: `output<boolean>` - Evento emitido quando o estado do checkbox muda.
