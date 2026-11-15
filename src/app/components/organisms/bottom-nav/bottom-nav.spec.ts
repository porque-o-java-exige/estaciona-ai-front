import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BottomNav } from './bottom-nav';
import { BookingService } from '../../../services/booking.service';
import { ChatService } from '../../../services/chat.service';

describe('BottomNav', () => {
  let component: BottomNav;
  let fixture: ComponentFixture<BottomNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNav],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the bottom-nav organism', () => {
    expect(component).toBeTruthy();
  });

  it('should use the opacity icons for inactive payment and chat items', () => {
    const payment = component.navItems.find((item) => item.route === '/payment');
    const chat = component.navItems.find((item) => item.route === '/chat');

    expect(payment?.inactiveIcon).toBe('assets/icons/png/opacity-payment-icon.png');
    expect(chat?.inactiveIcon).toBe('assets/icons/png/opacity-chat-icon.png');
  });

  it('hides notification badges after all pending payments and unread messages are cleared', () => {
    const bookings = TestBed.inject(BookingService);
    const chat = TestBed.inject(ChatService);

    while (bookings.paymentCandidates().length > 0) {
      const pendingBooking = bookings.paymentCandidates()[0];
      bookings.selectBooking(pendingBooking.id);
      expect(bookings.markSelectedBookingPaid()).toBe('paid');
    }
    for (const conversation of chat.conversations()) {
      if (conversation.unreadCount > 0) {
        chat.selectConversation(conversation.id);
      }
    }

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.app-bottom-nav-badge').length).toBe(0);
  });
});

