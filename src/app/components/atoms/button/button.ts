import { Component, computed, input, } from '@angular/core';

export type buttonVariant = 'primary'| 'secondary' | 'tertiary' | 'google' | 'notification' | 'filter' | 'payment' | 'card' | 'pix-action' | 
'pix-action-danger' | 'pix-copy' | 'pix-cancel';

const variantIcon: Record<buttonVariant, string | null> = {
  primary: null,
  secondary: null,
  tertiary: null,
  google: 'google-icon.svg',
  notification: 'notification-icon.svg',
  filter: 'filter-icon.svg',
  payment: 'pix-icon.svg',
  card: 'card-icon.svg',
  'pix-action': null,
  'pix-action-danger': null,
  'pix-copy': 'pix-icon.svg',
  'pix-cancel': null,
};

// Variantes que só mostram ícone (sem texto visível no DOM).
// O overflow: hidden no SCSS é só uma trava visual extra — quem
// realmente impede o texto de aparecer é não renderizá-lo, feito
// no template via isIconOnly().
const iconOnlyVariants: readonly buttonVariant[] = ['notification', 'filter'];

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
    // Path absoluto (com "/" na frente): evita 404 quando o app está
    // em uma rota aninhada, tipo /component/button, onde um path
    // relativo resolveria para /component/assets/icons/... e quebraria.
    return fileName ? `/assets/icons/${fileName}` : null;
  });

  isIconOnly = computed(() => iconOnlyVariants.includes(this.variant()));
}