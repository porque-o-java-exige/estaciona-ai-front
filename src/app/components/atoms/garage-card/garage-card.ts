import { Component, input } from '@angular/core';

export type GarageCardVariant = 'listing' | 'owned';
export type GarageCardPriceUnit = '/h' | '/day';

@Component({
  selector: 'app-garage-card',
  standalone: true,
  imports: [],
  templateUrl: './garage-card.html',
  styleUrl: './garage-card.scss',
})
export class GarageCard {
  variant = input<GarageCardVariant>('listing');

  // Campos comuns
  name = input.required<string>();
  address = input<string>('');
  imageUrl = input<string>('');
  price = input<string>('');
  priceUnit = input<GarageCardPriceUnit>('/h');

  // Campos apenas listing
  rating = input<number>(0);
  distance = input<string>('');
  spots = input<number>(0);

  // Campos apenas owned
  isActive = input<boolean>(false);
  earnings = input<string>('');
  totalReservations = input<number>(0);
}
