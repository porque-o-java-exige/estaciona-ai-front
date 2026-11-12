import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '../../components/atoms/button/button';
import { Footer } from '../../components/organisms/footer/footer';
import { PixPaymentCard } from '../../components/organisms/pix-payment-card/pix-payment-card';
import { BillingMode, PaymentMethodType } from '../../interfaces';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [Button, PixPaymentCard, Footer],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.scss',
})
export class PaymentPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bookingService = inject(BookingService);

  candidates = this.bookingService.paymentCandidates;
  selectedBookingId = this.bookingService.selectedBookingId;
  billingMode = this.bookingService.billingMode;
  selectedDays = this.bookingService.selectedDays;
  selectedHours = this.bookingService.selectedHours;
  paymentMethod = this.bookingService.paymentMethod;
  walletBalance = this.bookingService.walletBalance;
  pixCode = this.bookingService.pixCode;

  baseSubtotal = this.bookingService.baseSubtotal;
  serviceFee = this.bookingService.serviceFee;
  discountAmount = this.bookingService.discountAmount;
  finalTotal = this.bookingService.finalTotal;

  showPixStage = signal<boolean>(false);

  readonly weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  readonly calendarDays = Array.from({ length: 31 }, (_, idx) => idx + 1);

  payButtonVariant = computed(() =>
    this.paymentMethod() === 'pix' ? 'payment' : 'card'
  );

  payButtonText = computed(
    () => `Pagar R$${this.formatCurrency(this.finalTotal())}`
  );

  ngOnInit(): void {
    if (this.router.url.includes('/payment/pix')) {
      this.bookingService.setPaymentMethod('pix');
      this.showPixStage.set(true);
    }

    this.route.queryParamMap.subscribe((params) => {
      const bookingId = params.get('bookingId');
      if (bookingId) {
        this.bookingService.selectBooking(bookingId);
      }
      if (params.get('pix') === 'true') {
        this.bookingService.setPaymentMethod('pix');
        this.showPixStage.set(true);
      }
    });
  }

  formatCurrency = (value: number): string =>
    value.toFixed(2).replace('.', ',');

  isDaySelected = (day: number): boolean =>
    this.selectedDays().includes(day);

  onSelectCandidate = (id: string): void => {
    this.bookingService.selectBooking(id);
  };

  onSetBillingMode = (mode: BillingMode): void => {
    this.bookingService.setBillingMode(mode);
  };

  onToggleDay = (day: number): void => {
    this.bookingService.toggleCalendarDay(day);
  };

  onDecrementHours = (): void => {
    this.bookingService.decrementHours();
  };

  onIncrementHours = (): void => {
    this.bookingService.incrementHours();
  };

  onSelectPaymentMethod = (method: PaymentMethodType): void => {
    this.bookingService.setPaymentMethod(method);
  };

  onReserveSpot = (): void => {
    this.bookingService.markSelectedBookingPaid();
  };

  onSubmitPayment = (): void => {
    if (this.paymentMethod() === 'pix') {
      this.showPixStage.set(true);
      return;
    }

    this.bookingService.markSelectedBookingPaid();
    this.router.navigate(['/booking']);
  };

  onCancelPix = (): void => {
    this.showPixStage.set(false);
    if (this.router.url.includes('/payment/pix')) {
      this.router.navigate(['/payment']);
    }
  };
}

