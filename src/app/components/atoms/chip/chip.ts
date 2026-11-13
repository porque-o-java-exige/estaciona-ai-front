import { Component, computed, input } from '@angular/core';

export type chipVariant =
  | 'attribute'
  | 'availability'
  | 'rating'
  | 'distance'
  | 'parking-spots'
  | 'reservation-filter'
  | 'status';

const variantIcon: Record<chipVariant, string[]> = {
  attribute: [],
  availability: [],
  rating: [
    'assets/icons/png/star-yellow-icon.png',
    'assets/icons/png/star-yellow-icon.png',
    'assets/icons/png/star-yellow-icon.png',
    'assets/icons/png/star-yellow-icon.png',
    'assets/icons/png/star-yellow-icon.png',
  ],
  distance: ['assets/icons/svg/distance-icon.svg'],
  'parking-spots': [],
  'reservation-filter': [],
  status: [],
};

@Component({
  selector: 'app-chip',
  imports: [],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
})
export class Chip {
  variant = input<chipVariant>('attribute');
  tone = input<'high' | 'medium' | 'low'>('high');

  iconPaths = computed(() => {
    return variantIcon[this.variant()] ?? [];
  });

  text = input.required<string>();
  subtext = input<string>('');

  isActive = input<boolean>(false);

  isReservationFilterActive = computed(() => {
    return this.variant() === 'reservation-filter' && this.isActive();
  });

  isPendingOrDone = input<boolean>(false);

  isStatusPendingOrDone = computed(() => {
    return this.variant() === 'status' && this.isPendingOrDone();
  });
}
