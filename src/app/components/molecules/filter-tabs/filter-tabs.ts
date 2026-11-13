import { Component, input, output } from '@angular/core';
import { Button } from '../../atoms/button/button';

@Component({
  selector: 'app-filter-tabs',
  standalone: true,
  imports: [Button],
  templateUrl: './filter-tabs.html',
  styleUrl: './filter-tabs.scss',
})
export class FilterTabs<T extends string = string> {
  options = input.required<readonly T[]>();
  activeOption = input.required<T>();
  ariaLabel = input.required<string>();

  optionSelected = output<T>();
}
