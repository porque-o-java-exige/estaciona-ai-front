import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chip } from '../../atoms/chip/chip';
import { Image } from '../../atoms/image/image';
import { Icon } from '../../atoms/icon/icon';
import { Price } from '../../atoms/price/price';
import { GarageItem } from '../../../interfaces';

@Component({
  selector: 'app-garage-card',
  standalone: true,
  imports: [RouterLink, Chip, Image, Icon, Price],
  templateUrl: './garage-card.html',
  styleUrl: './garage-card.scss',
})
export class GarageCard {
  garage = input.required<GarageItem>();
  selected = input<boolean>(false);

  cardClick = output<GarageItem>();

  spotsLabel = computed(() => {
    const spots = this.garage().remainingSpots;
    return `${spots} ${spots === 1 ? 'vaga' : 'vagas'}`;
  });

  metaSummary = computed(() => {
    const item = this.garage();
    return `${item.rating} (${item.reviewsCount}) · ${item.distance} · ${item.shortSummary}`;
  });

  onSelectCard = (): void => {
    this.cardClick.emit(this.garage());
  };
}
