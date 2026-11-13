import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GarageMap } from './garage-map';

describe('GarageMap', () => {
  let component: GarageMap;
  let fixture: ComponentFixture<GarageMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageMap],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GarageMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('does not show a garage preview until a pin is selected', () => {
    expect(component.activePinGarage()).toBeNull();

    component.onSelectGarage(component.garages()[0].id);

    expect(component.activePinGarage()?.id).toBe(component.garages()[0].id);
  });
});
