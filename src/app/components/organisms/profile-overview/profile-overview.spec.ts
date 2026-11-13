import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UserResponse } from '../../../interfaces';
import { ProfileOverview } from './profile-overview';

describe('ProfileOverview', () => {
  let component: ProfileOverview;
  let fixture: ComponentFixture<ProfileOverview>;

  const user: UserResponse = {
    id: 'user-1',
    name: 'Pessoa Teste',
    email: 'pessoa@example.com',
    phone: '11999999999',
    avatarUrl: 'assets/images/png/kookie-piska-avatar.png',
    balance: 50,
    rating: 4.8,
    totalReviews: 24,
    totalBookingsCount: 12,
    cardDisplay: '**** 4812',
    isVerified: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileOverview],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileOverview);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', user);
    fixture.componentRef.setInput('vehicleCount', 2);
    fixture.componentRef.setInput('garageCount', 1);
    fixture.detectChanges();
  });

  it('should render profile details and format the wallet balance', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Pessoa Teste');
    expect(fixture.nativeElement.textContent).toContain('R$50,00');
    expect(fixture.nativeElement.textContent).toContain('2');
  });
});
