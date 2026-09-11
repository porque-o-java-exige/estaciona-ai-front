import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Label } from './label';

describe('Label', () => {
  let fixture: ComponentFixture<Label>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Label],
    }).compileComponents();
    fixture = TestBed.createComponent(Label);
    fixture.componentRef.setInput('text', 'Teste');
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve renderizar como <p> na variante body por padrão', () => {
    const el = fixture.nativeElement.querySelector('p.label-body');
    expect(el).toBeTruthy();
    expect(el.textContent.trim()).toBe('Teste');
  });

  it('deve renderizar como <h2> na variante heading', () => {
    fixture.componentRef.setInput('variant', 'heading');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('h2.label-heading');
    expect(el).toBeTruthy();
  });
});
