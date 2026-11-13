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
import { UserGarage } from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';
import { FeedbackService } from '../../../services/feedback.service';

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
  private readonly feedback = inject(FeedbackService);

  openEditProfile = output<void>();

  activeTab = signal<ProfileTab>('geral');

  vehicleDialogRef = viewChild<ElementRef<HTMLDialogElement>>('vehicleDialog');
  garageDialogRef = viewChild<ElementRef<HTMLDialogElement>>('garageDialog');
  garageDetailsDialogRef = viewChild<ElementRef<HTMLDialogElement>>('garageDetailsDialog');
  selectedGarage = signal<UserGarage | null>(null);

  newVehicleModel = signal<string>('');
  newVehiclePlate = signal<string>('');
  newVehiclePrimary = signal<boolean>(false);
  vehicleFormError = signal<string | null>(null);

  newGarageName = signal<string>('');
  newGarageAddress = signal<string>('');
  newGaragePrice = signal<number>(10);
  newGarageImages = signal<Array<{ name: string; src: string }>>([]);
  garageImageError = signal<string | null>(null);
  garageFormError = signal<string | null>(null);
  garageCarouselIndexes = signal<Record<string, number>>({});

  selectTab = (tab: ProfileTab): void => {
    this.activeTab.set(tab);
  };

  onOptionClick = (action: string): void => {
    switch (action) {
      case 'account':
        this.router.navigate(['/profile/account']);
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
      case 'comingSoon':
        this.router.navigate(['/profile/coming-soon']);
        break;
    }
  };

  openAddVehicleModal = (): void => {
    this.newVehicleModel.set('');
    this.newVehiclePlate.set('');
    this.newVehiclePrimary.set(false);
    this.vehicleFormError.set(null);
    const dialog = this.vehicleDialogRef()?.nativeElement;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  closeAddVehicleModal = (): void => {
    const dialog = this.vehicleDialogRef()?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
  };

  submitNewVehicle = (): void => {
    this.vehicleFormError.set(null);
    if (!this.newVehicleModel().trim() || !this.newVehiclePlate().trim()) {
      this.vehicleFormError.set('Preencha o modelo e a placa do veículo.');
      return;
    }
    this.authService.addVehicle({
      model: this.newVehicleModel(),
      licensePlate: this.newVehiclePlate(),
      isPrimary: this.newVehiclePrimary(),
    });
    this.closeAddVehicleModal();
    this.feedback.showSuccess('Veículo cadastrado com sucesso.');
  };

  openAddGarageModal = (): void => {
    this.newGarageName.set('');
    this.newGarageAddress.set('');
    this.newGaragePrice.set(10);
    this.newGarageImages.set([]);
    this.garageImageError.set(null);
    this.garageFormError.set(null);
    const dialog = this.garageDialogRef()?.nativeElement;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  closeAddGarageModal = (): void => {
    const dialog = this.garageDialogRef()?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
  };

  openGarageDetails = (garage: UserGarage): void => {
    this.selectedGarage.set(garage);
    const dialog = this.garageDetailsDialogRef()?.nativeElement;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  closeGarageDetails = (): void => {
    const dialog = this.garageDetailsDialogRef()?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
    this.selectedGarage.set(null);
  };

  onGarageImagesSelected = async (event: Event): Promise<void> => {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.garageImageError.set(null);

    if (files.some((file) => !file.type.startsWith('image/'))) {
      this.garageImageError.set('Selecione somente arquivos de imagem.');
      return;
    }

    try {
      const newImages = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          src: await this.readImageFile(file),
        })),
      );
      this.newGarageImages.update((images) => [...images, ...newImages]);
    } catch (error) {
      this.garageImageError.set(
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar as fotos. Tente novamente.',
      );
    }
  };

  removeGarageImage = (indexToRemove: number): void => {
    this.newGarageImages.update((images) =>
      images.filter((_, index) => index !== indexToRemove),
    );
  };

  garageImages = (garage: { imageUrl: string; imageUrls?: string[] }): readonly string[] =>
    garage.imageUrls?.length ? garage.imageUrls : [garage.imageUrl];

  garageImageIndex = (garageId: string, imageCount: number): number =>
    imageCount > 0 ? (this.garageCarouselIndexes()[garageId] ?? 0) % imageCount : 0;

  changeGarageImage = (garageId: string, imageCount: number, direction: -1 | 1): void => {
    if (imageCount < 2) {
      return;
    }
    const currentIndex = this.garageImageIndex(garageId, imageCount);
    const nextIndex = (currentIndex + direction + imageCount) % imageCount;
    this.garageCarouselIndexes.update((indexes) => ({ ...indexes, [garageId]: nextIndex }));
  };

  submitNewGarage = (): void => {
    this.garageFormError.set(null);
    this.garageImageError.set(null);
    if (!this.newGarageName().trim() || !this.newGarageAddress().trim()) {
      this.garageFormError.set('Preencha o nome e o endereço da garagem.');
      return;
    }
    if (!Number.isFinite(this.newGaragePrice()) || this.newGaragePrice() <= 0) {
      this.garageFormError.set('Informe um valor por hora maior que zero.');
      return;
    }
    const imageUrls = this.newGarageImages().map(({ src }) => src);
    if (imageUrls.length === 0) {
      this.garageImageError.set('Adicione pelo menos uma foto da garagem.');
      return;
    }
    this.authService.addOwnedGarage({
      name: this.newGarageName(),
      address: this.newGarageAddress(),
      pricePerHour: Number(this.newGaragePrice()),
      imageUrls,
    });
    this.closeAddGarageModal();
    this.feedback.showSuccess('Garagem cadastrada com sucesso.');
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

  formatCurrency = (value: number): string => {
    return value.toFixed(2).replace('.', ',');
  };
}
