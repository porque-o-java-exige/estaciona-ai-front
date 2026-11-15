import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Logo } from './logo';

describe('Logo', () => {
  let component: Logo;
  let fixture: ComponentFixture<Logo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logo],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Logo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the logo component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to the white symbol in dark mode', () => {
    const authService = TestBed.inject(AuthService);

    authService.settings.update((settings) => ({ ...settings, darkMode: false }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.app-logo-icon').getAttribute('src')).toBe(
      'assets/logos/svg/estaciona-ai-symbol.svg',
    );

    authService.settings.update((settings) => ({ ...settings, darkMode: true }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.app-logo-icon').getAttribute('src')).toBe(
      'assets/logos/svg/estaciona-ai-white-symbol.svg',
    );
  });
});

