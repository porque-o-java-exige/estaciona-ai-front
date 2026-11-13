import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FeedbackService } from '../../../services/feedback.service';
import { ProfileTabsContent } from './profile-tabs-content';

describe('ProfileTabsContent', () => {
  let component: ProfileTabsContent;
  let fixture: ComponentFixture<ProfileTabsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTabsContent],
      providers: [provideRouter([])],
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

  it('should show a required-field error when submitting an incomplete vehicle', () => {
    const vehicleCount = component.authService.vehicles().length;

    component.submitNewVehicle();

    expect(component.authService.vehicles()).toHaveLength(vehicleCount);
    expect(component.vehicleFormError()).toBe('Preencha o modelo e a placa do veículo.');
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
