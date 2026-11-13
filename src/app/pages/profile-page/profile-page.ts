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
import { ProfileOverview } from '../../components/organisms/profile-overview/profile-overview';
import { ProfileTabsContent } from '../../components/organisms/profile-tabs-content/profile-tabs-content';
import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-profile-page',
  imports: [FormsModule, RouterLink, ProfileOverview, ProfileTabsContent],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  readonly authService = inject(AuthService);
  private readonly feedback = inject(FeedbackService);

  editDialogRef = viewChild<ElementRef<HTMLDialogElement>>('editProfileDialog');
  rechargeDialogRef = viewChild<ElementRef<HTMLDialogElement>>('rechargeDialog');

  editName = signal<string>('');
  editEmail = signal<string>('');
  editPhone = signal<string>('');
  editAvatarUrl = signal<string | null>(null);

  rechargeAmount = signal<number>(50);
  editFormError = signal<string | null>(null);
  rechargeFormError = signal<string | null>(null);

  openEditModal = (): void => {
    this.editFormError.set(null);
    const user = this.authService.currentUser();
    this.editName.set(user.name);
    this.editEmail.set(user.email);
    this.editPhone.set(user.phone);
    this.editAvatarUrl.set(user.avatarUrl);

    const dialog = this.editDialogRef()?.nativeElement;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  closeEditModal = (): void => {
    const dialog = this.editDialogRef()?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
  };

  onAvatarSelected = async (event: Event): Promise<void> => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    this.editFormError.set(null);

    if (!file) {
      return;
    }
    if (!file.type.startsWith('image/')) {
      this.editFormError.set('Selecione um arquivo de imagem.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.editFormError.set('A foto deve ter no máximo 5 MB.');
      return;
    }

    try {
      this.editAvatarUrl.set(await this.readImageFile(file));
    } catch (error) {
      this.editFormError.set(
        error instanceof Error ? error.message : 'Não foi possível carregar a foto. Tente novamente.',
      );
    }
  };

  submitEditProfile = (): void => {
    this.editFormError.set(null);
    if (!this.editName().trim() || !this.editEmail().trim()) {
      this.editFormError.set('Preencha seu nome e e-mail.');
      return;
    }
    this.authService.updateProfile({
      name: this.editName(),
      email: this.editEmail(),
      phone: this.editPhone(),
      avatarUrl: this.editAvatarUrl() ?? undefined,
    });
    this.closeEditModal();
    this.feedback.showSuccess('Perfil atualizado com sucesso.');
  };

  openRechargeModal = (): void => {
    this.rechargeAmount.set(50);
    this.rechargeFormError.set(null);
    const dialog = this.rechargeDialogRef()?.nativeElement;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  closeRechargeModal = (): void => {
    const dialog = this.rechargeDialogRef()?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
  };

  submitRecharge = (): void => {
    this.rechargeFormError.set(null);
    const amount = Number(this.rechargeAmount());
    if (!Number.isFinite(amount) || amount < 5) {
      this.rechargeFormError.set('Informe um valor de recarga igual ou superior a R$ 5,00.');
      return;
    }
    this.authService.rechargeWallet(amount);
    this.closeRechargeModal();
    this.feedback.showSuccess('Carteira recarregada com sucesso.');
  };

  private readImageFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error(`Não foi possível ler a foto "${file.name}".`));
        }
      };
      reader.onerror = () => reject(new Error(`Falha ao carregar a foto "${file.name}".`));
      reader.readAsDataURL(file);
    });
  }
}
