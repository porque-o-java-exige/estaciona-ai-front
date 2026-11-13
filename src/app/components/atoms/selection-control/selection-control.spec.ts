import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionControl } from './selection-control';

describe('SelectionControl', () => {
  let component: SelectionControl;
  let fixture: ComponentFixture<SelectionControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionControl],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionControl);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', 'Selecionar garagem');
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();
  });

  it('should expose its selected state and emit when toggled', () => {
    let toggled = false;
    component.toggled.subscribe(() => (toggled = true));

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.querySelector('img')?.getAttribute('src')).toBe(
      'assets/icons/png/check-icon.png'
    );
    expect(toggled).toBe(true);
  });
});
