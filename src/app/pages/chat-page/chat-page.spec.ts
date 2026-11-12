import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChatPage } from './chat-page';

describe('ChatPage', () => {
  let component: ChatPage;
  let fixture: ComponentFixture<ChatPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and display conversations and active messages', () => {
    expect(component).toBeTruthy();
    expect(component.chatService.conversations().length).toBeGreaterThan(0);
    expect(component.chatService.activeConversation()).toBeTruthy();
  });

  it('should append a new message when onSendMessage is called', () => {
    const initialCount = component.chatService.activeConversation().messages.length;
    component.draftMessage.set('Olá, vaga disponível?');
    component.onSendMessage();
    expect(component.chatService.activeConversation().messages.length).toBe(initialCount + 1);
    expect(component.draftMessage()).toBe('');
  });
});

