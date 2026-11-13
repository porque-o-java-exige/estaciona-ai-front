import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use an explicitly provided icon instead of the variant default', () => {
    fixture.componentRef.setInput('variant', 'card');
    fixture.componentRef.setInput('iconSrc', 'assets/icons/png/wallet-icon.png');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('img')?.getAttribute('src')).toBe(
      'assets/icons/png/wallet-icon.png',
    );
  });
});
