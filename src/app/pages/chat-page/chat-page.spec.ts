import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChatPage } from './chat-page';
import { GarageService } from '../../services/garage.service';

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

  it('should include every catalog owner as a conversation contact', () => {
    const conversations = component.chatService.conversations();
    const catalogOwners = new Set(
      TestBed.inject(GarageService).garages().map(({ ownerName }) => ownerName),
    );
    const contactNames = new Set(conversations.map(({ contactName }) => contactName));

    expect(contactNames.size).toBe(conversations.length);
    for (const ownerName of catalogOwners) {
      expect(contactNames.has(ownerName)).toBe(true);
    }
  });

  it('should show a multi-message history for every contact', () => {
    expect(
      component.chatService.conversations().every((conversation) => conversation.messages.length >= 6),
    ).toBe(true);
  });

  it('should show each conversation latest message in its preview', () => {
    const conversations = component.chatService.conversations();
    const catalogConversations = conversations.filter((conversation) =>
      conversation.id.startsWith('catalog-'),
    );

    expect(new Set(catalogConversations.map((conversation) => conversation.lastMessage)).size).toBe(
      catalogConversations.length,
    );
    for (const conversation of conversations) {
      expect(conversation.lastMessage).toBe(
        conversation.messages[conversation.messages.length - 1]?.text,
      );
    }
  });

  it('should append a new message when onSendMessage is called', () => {
    const initialCount = component.chatService.activeConversation().messages.length;
    component.onSendMessage('Olá, vaga disponível?');
    expect(component.chatService.activeConversation().messages.length).toBe(initialCount + 1);
  });

  it('shows unread message counts and clears them when a conversation is opened', () => {
    const unreadConversation = component.chatService
      .conversations()
      .find((conversation) => conversation.id.startsWith('catalog-'));

    expect(unreadConversation).toBeTruthy();
    if (!unreadConversation) {
      return;
    }

    expect(unreadConversation.unreadCount).toBe(1);
    expect(fixture.nativeElement.querySelector('.unread-badge')?.textContent.trim()).toBe('1');

    component.chatService.selectConversation(unreadConversation.id);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.conversation-item.active .unread-badge'),
    ).toBeNull();
  });
});
