import { Component, input, output } from '@angular/core';
import { Image } from '../../atoms/image/image';
import { SelectionControl } from '../../atoms/selection-control/selection-control';
import { BookingItem } from '../../../interfaces';

@Component({
  selector: 'app-payment-garage-card',
  standalone: true,
  imports: [Image, SelectionControl],
  templateUrl: './payment-garage-card.html',
  styleUrl: './payment-garage-card.scss',
})
export class PaymentGarageCard {
  booking = input.required<BookingItem>();
  selected = input<boolean>(false);

  selectedChange = output<string>();
}
