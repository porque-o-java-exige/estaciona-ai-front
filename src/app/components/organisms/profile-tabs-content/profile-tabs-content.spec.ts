import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProfileTabsContent } from './profile-tabs-content';

describe('ProfileTabsContent', () => {
  let component: ProfileTabsContent;
  let fixture: ComponentFixture<ProfileTabsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTabsContent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileTabsContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and default to geral tab', () => {
    expect(component).toBeTruthy();
    expect(component.activeTab()).toBe('geral');
  });

  it('should switch tabs when selectTab is called', () => {
    component.selectTab('veiculos');
    expect(component.activeTab()).toBe('veiculos');
    component.selectTab('garagens');
    expect(component.activeTab()).toBe('garagens');
    component.selectTab('config');
    expect(component.activeTab()).toBe('config');
  });
});

