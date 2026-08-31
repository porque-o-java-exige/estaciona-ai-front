import { Component, computed, input } from '@angular/core';

export type buttonVariant = 'primary' | 'secondary' | 'google' | 'notification' | 'filter';

const variantIcon: Record<buttonVariant, string | null> = {
  primary: null,
  secondary: null,
  google: 'google-icon.svg',
  notification: 'notification-icon.svg',
  filter: 'filter-icon.svg',
};
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  variant = input<buttonVariant>('primary');
  text = input<string>('');

  iconPath = computed(() => {
    const fileName = variantIcon[this.variant()];
    return fileName ? `assets/icons/${fileName}` : null;
  });
}
