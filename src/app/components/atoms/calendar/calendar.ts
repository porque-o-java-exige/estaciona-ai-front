import { Component, computed, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  currentDate = input<Date>(new Date());
  selectedDates = model<Date[]>([]);
  highlightToday = input<boolean>(true);

  dateSelected = output<Date>();

  readonly weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

  monthLabel = computed(() => {
    const d = this.currentDate();
    return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  });

  days = computed<CalendarDay[]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ref = this.currentDate();
    const year = ref.getFullYear();
    const month = ref.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Pad start (domingo = 0)
    const startPad = firstDay.getDay();
    const days: CalendarDay[] = [];

    // Dias do mês anterior para completar a grid
    for (let i = startPad - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push(this.buildDay(d, false, today));
    }

    // Dias do mês atual
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(this.buildDay(new Date(year, month, d), true, today));
    }

    return days;
  });

  private buildDay(date: Date, isCurrentMonth: boolean, today: Date): CalendarDay {
    date.setHours(0, 0, 0, 0);
    return {
      date,
      dayNumber: date.getDate(),
      isCurrentMonth,
      isToday: date.getTime() === today.getTime(),
      isSelected: this.selectedDates().some((s) => {
        const d = new Date(s);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === date.getTime();
      }),
    };
  }

  selectDay(day: CalendarDay): void {
    if (!day.isCurrentMonth) return;
    const exists = this.selectedDates().some((s) => {
      const d = new Date(s);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === day.date.getTime();
    });
    if (exists) {
      this.selectedDates.update((dates) =>
        dates.filter((s) => {
          const d = new Date(s);
          d.setHours(0, 0, 0, 0);
          return d.getTime() !== day.date.getTime();
        })
      );
    } else {
      this.selectedDates.update((dates) => [...dates, day.date]);
    }
    this.dateSelected.emit(day.date);
  }
}
