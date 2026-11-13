import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BottomNav } from './bottom-nav';

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
});

