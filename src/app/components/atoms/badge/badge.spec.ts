import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Badge } from './badge';

describe('Badge', () => {
  let fixture: ComponentFixture<Badge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Badge],
    }).compileComponents();
    fixture = TestBed.createComponent(Badge);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve exibir 99+ quando count > 99', () => {
    fixture.componentRef.setInput('count', 150);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.badge');
    expect(el?.textContent?.trim()).toBe('99+');
  });

  it('não deve renderizar quando count é 0 na variante count', () => {
    fixture.componentRef.setInput('variant', 'count');
    fixture.componentRef.setInput('count', 0);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.badge');
    expect(el).toBeNull();
  });
});
