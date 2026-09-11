import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Avatar } from './avatar';

describe('Avatar', () => {
  let fixture: ComponentFixture<Avatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Avatar],
    }).compileComponents();
    fixture = TestBed.createComponent(Avatar);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve mostrar iniciais quando não há src', () => {
    fixture.componentRef.setInput('name', 'Marcus Kim');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.avatar-initials');
    expect(el?.textContent?.trim()).toBe('MK');
  });
});
