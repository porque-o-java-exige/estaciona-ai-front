import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Icon } from './icon';

describe('Icon', () => {
  let fixture: ComponentFixture<Icon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Icon],
    }).compileComponents();
    fixture = TestBed.createComponent(Icon);
    fixture.componentRef.setInput('name', 'home');
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve resolver o src correto para o ícone home', () => {
    expect(fixture.componentInstance.src()).toBe('/assets/icons/home-icon.svg');
  });

  it('deve aplicar tamanho md (20px) por padrão', () => {
    expect(fixture.componentInstance.sizePx()).toBe(20);
  });
});
