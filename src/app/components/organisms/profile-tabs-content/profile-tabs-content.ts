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
import {
  UserGarage,
  UserVehicle,
  UserVehicleType,
  VehicleVerificationStatus,
} from '../../../interfaces/user.interface';
import { AuthService } from '../../../services/auth.service';
import { FeedbackService } from '../../../services/feedback.service';

export type ProfileTab = 'geral' | 'veiculos' | 'garagens' | 'config';

const VEHICLE_ICONS: Record<UserVehicleType, string> = {
  'small-car': 'assets/icons/png/sedan-icon.png',
  suv: 'assets/icons/png/suv-icon.png',
  motorcycle: 'assets/icons/png/motorcycle-icon.png',
  van: 'assets/icons/png/van-icon.png',
};

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

  editingVehicleId = signal<string | null>(null);
  newVehicleBrand = signal<string>('');
  newVehicleYear = signal<number>(new Date().getFullYear());
  newVehicleColor = signal<string>('');
  newVehiclePlate = signal<string>('');
  newVehicleType = signal<UserVehicleType>('small-car');
  newVehiclePrimary = signal<boolean>(false);
  vehicleFormError = signal<string | null>(null);
  currentYear = new Date().getFullYear();

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
      case 'privacy':
        this.router.navigate(['/privacy']);
        break;
      case 'terms':
        this.router.navigate(['/terms']);
        break;
      case 'comingSoon':
        this.router.navigate(['/profile/coming-soon']);
        break;
    }
  };

  openAddVehicleModal = (): void => {
    this.editingVehicleId.set(null);
    this.newVehicleBrand.set('');
    this.newVehicleYear.set(this.currentYear);
    this.newVehicleColor.set('');
    this.newVehiclePlate.set('');
    this.newVehicleType.set('small-car');
    this.newVehiclePrimary.set(false);
    this.vehicleFormError.set(null);
    const dialog = this.vehicleDialogRef()?.nativeElement;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  };

  openEditVehicleModal = (vehicle: UserVehicle): void => {
    this.editingVehicleId.set(vehicle.id);
    this.newVehicleBrand.set(vehicle.brand);
    this.newVehicleYear.set(vehicle.year);
    this.newVehicleColor.set(vehicle.color);
    this.newVehiclePlate.set(vehicle.licensePlate);
    this.newVehicleType.set(vehicle.vehicleType);
    this.newVehiclePrimary.set(vehicle.isPrimary);
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

  onVehiclePlateChange = (value: string): void => {
    this.newVehiclePlate.set(value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 7));
  };

  submitNewVehicle = (): void => {
    this.vehicleFormError.set(null);
    const brand = this.newVehicleBrand().trim();
    const year = Number(this.newVehicleYear());
    const color = this.newVehicleColor().trim();
    const plate = this.newVehiclePlate().replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (!brand || !Number.isInteger(year) || year < 1900 || year > this.currentYear + 1 || !color || !plate) {
      this.vehicleFormError.set('Preencha a marca, o ano, a cor e a placa do veículo.');
      return;
    }
    if (!/^[A-Z]{3}(?:[0-9]{4}|[0-9][A-Z][0-9]{2})$/.test(plate)) {
      this.vehicleFormError.set('Informe uma placa válida: ABC1234 ou ABC1D23.');
      return;
    }
    const editingVehicleId = this.editingVehicleId();
    const currentVehicle = this.authService.vehicles().find(
      (vehicle) => vehicle.id === editingVehicleId,
    );
    const currentPrefix = currentVehicle
      ? `${currentVehicle.year} ${currentVehicle.brand}`
      : '';
    const modelSuffix =
      currentVehicle &&
      currentVehicle.model.toLowerCase().startsWith(currentPrefix.toLowerCase())
        ? currentVehicle.model.slice(currentPrefix.length).trim()
        : '';
    const payload = {
      model: [year, brand, modelSuffix].filter(Boolean).join(' '),
      brand,
      year,
      color,
      licensePlate: plate,
      vehicleType: this.newVehicleType(),
      isPrimary: this.newVehiclePrimary(),
    };
    if (editingVehicleId) {
      this.authService.updateVehicle(editingVehicleId, payload);
    } else {
      this.authService.addVehicle(payload);
    }
    this.closeAddVehicleModal();
    this.feedback.showSuccess(
      editingVehicleId ? 'Veículo atualizado com sucesso.' : 'Veículo cadastrado com sucesso.',
    );
  };

  vehicleTypeLabel = (type: UserVehicleType): string => {
    switch (type) {
      case 'small-car':
        return 'Carro pequeno';
      case 'suv':
        return 'SUV';
      case 'motorcycle':
        return 'Moto';
      case 'van':
        return 'Van';
    }
  };

  vehicleIcon = (type: UserVehicleType): string => VEHICLE_ICONS[type];

  vehicleVerificationLabel = (status: VehicleVerificationStatus): string => {
    switch (status) {
      case 'verified':
        return 'Verificado';
      case 'rejected':
        return 'Indeferido';
      case 'pending':
        return 'Em verificação';
    }
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
