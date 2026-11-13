import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatConversation } from '../../../interfaces/chat.interface';
import { ChatMessageThread } from './chat-message-thread';

describe('ChatMessageThread', () => {
  let component: ChatMessageThread;
  let fixture: ComponentFixture<ChatMessageThread>;

  const conversation: ChatConversation = {
    id: 'conversation-1',
    contactName: 'Francisco',
    avatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    status: 'online',
    lastMessage: 'Olá',
    lastTime: '12:54',
    unreadCount: 0,
    messages: [
      {
        id: 'message-1',
        senderId: 'contact',
        text: 'Olá!',
        timestamp: '12:50',
        isMine: false,
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageThread],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessageThread);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('conversation', conversation);
    fixture.detectChanges();
  });

  it('should emit trimmed messages and clear the draft', () => {
    let sentMessage = '';
    component.messageSent.subscribe((message) => (sentMessage = message));
    component.draftMessage.set('  Olá!  ');

    component.onSendMessage();

    expect(sentMessage).toBe('Olá!');
    expect(component.draftMessage()).toBe('');
  });

  it('should not emit an empty message', () => {
    let emitted = false;
    component.messageSent.subscribe(() => (emitted = true));
    component.draftMessage.set('   ');

    component.onSendMessage();

    expect(emitted).toBe(false);
  });

  it('should show each message timestamp in the bubble footer', () => {
    const time = fixture.nativeElement.querySelector('.message-time') as HTMLTimeElement;

    expect(time.textContent.trim()).toBe('12:50');
  });
});
