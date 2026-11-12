import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chip } from '../../atoms/chip/chip';
import { BookingItem } from '../../../interfaces';

@Component({
  selector: 'app-booking-card',
  standalone: true,
  imports: [RouterLink, Chip],
  templateUrl: './booking-card.html',
  styleUrl: './booking-card.scss',
})
export class BookingCard {
  booking = input.required<BookingItem>();

  cardSelect = output<BookingItem>();

  isPendingOrDone = computed(() => this.booking().status !== 'Ativo');

  headerToneClass = computed(() => {
    const status = this.booking().status;
    if (status === 'Ativo') {
      return 'header-active';
    }
    if (status === 'Em andamento') {
      return 'header-progress';
    }
    return 'header-done';
  });

  totalLabel = computed(() =>
    this.booking().status === 'Em andamento' ? 'Total a ser pago' : 'Total pago'
  );

  onCardClick = (): void => {
    this.cardSelect.emit(this.booking());
  };
}

