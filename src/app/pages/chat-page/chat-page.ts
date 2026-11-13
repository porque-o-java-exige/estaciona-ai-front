import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatConversationList } from '../../components/organisms/chat-conversation-list/chat-conversation-list';
import { ChatMessageThread } from '../../components/organisms/chat-message-thread/chat-message-thread';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-page',
  imports: [ChatConversationList, ChatMessageThread],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly chatService = inject(ChatService);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const isMessagesRoute = this.route.snapshot.routeConfig?.path?.includes('mensagens');

    if (idParam) {
      this.chatService.selectConversation(idParam);
    } else if (isMessagesRoute) {
      this.chatService.mobileThreadOpen.set(true);
    } else {
      this.chatService.mobileThreadOpen.set(false);
    }
  }

  onSelectConversation = (conversationId: string): void => {
    this.chatService.selectConversation(conversationId);
  };

  onBackToList = (): void => {
    this.chatService.closeMobileThread();
  };

  onSendMessage = (text: string): void => {
    this.chatService.sendMessage(text);
  };
}
