import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link to the legal pages', () => {
    const destinations = [...fixture.nativeElement.querySelectorAll('a')].map(
      (link: HTMLAnchorElement) => link.getAttribute('href'),
    );

    expect(destinations).toEqual(['/privacy', '/terms', '/cookies']);
  });

  it('should keep the rights notice in a separate span for mobile layout', () => {
    const rightsNotice = fixture.nativeElement.querySelector('.app-footer-rights');

    expect(rightsNotice.textContent.trim()).toBe('Todos os direitos reservados.');
  });
});

