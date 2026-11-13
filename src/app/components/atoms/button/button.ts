import { Component, computed, input } from '@angular/core';

export type buttonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'google'
  | 'notification'
  | 'filter'
  | 'filter-option'
  | 'payment'
  | 'card'
  | 'pix-action'
  | 'pix-action-danger'
  | 'pix-copy'
  | 'pix-cancel'
  | 'back'
  | 'reload'
  | 'add'
  | 'chat';

const variantIcon: Record<buttonVariant, string | null> = {
  primary: null,
  secondary: null,
  tertiary: null,
  reload: null,
  add: null,
  google: 'assets/icons/svg/google-icon.svg',
  notification: 'assets/icons/svg/notification-icon.svg',
  filter: 'assets/icons/svg/filter-icon.svg',
  'filter-option': null,
  payment: 'assets/icons/png/pix-icon.png',
  card: 'assets/icons/png/bank-card-icon.png',
  'pix-action': null,
  'pix-action-danger': null,
  'pix-copy': 'assets/icons/png/pix-icon.png',
  'pix-cancel': null,
  'back': 'assets/icons/png/chevron-left-icon.png',
  chat: 'assets/icons/png/opacity-chat-icon.png',
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
  buttonType = input<'button' | 'submit'>('button');
  fullWidth = input<boolean>(false);
  isDisabled = input<boolean>(false);
  isActive = input<boolean>(false);
  iconSrc = input<string | null>(null);

  iconPath = computed(() => {
    return this.iconSrc() ?? variantIcon[this.variant()];
  });
}
