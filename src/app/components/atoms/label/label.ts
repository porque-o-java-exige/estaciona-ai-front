import { Component, input } from '@angular/core';

export type LabelVariant = 'heading' | 'subheading' | 'body' | 'caption' | 'price' | 'label';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [],
  templateUrl: './label.html',
  styleUrl: './label.scss',
})
export class Label {
  variant = input<LabelVariant>('body');
  text = input.required<string>();
  color = input<string>('');
}
