import { Component, computed, input, output } from '@angular/core';
import { Button, buttonVariant } from '../../atoms/button/button';
import { Icon } from '../../atoms/icon/icon';
import { BillingMode, PaymentMethodType } from '../../../interfaces';

@Component({
  selector: 'app-payment-checkout',
  standalone: true,
  imports: [Button, Icon],
  templateUrl: './payment-checkout.html',
  styleUrl: './payment-checkout.scss',
})
export class PaymentCheckout {
  billingMode = input.required<BillingMode>();
  selectedDays = input.required<readonly number[]>();
  selectedHours = input.required<number>();
  calendarDays = input.required<readonly number[]>();
  weekDays = input.required<readonly string[]>();
  paymentMethod = input.required<PaymentMethodType>();
  walletBalance = input.required<number>();
  baseSubtotal = input.required<number>();
  serviceFee = input.required<number>();
  discountAmount = input.required<number>();
  finalTotal = input.required<number>();
  payButtonVariant = input.required<buttonVariant>();
  payButtonText = input.required<string>();
  payButtonIcon = computed(() => {
    switch (this.paymentMethod()) {
      case 'pix':
        return 'assets/icons/png/pix-icon.png';
      case 'card':
        return 'assets/icons/png/bank-card-icon.png';
      case 'wallet':
        return 'assets/icons/png/wallet-icon.png';
    }
  });

  billingModeChange = output<BillingMode>();
  calendarDayToggled = output<number>();
  reserveSpot = output<void>();
  hoursDecrement = output<void>();
  hoursIncrement = output<void>();
  paymentMethodChange = output<PaymentMethodType>();
  paymentSubmitted = output<void>();

  isDaySelected = (day: number): boolean => this.selectedDays().includes(day);

  formatCurrency = (value: number): string => value.toFixed(2).replace('.', ',');
}
