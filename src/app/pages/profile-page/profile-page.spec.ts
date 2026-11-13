import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
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

  it('should update the profile photo after selecting an image', async () => {
    const file = new File(['avatar'], 'profile.png', { type: 'image/png' });
    const input = document.createElement('input');
    input.type = 'file';
    Object.defineProperty(input, 'files', { value: [file] });
    component.editName.set(component.authService.currentUser().name);
    component.editEmail.set(component.authService.currentUser().email);
    component.editPhone.set(component.authService.currentUser().phone);

    await component.onAvatarSelected({ target: input } as unknown as Event);

    const avatarUrl = component.editAvatarUrl();
    expect(avatarUrl).toMatch(/^data:image\/png;base64,/);

    component.submitEditProfile();

    expect(component.authService.currentUser().avatarUrl).toBe(avatarUrl);
  });

  it('should recharge wallet balance when submitRecharge is called', () => {
    const initialBalance = component.authService.currentUser().balance;
    component.rechargeAmount.set(25);
    component.submitRecharge();
    expect(component.authService.currentUser().balance).toBe(initialBalance + 25);
    expect(TestBed.inject(FeedbackService).current()?.message).toBe(
      'Carteira recarregada com sucesso.'
    );
  });

  it('should show a required-value error for a recharge below the minimum', () => {
    const initialBalance = component.authService.currentUser().balance;
    component.rechargeAmount.set(0);

    component.submitRecharge();

    expect(component.authService.currentUser().balance).toBe(initialBalance);
    expect(component.rechargeFormError()).toBe(
      'Informe um valor de recarga igual ou superior a R$ 5,00.'
    );
  });
});
