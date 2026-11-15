import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PaymentPage } from './payment-page';
import { BookingService } from '../../services/booking.service';
import { GarageService } from '../../services/garage.service';

describe('PaymentPage', () => {
  let component: PaymentPage;
  let fixture: ComponentFixture<PaymentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and calculate payment total', () => {
    expect(component).toBeTruthy();
    expect(component.finalTotal()).toBe(26);
  });

  it('adds catalog reservations as in progress and records payment separately', () => {
    const bookings = TestBed.inject(BookingService);
    const garages = TestBed.inject(GarageService);
    const garage = garages.getGarageById('garagem-oscar-freire');

    const reservation = bookings.addBookingFromGarage(garage);

    expect(reservation.status).toBe('Em andamento');
    expect(bookings.bookings().find((item) => item.id === reservation.id)?.status).toBe(
      'Em andamento',
    );
    expect(reservation.paymentStatus).toBe('Pendente');

    expect(bookings.markSelectedBookingPaid()).toBe('paid');
    expect(bookings.bookings().find((item) => item.id === reservation.id)).toMatchObject({
      status: 'Ativo',
      paymentStatus: 'Pago',
    });
  });

  it('only offers pending bookings and removes the booking after payment', () => {
    const bookings = TestBed.inject(BookingService);
    const selectedId = bookings.selectedBookingId();

    expect(selectedId).toBeTruthy();
    expect(bookings.paymentCandidates().every((item) => item.paymentStatus === 'Pendente')).toBe(
      true,
    );
    expect(bookings.markSelectedBookingPaid()).toBe('paid');
    expect(bookings.paymentCandidates().some((item) => item.id === selectedId)).toBe(false);
  });

  it('rejects wallet payments with insufficient balance and deducts successful payments', () => {
    const bookings = TestBed.inject(BookingService);
    const initialBalance = bookings.walletBalance();

    bookings.setPaymentMethod('wallet');
    expect(bookings.markSelectedBookingPaid()).toBe('insufficient-wallet-balance');

    bookings.setBillingMode('hour');
    expect(bookings.markSelectedBookingPaid()).toBe('paid');
    expect(bookings.walletBalance()).toBe(initialBalance - bookings.finalTotal());
  });
});

