import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-page',
  imports: [FormsModule],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage implements OnInit, AfterViewChecked {
  private readonly route = inject(ActivatedRoute);
  readonly chatService = inject(ChatService);

  messagesScrollRef = viewChild<ElementRef<HTMLElement>>('messagesScroll');

  draftMessage = signal<string>('');
  private shouldScrollToBottom = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const isMessagesRoute = this.route.snapshot.routeConfig?.path?.includes('mensagens');

    if (idParam) {
      this.chatService.selectConversation(idParam);
      this.shouldScrollToBottom = true;
    } else if (isMessagesRoute) {
      this.chatService.mobileThreadOpen.set(true);
      this.shouldScrollToBottom = true;
    } else {
      this.chatService.mobileThreadOpen.set(false);
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  onSelectConversation = (conversationId: string): void => {
    this.chatService.selectConversation(conversationId);
    this.shouldScrollToBottom = true;
  };

  onBackToList = (): void => {
    this.chatService.closeMobileThread();
  };

  onSendMessage = (): void => {
    const text = this.draftMessage().trim();
    if (!text) {
      return;
    }
    this.chatService.sendMessage(text);
    this.draftMessage.set('');
    this.shouldScrollToBottom = true;
  };

  private scrollToBottom = (): void => {
    const el = this.messagesScrollRef()?.nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };
}
