import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterTabs } from './filter-tabs';

describe('FilterTabs', () => {
  let component: FilterTabs;
  let fixture: ComponentFixture<FilterTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterTabs);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', ['Todas', 'Ativas']);
    fixture.componentRef.setInput('activeOption', 'Todas');
    fixture.componentRef.setInput('ariaLabel', 'Filtros de reservas');
    fixture.detectChanges();
  });

  it('should emit the selected option', () => {
    let selectedOption = '';
    component.optionSelected.subscribe((option) => (selectedOption = option));

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();

    expect(selectedOption).toBe('Ativas');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
  });
});
