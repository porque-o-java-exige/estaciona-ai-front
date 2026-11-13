import { computed, Injectable, signal } from '@angular/core';
import { ChatConversation, ChatMessage } from '../interfaces/chat.interface';

const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv-01',
    contactName: 'Francisco',
    avatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    status: 'online',
    lastMessage: 'Obrigado! Te aviso quando chegar.',
    lastTime: '14:32',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-101',
        senderId: 'contact',
        text: 'Oi! Confirmei sua reserva para hoje, das 15h às 17h.',
        timestamp: '14:26',
        isMine: false,
      },
      {
        id: 'msg-102',
        senderId: 'me',
        text: 'Perfeito, obrigado. A entrada é pela Rua Haddock Lobo?',
        timestamp: '14:28',
        isMine: true,
      },
      {
        id: 'msg-103',
        senderId: 'contact',
        text: 'Isso mesmo. O portão tem uma placa azul; me chama quando estiver chegando.',
        timestamp: '14:30',
        isMine: false,
      },
      {
        id: 'msg-104',
        senderId: 'me',
        text: 'Obrigado! Te aviso quando chegar.',
        timestamp: '14:32',
        isMine: true,
      },
    ],
  },
  {
    id: 'conv-02',
    contactName: 'Camila Rocha',
    avatarUrl: 'assets/images/png/chat-woman-avatar.png',
    status: 'online',
    lastMessage: 'Perfeito, obrigada!',
    lastTime: '13:49',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-201',
        senderId: 'contact',
        text: 'Olá! Vi sua reserva para amanhã. Você precisa de uma vaga coberta?',
        timestamp: '13:39',
        isMine: false,
      },
      {
        id: 'msg-202',
        senderId: 'me',
        text: 'Sim, por favor. Vou chegar por volta das 9h.',
        timestamp: '13:41',
        isMine: true,
      },
      {
        id: 'msg-203',
        senderId: 'contact',
        text: 'Sem problema! A entrada fica na Alameda Santos, ao lado da guarita.',
        timestamp: '13:44',
        isMine: false,
      },
      {
        id: 'msg-204',
        senderId: 'me',
        text: 'Ótimo. Preciso avisar alguém quando chegar?',
        timestamp: '13:46',
        isMine: true,
      },
      {
        id: 'msg-205',
        senderId: 'contact',
        text: 'Vou deixar o controle na portaria. É só informar seu nome.',
        timestamp: '13:48',
        isMine: false,
      },
      {
        id: 'msg-206',
        senderId: 'me',
        text: 'Perfeito, obrigada!',
        timestamp: '13:49',
        isMine: true,
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  conversations = signal<ChatConversation[]>(INITIAL_CONVERSATIONS);
  selectedConversationId = signal<string>('conv-02');
  mobileThreadOpen = signal<boolean>(false);

  totalConversations = computed(() => this.conversations().length);

  activeConversation = computed(
    () =>
      this.conversations().find((conv) => conv.id === this.selectedConversationId()) ??
      this.conversations()[0]
  );

  selectConversation = (conversationId: string): void => {
    this.selectedConversationId.set(conversationId);
    this.mobileThreadOpen.set(true);
    this.conversations.update((list) =>
      list.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv))
    );
  };

  closeMobileThread = (): void => {
    this.mobileThreadOpen.set(false);
  };

  sendMessage = (text: string): void => {
    const cleanText = text.trim();
    if (!cleanText) {
      return;
    }

    const activeId = this.selectedConversationId();
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text: cleanText,
      timestamp: timeStr,
      isMine: true,
    };

    this.conversations.update((list) =>
      list.map((conv) =>
        conv.id === activeId
          ? {
              ...conv,
              lastMessage: cleanText,
              lastTime: timeStr,
              messages: [...conv.messages, newMessage],
            }
          : conv
      )
    );
  };
}
