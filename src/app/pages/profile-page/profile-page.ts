import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfileTabsContent } from '../../components/organisms/profile-tabs-content/profile-tabs-content';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-page',
  imports: [FormsModule, RouterLink, ProfileTabsContent],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  readonly authService = inject(AuthService);

  editDialogRef = viewChild<ElementRef<HTMLDialogElement>>('editProfileDialog');
  rechargeDialogRef = viewChild<ElementRef<HTMLDialogElement>>('rechargeDialog');

  editName = signal<string>('');
  editEmail = signal<string>('');
  editPhone = signal<string>('');

  rechargeAmount = signal<number>(50);

  openEditModal = (): void => {
    const user = this.authService.currentUser();
    this.editName.set(user.name);
    this.editEmail.set(user.email);
    this.editPhone.set(user.phone);

    const dialog = this.editDialogRef()?.nativeElement;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else if (dialog) {
      dialog.setAttribute('open', '');
    }
  };

  closeEditModal = (): void => {
    const dialog = this.editDialogRef()?.nativeElement;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    } else if (dialog) {
      dialog.removeAttribute('open');
    }
  };

  submitEditProfile = (): void => {
    this.authService.updateProfile({
      name: this.editName(),
      email: this.editEmail(),
      phone: this.editPhone(),
    });
    this.closeEditModal();
  };

  openRechargeModal = (): void => {
    this.rechargeAmount.set(50);
    const dialog = this.rechargeDialogRef()?.nativeElement;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else if (dialog) {
      dialog.setAttribute('open', '');
    }
  };

  closeRechargeModal = (): void => {
    const dialog = this.rechargeDialogRef()?.nativeElement;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    } else if (dialog) {
      dialog.removeAttribute('open');
    }
  };

  submitRecharge = (): void => {
    this.authService.rechargeWallet(Number(this.rechargeAmount()));
    this.closeRechargeModal();
  };

  formatBalance = (value: number): string => {
    return value.toFixed(2).replace('.', ',');
  };
}
