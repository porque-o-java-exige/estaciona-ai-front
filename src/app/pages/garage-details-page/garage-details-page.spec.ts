import { ViewportScroller } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { GarageDetailsPage } from './garage-details-page';

describe('GarageDetailsPage', () => {
  let component: GarageDetailsPage;
  let fixture: ComponentFixture<GarageDetailsPage>;
  let scrollToPosition: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    scrollToPosition = vi.fn();
    await TestBed.configureTestingModule({
      imports: [GarageDetailsPage],
      providers: [
        provideRouter([]),
        {
          provide: ViewportScroller,
          useValue: {
            getScrollPosition: () => [0, 0],
            scrollToPosition,
            scrollToAnchor: vi.fn(),
            setHistoryScrollRestoration: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GarageDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and display garage details', () => {
    expect(component).toBeTruthy();
    expect(component.garage().name).toBeTruthy();
    expect(component.garage().characteristics.length).toBe(9);
    expect(
      fixture.nativeElement
        .querySelector('.garage-details-owner-avatar')
        ?.getAttribute('src')
    ).toBe(component.garage().ownerAvatarUrl);
  });

  it('should scroll to the top when opening garage details', () => {
    expect(scrollToPosition).toHaveBeenCalledWith([0, 0]);
  });
});

