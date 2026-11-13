import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Price } from './price';

describe('Price', () => {
  let fixture: ComponentFixture<Price>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Price],
    }).compileComponents();

    fixture = TestBed.createComponent(Price);
    fixture.componentRef.setInput('amount', 12.5);
    fixture.componentRef.setInput('suffix', '/h');
    fixture.detectChanges();
  });

  it('should format a price with its currency and suffix', () => {
    expect(fixture.nativeElement.textContent.trim()).toBe('R$12,50/h');
  });
});
