import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Avatar } from './avatar';

describe('Avatar', () => {
  let fixture: ComponentFixture<Avatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Avatar],
    }).compileComponents();

    fixture = TestBed.createComponent(Avatar);
    fixture.componentRef.setInput('src', 'assets/images/png/kookie-piska-avatar.png');
    fixture.componentRef.setInput('alt', 'Pessoa');
    fixture.componentRef.setInput('size', 64);
    fixture.componentRef.setInput('status', 'online');
    fixture.detectChanges();
  });

  it('should render the avatar and status at the requested size', () => {
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('.avatar-image')?.getAttribute('alt')).toBe('Pessoa');
    expect(host.querySelector('.avatar-status')).toBeTruthy();
    expect(host.style.width).toBe('64px');
    expect(host.style.height).toBe('64px');
  });

  it('should render the verified badge from the available image asset', () => {
    fixture.componentRef.setInput('verified', true);
    fixture.detectChanges();

    const badge: HTMLImageElement | null =
      fixture.nativeElement.querySelector('.avatar-verified');

    expect(badge?.getAttribute('src')).toBe('assets/images/png/check-circle-icon.png');
  });
});
