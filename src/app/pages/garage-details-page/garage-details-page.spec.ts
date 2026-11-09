import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GarageDetailsPage } from './garage-details-page';

describe('GarageDetailsPage', () => {
  let component: GarageDetailsPage;
  let fixture: ComponentFixture<GarageDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageDetailsPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GarageDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and display garage details', () => {
    expect(component).toBeTruthy();
    expect(component.garage().name).toBeTruthy();
    expect(component.garage().characteristics.length).toBe(9);
  });
});

