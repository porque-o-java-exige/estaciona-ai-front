# Toggle

O componente Toggle é um switch visual animado, ideal para configurações binárias como Dark Mode, Notificações e Idioma. Implementa `ControlValueAccessor` para integração com Reactive Forms e Template-driven Forms. Acessível com `role='switch'` e `aria-checked`.

## Como usar

```html
<app-toggle [(checked)]="isDarkMode" (changed)="onToggleChanged($event)"></app-toggle>
<app-toggle [disabled]="true" [checked]="true"></app-toggle>
```

## API

### Signals (Inputs/Models)
- `checked`: `model<boolean>` - Define o estado do toggle.
- `disabled`: `input<boolean>` - Define se o toggle está desabilitado.

### Outputs
- `changed`: `output<boolean>` - Evento emitido quando o estado do toggle muda.
