import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    window.localStorage.removeItem('estaciona-ai-dark-mode');
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('applies and saves the dark theme preference', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    fixture.componentInstance.authService.toggleSetting('darkMode');
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('data-theme')).toBe('dark');
    expect(window.localStorage.getItem('estaciona-ai-dark-mode')).toBe('true');
  });

  it('restores the saved dark theme on startup', () => {
    window.localStorage.setItem('estaciona-ai-dark-mode', 'true');

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('data-theme')).toBe('dark');
  });
});
