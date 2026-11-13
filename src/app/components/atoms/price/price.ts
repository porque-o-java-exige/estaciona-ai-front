import { Component, input } from '@angular/core';

export type PriceAppearance = 'compact' | 'prominent';

@Component({
  selector: 'app-price',
  standalone: true,
  templateUrl: './price.html',
  styleUrl: './price.scss',
})
export class Price {
  amount = input.required<number>();
  currency = input<string>('R$');
  suffix = input<string>('');
  appearance = input<PriceAppearance>('compact');

  formattedAmount = (): string =>
    Number.isInteger(this.amount())
      ? String(this.amount())
      : this.amount().toFixed(2).replace('.', ',');
}
