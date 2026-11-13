import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Avatar } from '../../atoms/avatar/avatar';
import { ChatConversation } from '../../../interfaces/chat.interface';

@Component({
  selector: 'app-chat-conversation-list',
  standalone: true,
  imports: [RouterLink, Avatar],
  templateUrl: './chat-conversation-list.html',
  styleUrl: './chat-conversation-list.scss',
})
export class ChatConversationList {
  conversations = input.required<readonly ChatConversation[]>();
  activeConversationId = input.required<string>();

  conversationSelected = output<string>();
}
