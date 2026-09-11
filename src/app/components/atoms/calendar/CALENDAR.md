# Calendar

Calendário mensal para seleção de datas com suporte a múltipla seleção.

## Uso

```html
<app-calendar 
  [(selectedDates)]="dates" 
  [highlightToday]="true"
  (dateSelected)="onDateSelected($event)">
</app-calendar>
```
