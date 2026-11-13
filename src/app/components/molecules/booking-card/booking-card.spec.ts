import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookingCard } from './booking-card';
import { BookingItem } from '../../../interfaces';

describe('BookingCard', () => {
  let component: BookingCard;
  let fixture: ComponentFixture<BookingCard>;

  const mockBooking: BookingItem = {
    id: 'res-paulista-900',
    garageId: 'garagem-paulista-prime',
    garageName: 'Estacionamento Central Paulista',
    address: 'Av. paulista, 900',
    dateTimeRange: '08/06 · 19:00–21:00',
    spotCode: 'C03 · Nível 1',
    status: 'Ativo',
    totalAmount: 24,
    distanceMeters: '120m',
    billingLabel: 'Hora',
    imageUrl: 'assets/images/png/garage-interior.png',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('booking', mockBooking);
    fixture.detectChanges();
  });

  it('should create and display booking status', () => {
    expect(component).toBeTruthy();
    expect(component.isPendingOrDone()).toBe(false);
    expect(component.totalLabel()).toBe('Total pago');
  });
});

