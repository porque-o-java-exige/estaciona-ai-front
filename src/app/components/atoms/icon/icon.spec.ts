import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Icon } from './icon';

describe('Icon', () => {
  let fixture: ComponentFixture<Icon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Icon],
    }).compileComponents();

    fixture = TestBed.createComponent(Icon);
    fixture.componentRef.setInput('name', 'star');
    fixture.detectChanges();
  });

  it('should render a decorative icon from the asset catalog', () => {
    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');

    expect(image.getAttribute('src')).toBe('assets/icons/png/star-yellow-icon.png');
    expect(image.getAttribute('aria-hidden')).toBe('true');
  });
});
