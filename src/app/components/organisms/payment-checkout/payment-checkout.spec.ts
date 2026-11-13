import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentCheckout } from './payment-checkout';

describe('PaymentCheckout', () => {
  let fixture: ComponentFixture<PaymentCheckout>;
  let component: PaymentCheckout;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCheckout],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentCheckout);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('billingMode', 'hour');
    fixture.componentRef.setInput('selectedDays', []);
    fixture.componentRef.setInput('selectedHours', 2);
    fixture.componentRef.setInput('calendarDays', []);
    fixture.componentRef.setInput('weekDays', []);
    fixture.componentRef.setInput('paymentMethod', 'card');
    fixture.componentRef.setInput('walletBalance', 23.5);
    fixture.componentRef.setInput('baseSubtotal', 16);
    fixture.componentRef.setInput('serviceFee', 2);
    fixture.componentRef.setInput('discountAmount', 0);
    fixture.componentRef.setInput('finalTotal', 18);
    fixture.componentRef.setInput('payButtonVariant', 'card');
    fixture.componentRef.setInput('payButtonText', 'Pagar R$18,00');
    fixture.detectChanges();
  });

  it('should change the pay button icon with the selected payment method', () => {
    const buttonIcon = (): string | null =>
      fixture.nativeElement.querySelector('.button-card img')?.getAttribute('src') ?? null;

    expect(buttonIcon()).toBe('assets/icons/png/bank-card-icon.png');

    fixture.componentRef.setInput('paymentMethod', 'pix');
    fixture.detectChanges();
    expect(buttonIcon()).toBe('assets/icons/png/pix-icon.png');

    fixture.componentRef.setInput('paymentMethod', 'wallet');
    fixture.detectChanges();
    expect(buttonIcon()).toBe('assets/icons/png/wallet-icon.png');
  });
});
