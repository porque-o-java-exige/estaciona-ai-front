import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GarageCard } from './garage-card';

describe('GarageCard', () => {
  let fixture: ComponentFixture<GarageCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageCard],
    }).compileComponents();
    fixture = TestBed.createComponent(GarageCard);
    fixture.componentRef.setInput('name', 'Estacionamento Central');
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve renderizar na variante listing por padrão', () => {
    const el = fixture.nativeElement.querySelector('.garage-card-listing');
    expect(el).toBeTruthy();
  });

  it('deve renderizar na variante owned', () => {
    fixture.componentRef.setInput('variant', 'owned');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.garage-card-owned');
    expect(el).toBeTruthy();
  });
});
