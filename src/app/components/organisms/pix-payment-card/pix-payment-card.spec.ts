import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PixPaymentCard } from './pix-payment-card';

describe('PixPaymentCard', () => {
  let component: PixPaymentCard;
  let fixture: ComponentFixture<PixPaymentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixPaymentCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PixPaymentCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('amount', 12.5);
    fixture.componentRef.setInput(
      'pixCode',
      '06465a4s654d32a13654r68a4s5d.pix.a3s21d68w4as54f23r1bv'
    );
    fixture.detectChanges();
  });

  it('should create and format amount', () => {
    expect(component).toBeTruthy();
    expect(component.formattedAmount()).toBe('12,50');
  });
});

