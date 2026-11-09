import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProfilePage } from './profile-page';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render user profile data', () => {
    expect(component).toBeTruthy();
    expect(component.authService.currentUser().name).toBe('Kookie Piska');
  });

  it('should recharge wallet balance when submitRecharge is called', () => {
    const initialBalance = component.authService.currentUser().balance;
    component.rechargeAmount.set(25);
    component.submitRecharge();
    expect(component.authService.currentUser().balance).toBe(initialBalance + 25);
  });
});

