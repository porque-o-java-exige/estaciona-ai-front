import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { FeedbackService } from '../../../services/feedback.service';
import { ProfileTabsContent } from './profile-tabs-content';

describe('ProfileTabsContent', () => {
  let component: ProfileTabsContent;
  let fixture: ComponentFixture<ProfileTabsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTabsContent],
      providers: [
        provideRouter([
          { path: 'privacy', component: ProfileTabsContent },
          { path: 'terms', component: ProfileTabsContent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileTabsContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and default to geral tab', () => {
    expect(component).toBeTruthy();
    expect(component.activeTab()).toBe('geral');
  });

  it('should use the standard payment and chat icons in their profile options', () => {
    const paymentOption = [...fixture.nativeElement.querySelectorAll('.option-card')].find(
      (option: HTMLElement) => option.textContent?.includes('Formas de pagamento')
    ) as HTMLElement | undefined;
    const chatOption = [...fixture.nativeElement.querySelectorAll('.option-card')].find(
      (option: HTMLElement) => option.textContent?.includes('Conversas')
    ) as HTMLElement | undefined;

    expect(paymentOption?.querySelector('img')?.getAttribute('src')).toBe(
      'assets/icons/png/payment-icon.png'
    );
    expect(chatOption?.querySelector('img')?.getAttribute('src')).toBe(
      'assets/icons/png/chat-icon.png'
    );
  });

  it('should switch tabs when selectTab is called', () => {
    component.selectTab('veiculos');
    expect(component.activeTab()).toBe('veiculos');
    component.selectTab('garagens');
    expect(component.activeTab()).toBe('garagens');
    component.selectTab('config');
    expect(component.activeTab()).toBe('config');
  });

  it('should navigate to the privacy policy and terms pages from config', async () => {
    component.selectTab('config');
    fixture.detectChanges();

    const legalButtons = [
      ...fixture.nativeElement.querySelectorAll('button.config-row.clickable'),
    ] as HTMLButtonElement[];
    legalButtons.find((button) => button.textContent?.includes('Política de privacidade'))?.click();
    await fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/privacy');

    legalButtons.find((button) => button.textContent?.includes('Termos de uso'))?.click();
    await fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/terms');
  });

  it('should show a required-field error when submitting an incomplete vehicle', () => {
    const vehicleCount = component.authService.vehicles().length;

    component.submitNewVehicle();

    expect(component.authService.vehicles()).toHaveLength(vehicleCount);
    expect(component.vehicleFormError()).toBe(
      'Preencha a marca, o ano, a cor e a placa do veículo.',
    );
  });

  it('should add a vehicle with its brand, year, color, and plate', () => {
    component.newVehicleBrand.set('BYD');
    component.newVehicleYear.set(2024);
    component.newVehicleColor.set('Prata');
    component.newVehiclePlate.set('BRA2E19');
    component.newVehicleType.set('motorcycle');

    component.submitNewVehicle();

    const vehicle = component.authService.vehicles().at(-1);
    expect(vehicle).toMatchObject({
      model: '2024 BYD',
      brand: 'BYD',
      year: 2024,
      color: 'Prata',
      licensePlate: 'BRA2E19',
      vehicleType: 'motorcycle',
      verificationStatus: 'pending',
    });
  });

  it('should normalize and accept old-format Brazilian plates', () => {
    component.onVehiclePlateChange('abc-1234');
    expect(component.newVehiclePlate()).toBe('ABC1234');

    component.newVehicleBrand.set('Fiat');
    component.newVehicleColor.set('Preto');
    component.submitNewVehicle();

    expect(component.authService.vehicles().at(-1)?.licensePlate).toBe('ABC1234');
  });

  it('should reject vehicle plates that are not in the old or Mercosul format', () => {
    const vehicleCount = component.authService.vehicles().length;
    component.newVehicleBrand.set('Fiat');
    component.newVehicleColor.set('Preto');
    component.newVehiclePlate.set('ABC12D34');

    component.submitNewVehicle();

    expect(component.authService.vehicles()).toHaveLength(vehicleCount);
    expect(component.vehicleFormError()).toBe('Informe uma placa válida: ABC1234 ou ABC1D23.');
  });

  it('should edit vehicle details and require verification again when its plate changes', () => {
    const vehicle = component.authService.vehicles()[0];
    component.authService.vehicles.update((vehicles) =>
      vehicles.map((item) =>
        item.id === vehicle.id ? { ...item, verificationStatus: 'verified' } : item,
      ),
    );
    const dialog = fixture.nativeElement.querySelector(
      '[aria-labelledby="add-vehicle-title"]',
    ) as HTMLDialogElement;
    Object.defineProperty(dialog, 'showModal', {
      value: () => dialog.setAttribute('open', ''),
    });
    Object.defineProperty(dialog, 'close', {
      value: () => dialog.removeAttribute('open'),
    });

    component.openEditVehicleModal(vehicle);
    component.newVehicleColor.set('Azul');
    component.newVehiclePlate.set('XYZ1234');
    component.newVehicleType.set('van');
    component.submitNewVehicle();

    expect(component.authService.vehicles().find((item) => item.id === vehicle.id)).toMatchObject({
      model: '2023 Tesla Model Y',
      color: 'Azul',
      licensePlate: 'XYZ1234',
      vehicleType: 'van',
      verificationStatus: 'pending',
    });
    expect(TestBed.inject(FeedbackService).current()?.message).toBe(
      'Veículo atualizado com sucesso.',
    );
  });

  it('should show all system vehicle verification statuses', () => {
    const [verifiedVehicle, rejectedVehicle] = component.authService.vehicles();
    component.authService.setVehicleVerificationStatus(verifiedVehicle.id, 'verified');
    component.authService.setVehicleVerificationStatus(rejectedVehicle.id, 'rejected');
    component.selectTab('veiculos');
    fixture.detectChanges();

    const statuses = [...fixture.nativeElement.querySelectorAll('.vehicle-status-badge')];
    expect(statuses.map((status: HTMLElement) => status.textContent?.trim())).toEqual([
      'Verificado',
      'Indeferido',
    ]);
    expect(
      [...fixture.nativeElement.querySelectorAll('select[name="vehicleType"] option')].map(
        (option: HTMLOptionElement) => option.textContent?.trim(),
      ),
    ).toEqual(['Carro pequeno', 'SUV', 'Moto', 'Van']);
  });

  it('should show an icon that matches each vehicle type', () => {
    expect(component.vehicleIcon('small-car')).toBe('assets/icons/png/sedan-icon.png');
    expect(component.vehicleIcon('suv')).toBe('assets/icons/png/suv-icon.png');
    expect(component.vehicleIcon('motorcycle')).toBe('assets/icons/png/motorcycle-icon.png');
    expect(component.vehicleIcon('van')).toBe('assets/icons/png/van-icon.png');
  });

  it('should require a garage photo before creating the garage', () => {
    component.newGarageName.set('Garagem nova');
    component.newGarageAddress.set('Rua Exemplo, 100');
    const garageCount = component.authService.ownedGarages().length;

    component.submitNewGarage();

    expect(component.authService.ownedGarages()).toHaveLength(garageCount);
    expect(component.garageImageError()).toBe('Adicione pelo menos uma foto da garagem.');
  });

  it('should show garage information in the details modal', () => {
    component.selectTab('garagens');
    fixture.detectChanges();
    const garage = component.authService.ownedGarages()[0];
    const dialog = fixture.nativeElement.querySelector(
      '[aria-labelledby="garage-detail-title"]'
    ) as HTMLDialogElement;
    Object.defineProperty(dialog, 'showModal', {
      value: () => dialog.setAttribute('open', ''),
    });

    component.openGarageDetails(garage);
    fixture.detectChanges();

    expect(dialog.open).toBe(true);
    expect(dialog.textContent).toContain(garage.name);
    expect(dialog.textContent).toContain(garage.address);
    expect(dialog.textContent).toContain('Reservas');
    expect(fixture.nativeElement.textContent).toContain('Ver detalhes');
    expect(dialog.querySelector('.garage-detail-close')?.getAttribute('aria-label')).toBe(
      'Fechar detalhes da vaga',
    );
    expect(dialog.querySelector('.garage-detail-close img')?.getAttribute('src')).toBe(
      'assets/icons/png/close-circle-icon.png',
    );
  });

  it('should register all uploaded garage photos and show them in its carousel', async () => {
    const fileInput = document.createElement('input');
    const photos = [
      new File(['first'], 'garage-front.png', { type: 'image/png' }),
      new File(['second'], 'garage-inside.png', { type: 'image/png' }),
    ];
    Object.defineProperty(fileInput, 'files', { value: photos });

    await component.onGarageImagesSelected({ target: fileInput } as unknown as Event);

    expect(component.newGarageImages()).toHaveLength(2);
    component.newGarageName.set('Garagem nova');
    component.newGarageAddress.set('Rua Exemplo, 100');
    component.submitNewGarage();
    expect(TestBed.inject(FeedbackService).current()?.message).toBe(
      'Garagem cadastrada com sucesso.'
    );

    const garage = component.authService.ownedGarages().at(-1);
    if (!garage) {
      throw new Error('The garage should be added after valid photos are uploaded.');
    }
    expect(garage?.imageUrls).toHaveLength(2);
    expect(garage?.imageUrl).toBe(garage?.imageUrls[0]);
    expect(component.garageImages(garage)).toHaveLength(2);
    expect(component.garageImageIndex(garage.id, 2)).toBe(0);

    component.changeGarageImage(garage.id, 2, 1);
    expect(component.garageImageIndex(garage.id, 2)).toBe(1);
  });
});
