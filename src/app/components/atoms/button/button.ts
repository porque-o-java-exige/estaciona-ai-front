import { Component, computed, input, } from '@angular/core';

export type buttonVariant = 'primary'| 'secondary' | 'tertiary' | 'google' | 'notification' | 'filter' | 'payment' | 'card' | 'pix-action' | 
'pix-action-danger' | 'pix-copy' | 'pix-cancel' | 'back'| 'reload' | 'add';

const variantIcon: Record<buttonVariant, string | null> = {
  primary: null,
  secondary: null,
  tertiary: null,
  reload: null,
  add: null,
  google: 'Google-icon.svg',
  notification: 'notification-icon.svg',
  filter: 'filter-icon.svg',
  payment: 'pix-icon.svg',
  card: 'card-icon.svg',
  'pix-action': null,
  'pix-action-danger': null,
  'pix-copy': 'pix-icon.svg',
  'pix-cancel': null,
  'back': 'back-icon.svg',
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
