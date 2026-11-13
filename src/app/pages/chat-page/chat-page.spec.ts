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

  it('should use a unique contact name and photo for each conversation', () => {
    const conversations = component.chatService.conversations();

    expect(new Set(conversations.map(({ contactName }) => contactName)).size).toBe(
      conversations.length,
    );
    expect(new Set(conversations.map(({ avatarUrl }) => avatarUrl)).size).toBe(
      conversations.length,
    );
  });

  it('should append a new message when onSendMessage is called', () => {
    const initialCount = component.chatService.activeConversation().messages.length;
    component.onSendMessage('Olá, vaga disponível?');
    expect(component.chatService.activeConversation().messages.length).toBe(initialCount + 1);
  });
});
