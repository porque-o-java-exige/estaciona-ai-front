import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

export type ProfileTab = 'geral' | 'veiculos' | 'garagens' | 'config';

@Component({
  selector: 'app-profile-tabs-content',
  imports: [FormsModule],
  templateUrl: './profile-tabs-content.html',
  styleUrl: './profile-tabs-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTabsContent {
  private readonly router = inject(Router);
  readonly authService = inject(AuthService);

  openEditProfile = output<void>();

  activeTab = signal<ProfileTab>('geral');

  vehicleDialogRef = viewChild<ElementRef<HTMLDialogElement>>('vehicleDialog');
  garageDialogRef = viewChild<ElementRef<HTMLDialogElement>>('garageDialog');

  newVehicleModel = signal<string>('');
  newVehiclePlate = signal<string>('');
  newVehiclePrimary = signal<boolean>(false);

  newGarageName = signal<string>('');
  newGarageAddress = signal<string>('');
  newGaragePrice = signal<number>(10);

  selectTab = (tab: ProfileTab): void => {
    this.activeTab.set(tab);
  };

  onOptionClick = (action: string): void => {
    switch (action) {
      case 'account':
        this.openEditProfile.emit();
        break;
      case 'vehicles':
        this.activeTab.set('veiculos');
        break;
      case 'payment':
        this.router.navigate(['/payment']);
        break;
      case 'chat':
        this.router.navigate(['/chat']);
        break;
      case 'config':
        this.activeTab.set('config');
        break;
      case 'addresses':
        this.router.navigate(['/list']);
        break;
      case 'history':
        this.router.navigate(['/booking']);
        break;
    }
  };

  openAddVehicleModal = (): void => {
    this.newVehicleModel.set('');
    this.newVehiclePlate.set('');
    this.newVehiclePrimary.set(false);
    const dialog = this.vehicleDialogRef()?.nativeElement;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else if (dialog) {
      dialog.setAttribute('open', '');
    }
  };

  closeAddVehicleModal = (): void => {
    const dialog = this.vehicleDialogRef()?.nativeElement;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    } else if (dialog) {
      dialog.removeAttribute('open');
    }
  };

  submitNewVehicle = (): void => {
    if (!this.newVehicleModel().trim() || !this.newVehiclePlate().trim()) {
      return;
    }
    this.authService.addVehicle({
      model: this.newVehicleModel(),
      licensePlate: this.newVehiclePlate(),
      isPrimary: this.newVehiclePrimary(),
    });
    this.closeAddVehicleModal();
  };

  openAddGarageModal = (): void => {
    this.newGarageName.set('');
    this.newGarageAddress.set('');
    this.newGaragePrice.set(10);
    const dialog = this.garageDialogRef()?.nativeElement;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else if (dialog) {
      dialog.setAttribute('open', '');
    }
  };

  closeAddGarageModal = (): void => {
    const dialog = this.garageDialogRef()?.nativeElement;
    if (dialog && typeof dialog.close === 'function') {
      dialog.close();
    } else if (dialog) {
      dialog.removeAttribute('open');
    }
  };

  submitNewGarage = (): void => {
    if (!this.newGarageName().trim() || !this.newGarageAddress().trim()) {
      return;
    }
    this.authService.addOwnedGarage({
      name: this.newGarageName(),
      address: this.newGarageAddress(),
      pricePerHour: Number(this.newGaragePrice()),
    });
    this.closeAddGarageModal();
  };

  formatCurrency = (value: number): string => {
    return value.toFixed(2).replace('.', ',');
  };
}

