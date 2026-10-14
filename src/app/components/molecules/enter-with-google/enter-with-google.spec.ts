import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterWithGoogle } from './enter-with-google';

describe('EnterWithGoogle', () => {
  let component: EnterWithGoogle;
  let fixture: ComponentFixture<EnterWithGoogle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterWithGoogle],
    }).compileComponents();

    fixture = TestBed.createComponent(EnterWithGoogle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
