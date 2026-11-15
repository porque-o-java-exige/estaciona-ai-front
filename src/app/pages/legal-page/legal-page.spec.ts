import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { LegalPage } from './legal-page';

describe('LegalPage', () => {
  it('should render the document selected by route data', async () => {
    await TestBed.configureTestingModule({
      imports: [LegalPage],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { data: of({ document: 'terms' }) } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(LegalPage);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      'Termos de Serviço',
    );
    expect(fixture.nativeElement.querySelector('.legal-draft-notice')).toBeNull();
  });

  it('should render the contact email inline in the text as a mail link', async () => {
    await TestBed.configureTestingModule({
      imports: [LegalPage],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { data: of({ document: 'privacy' }) } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(LegalPage);
    fixture.detectChanges();

    const email = fixture.nativeElement.querySelector(
      'p .legal-contact-email',
    ) as HTMLAnchorElement;
    expect(email.textContent?.trim()).toBe('estaciona.ai.2026@gmail.com');
    expect(email.getAttribute('href')).toBe('mailto:estaciona.ai.2026@gmail.com');
    expect(email.parentElement?.textContent).toContain(
      'Para assuntos de privacidade, entre em contato pelo e-mail',
    );
  });

  it('should expose cookie preference management on the cookie document', async () => {
    await TestBed.configureTestingModule({
      imports: [LegalPage],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { data: of({ document: 'cookies' }) } },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(LegalPage);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Política de Cookies');
    expect(fixture.nativeElement.querySelector('.manage-cookie-settings')).not.toBeNull();
  });
});
