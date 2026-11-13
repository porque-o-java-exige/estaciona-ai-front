import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingItem } from '../../../interfaces';
import { PaymentGarageCard } from './payment-garage-card';

describe('PaymentGarageCard', () => {
  let component: PaymentGarageCard;
  let fixture: ComponentFixture<PaymentGarageCard>;

  const booking: BookingItem = {
    id: 'booking-1',
    garageId: 'garage-1',
    garageName: 'Garagem Central',
    address: 'Rua Central, 10',
    dateTimeRange: 'Hoje, 15h–17h',
    spotCode: 'A1',
    status: 'Ativo',
    totalAmount: 16,
    distanceMeters: '200 m',
    billingLabel: '2 horas',
    imageUrl: 'assets/images/png/garage-tesla.png',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentGarageCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentGarageCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('booking', booking);
    fixture.componentRef.setInput('selected', false);
    fixture.detectChanges();
  });

  it('should emit the booking id when selected', () => {
    let selectedId = '';
    component.selectedChange.subscribe((id) => (selectedId = id));

    fixture.nativeElement.querySelector('article').click();

    expect(selectedId).toBe(booking.id);
  });
});
