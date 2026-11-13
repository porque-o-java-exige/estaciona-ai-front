import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header organism with direct profile link', () => {
    expect(component).toBeTruthy();
    const profileLink = fixture.nativeElement.querySelector('a.app-header-avatar-card');
    expect(profileLink).toBeTruthy();
    expect(profileLink.getAttribute('href')).toBe('/profile');
  });

  it('should open the notification modal and mark notifications as read', () => {
    expect(component.isNotificationsOpen()).toBe(false);
    expect(component.unreadNotificationsCount()).toBe(2);
    const dialog = fixture.nativeElement.querySelector(
      '.app-header-notif-dialog',
    ) as HTMLDialogElement;
    Object.defineProperty(dialog, 'showModal', {
      value: () => dialog.setAttribute('open', ''),
    });
    component.onNotificationClick();
    fixture.detectChanges();
    expect(component.isNotificationsOpen()).toBe(true);
    expect(dialog.open).toBe(true);
    component.markAllNotificationsAsRead();
    fixture.detectChanges();
    expect(component.unreadNotificationsCount()).toBe(0);
  });
});
