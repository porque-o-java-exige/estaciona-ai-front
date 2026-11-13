import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Image } from './image';

describe('Image', () => {
  let fixture: ComponentFixture<Image>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Image],
    }).compileComponents();

    fixture = TestBed.createComponent(Image);
    fixture.componentRef.setInput('src', 'assets/images/png/garage-tesla.png');
    fixture.componentRef.setInput('alt', 'Garagem');
    fixture.componentRef.setInput('width', 90);
    fixture.componentRef.setInput('height', 90);
    fixture.detectChanges();
  });

  it('should render an accessible image at the requested dimensions', () => {
    const host: HTMLElement = fixture.nativeElement;
    const image = host.querySelector('img');

    expect(image).not.toBeNull();
    if (!image) {
      return;
    }

    expect(image.getAttribute('src')).toBe('assets/images/png/garage-tesla.png');
    expect(image.getAttribute('alt')).toBe('Garagem');
    expect(host.style.width).toBe('90px');
    expect(host.style.height).toBe('90px');
  });
});
