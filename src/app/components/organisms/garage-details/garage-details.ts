import { Component, input, output } from '@angular/core';
import { Button } from '../../atoms/button/button';
import { Chip } from '../../atoms/chip/chip';
import { Image } from '../../atoms/image/image';
import { GarageItem } from '../../../interfaces';

@Component({
  selector: 'app-garage-details',
  standalone: true,
  imports: [Button, Chip, Image],
  templateUrl: './garage-details.html',
  styleUrl: './garage-details.scss',
})
export class GarageDetails {
  garage = input.required<GarageItem>();
  spotsRemainingText = input.required<string>();
  reviewsSubtext = input.required<string>();

  openChat = output<void>();
  addToBooking = output<void>();
}
