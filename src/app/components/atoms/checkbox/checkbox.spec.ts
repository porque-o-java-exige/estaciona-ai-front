import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  let fixture: ComponentFixture<Checkbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkbox],
    }).compileComponents();
    fixture = TestBed.createComponent(Checkbox);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve iniciar não marcado', () => {
    expect(fixture.componentInstance.checked()).toBe(false);
    const btn = fixture.nativeElement.querySelector('.checkbox');
    expect(btn.classList.contains('checkbox-checked')).toBe(false);
  });

  it('deve marcar ao clicar', () => {
    const btn = fixture.nativeElement.querySelector('.checkbox');
    btn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.checked()).toBe(true);
    expect(btn.classList.contains('checkbox-checked')).toBe(true);
  });
});
