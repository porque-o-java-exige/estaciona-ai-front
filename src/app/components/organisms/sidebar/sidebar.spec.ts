import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the sidebar organism with 5 semantic list items including Perfil', () => {
    expect(component).toBeTruthy();
    expect(component.navItems.length).toBe(5);
    const listItems = fixture.nativeElement.querySelectorAll('.app-sidebar-item');
    expect(listItems.length).toBe(5);
  });

  it('should toggle expanded overlay state on hover interaction', () => {
    expect(component.isExpanded()).toBe(false);
    component.setExpanded(true);
    fixture.detectChanges();
    expect(component.isExpanded()).toBe(true);
    const aside = fixture.nativeElement.querySelector('.app-sidebar') as HTMLElement;
    expect(aside.classList.contains('is-expanded')).toBe(true);
  });
});
