import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SignInPage } from './sign-in-page';

describe('SignInPage', () => {
  let component: SignInPage;
  let fixture: ComponentFixture<SignInPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the sign-in page', () => {
    expect(component).toBeTruthy();
  });
});

