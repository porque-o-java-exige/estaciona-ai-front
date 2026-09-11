import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Toggle } from './toggle';

describe('Toggle', () => {
  let fixture: ComponentFixture<Toggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toggle],
    }).compileComponents();
    fixture = TestBed.createComponent(Toggle);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve iniciar desativado (checked = false)', () => {
    expect(fixture.componentInstance.checked()).toBe(false);
  });

  it('deve alternar para true ao clicar', () => {
    const btn = fixture.nativeElement.querySelector('.toggle');
    btn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.checked()).toBe(true);
  });
});
