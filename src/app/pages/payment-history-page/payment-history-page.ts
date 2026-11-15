import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../components/organisms/footer/footer';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-payment-history-page',
  standalone: true,
  imports: [RouterLink, Footer],
  templateUrl: './payment-history-page.html',
  styleUrl: './payment-history-page.scss',
})
export class PaymentHistoryPage {
  readonly payments = inject(BookingService).bookings;

  formatAmount = (value: number): string => value.toFixed(2).replace('.', ',');
}
