import { Component, inject } from '@angular/core';
import { Chip } from '../../components/atoms/chip/chip';
import { BookingCard } from '../../components/molecules/booking-card/booking-card';
import { Footer } from '../../components/organisms/footer/footer';
import { BookingFilter, BookingItem } from '../../interfaces';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [Chip, BookingCard, Footer],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.scss',
})
export class BookingPage {
  private readonly bookingService = inject(BookingService);

  bookings = this.bookingService.filteredBookings;
  filterOptions = this.bookingService.filterOptions;
  activeFilter = this.bookingService.activeFilter;

  onSelectFilter = (filter: BookingFilter): void => {
    this.bookingService.setFilter(filter);
  };

  onSelectBooking = (booking: BookingItem): void => {
    this.bookingService.selectBooking(booking.id);
  };
}

