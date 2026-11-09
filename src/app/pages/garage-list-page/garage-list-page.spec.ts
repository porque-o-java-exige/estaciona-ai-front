import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GarageListPage } from './garage-list-page';

describe('GarageListPage', () => {
  let component: GarageListPage;
  let fixture: ComponentFixture<GarageListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageListPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GarageListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and list garages', () => {
    expect(component).toBeTruthy();
    expect(component.garages().length).toBeGreaterThan(0);
  });
});

