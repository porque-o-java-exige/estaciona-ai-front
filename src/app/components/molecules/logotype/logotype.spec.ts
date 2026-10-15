import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logotype } from './logotype';

describe('Logotype', () => {
  let component: Logotype;
  let fixture: ComponentFixture<Logotype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logotype],
    }).compileComponents();

    fixture = TestBed.createComponent(Logotype);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
