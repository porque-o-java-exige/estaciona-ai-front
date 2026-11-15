import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Sidebar } from './sidebar';
import { BookingService } from '../../../services/booking.service';
import { ChatService } from '../../../services/chat.service';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the sidebar organism with 5 semantic list items including Perfil', () => {
    expect(component).toBeTruthy();
    expect(component.navItems.length).toBe(5);
    const listItems = fixture.nativeElement.querySelectorAll('.app-sidebar-item');
    expect(listItems.length).toBe(5);
  });

  it('should define active and inactive image assets for every menu item', () => {
    expect(component.navItems.every((item) => item.activeIcon !== item.inactiveIcon)).toBe(true);
  });

  it('should use the opacity icons for inactive payment and chat items', () => {
    const payment = component.navItems.find((item) => item.id === 'payment');
    const chat = component.navItems.find((item) => item.id === 'chat');

    expect(payment?.inactiveIcon).toBe('assets/icons/png/opacity-payment-icon.png');
    expect(chat?.inactiveIcon).toBe('assets/icons/png/opacity-chat-icon.png');
  });

  it('hides payment and chat badges when no pending or unread items remain', () => {
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

    expect(
      fixture.nativeElement.querySelector('[data-tab="payment"] .app-sidebar-badge'),
    ).toBeNull();
    expect(
      fixture.nativeElement.querySelector('[data-tab="chat"] .app-sidebar-badge'),
    ).toBeNull();
  });
});
