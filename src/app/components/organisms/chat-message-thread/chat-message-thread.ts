import {
  AfterViewChecked,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Avatar } from '../../atoms/avatar/avatar';
import { ChatConversation } from '../../../interfaces/chat.interface';

@Component({
  selector: 'app-chat-message-thread',
  standalone: true,
  imports: [FormsModule, Avatar],
  templateUrl: './chat-message-thread.html',
  styleUrl: './chat-message-thread.scss',
})
export class ChatMessageThread implements AfterViewChecked {
  conversation = input.required<ChatConversation>();

  backToList = output<void>();
  messageSent = output<string>();

  messagesScrollRef = viewChild<ElementRef<HTMLElement>>('messagesScroll');

  draftMessage = signal<string>('');
  private lastConversationId = '';
  private lastMessageCount = -1;

  ngAfterViewChecked(): void {
    const conversation = this.conversation();
    if (
      conversation.id !== this.lastConversationId ||
      conversation.messages.length !== this.lastMessageCount
    ) {
      this.scrollToBottom();
      this.lastConversationId = conversation.id;
      this.lastMessageCount = conversation.messages.length;
    }
  }

  onSendMessage = (): void => {
    const text = this.draftMessage().trim();
    if (!text) {
      return;
    }
    this.messageSent.emit(text);
    this.draftMessage.set('');
  };

  private scrollToBottom = (): void => {
    const element = this.messagesScrollRef()?.nativeElement;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };
}
