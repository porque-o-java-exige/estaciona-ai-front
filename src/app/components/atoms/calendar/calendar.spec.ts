import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calendar } from './calendar';

describe('Calendar', () => {
  let fixture: ComponentFixture<Calendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calendar],
    }).compileComponents();
    fixture = TestBed.createComponent(Calendar);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve ter 7 colunas de dias da semana', () => {
    const weekdays = fixture.nativeElement.querySelectorAll('.weekday');
    expect(weekdays.length).toBe(7);
  });

  it('deve gerar os dias do mês atual', () => {
    const days = fixture.componentInstance.days();
    const currentMonthDays = days.filter((d) => d.isCurrentMonth);
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    expect(currentMonthDays.length).toBe(daysInMonth);
  });
});
