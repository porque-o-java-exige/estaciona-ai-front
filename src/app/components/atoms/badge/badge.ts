import { Component, computed, input } from '@angular/core';

export type BadgeVariant = 'dot' | 'count';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {
  variant = input<BadgeVariant>('count');
  count = input<number>(0);

  displayCount = computed(() => {
    const n = this.count();
    return n > 99 ? '99+' : String(n);
  });

  isVisible = computed(() => {
    if (this.variant() === 'dot') return true;
    return this.count() > 0;
  });
}
