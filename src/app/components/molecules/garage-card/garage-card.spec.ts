import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GarageCard } from './garage-card';
import { GarageItem } from '../../../interfaces';

describe('GarageCard', () => {
  let component: GarageCard;
  let fixture: ComponentFixture<GarageCard>;

  const mockGarage: GarageItem = {
    id: 'garagem-paulista-prime',
    name: 'Garagem Paulista Prime',
    address: 'Av. Paulista, 1578 - Bela Vista',
    shortSummary: 'Coberta 24h',
    description: 'Garagem coberta 24h',
    hourlyPrice: 8,
    dailyPrice: 30,
    remainingSpots: 3,
    availabilityLevel: 'medium',
    rating: 4.8,
    reviewsCount: 124,
    distance: '0.2 km',
    imageUrl: 'assets/images/png/garage-tesla.png',
    characteristics: ['Acesso 24/7'],
    ownerName: 'Marcus Kim',
    ownerInitials: 'MK',
    ownerAvatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    mapPin: { top: '34%', left: '44%' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GarageCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('garage', mockGarage);
    fixture.detectChanges();
  });

  it('should create and render garage details', () => {
    expect(component).toBeTruthy();
    expect(component.spotsLabel()).toBe('3 vagas');
  });
});
