import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookingPage } from './booking-page';

describe('BookingPage', () => {
  let component: BookingPage;
  let fixture: ComponentFixture<BookingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and list bookings', () => {
    expect(component).toBeTruthy();
    expect(component.bookings().length).toBeGreaterThan(0);
  });
});

