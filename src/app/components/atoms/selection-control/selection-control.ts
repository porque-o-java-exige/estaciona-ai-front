import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-selection-control',
  standalone: true,
  templateUrl: './selection-control.html',
  styleUrl: './selection-control.scss',
})
export class SelectionControl {
  selected = input<boolean>(false);
  ariaLabel = input.required<string>();

  toggled = output<void>();
}
