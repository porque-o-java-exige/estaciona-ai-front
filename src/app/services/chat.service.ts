import { computed, Injectable, signal } from '@angular/core';
import { ChatConversation, ChatMessage } from '../interfaces/chat.interface';

const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv-01',
    contactName: 'Francisco',
    avatarUrl: 'assets/images/chat-avatar-1.png',
    status: 'online',
    lastMessage: 'essa é a ultima mensagem com o máximo de caracteres possiveis e dps...',
    lastTime: '12:54',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-101',
        senderId: 'contact',
        text: 'Olá! Sua vaga coberta está liberada para hoje às 15:00.',
        timestamp: '12:50',
        isMine: false,
      },
      {
        id: 'msg-102',
        senderId: 'me',
        text: 'Perfeito, Francisco! Chego em cerca de 15 minutos.',
        timestamp: '12:52',
        isMine: true,
      },
      {
        id: 'msg-103',
        senderId: 'contact',
        text: 'essa é a ultima mensagem com o máximo de caracteres possiveis e dps...',
        timestamp: '12:54',
        isMine: false,
      },
    ],
  },
  {
    id: 'conv-02',
    contactName: 'Francisco',
    avatarUrl: 'assets/images/chat-avatar-2.png',
    status: 'online',
    lastMessage: 'Até logo!',
    lastTime: '12:54',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-201',
        senderId: 'contact',
        text: 'Olá, gostaria de saber como faço pra poder estacionar na sua garagem....',
        timestamp: '12:40',
        isMine: false,
      },
      {
        id: 'msg-202',
        senderId: 'me',
        text: 'É só você vir aqui que te dou a chave da casa.',
        timestamp: '12:42',
        isMine: true,
      },
      {
        id: 'msg-203',
        senderId: 'contact',
        text: 'Mas, se eu roubar a sua casa ?',
        timestamp: '12:45',
        isMine: false,
      },
      {
        id: 'msg-204',
        senderId: 'me',
        text: 'Você é dessa raça que faz essas coisas?',
        timestamp: '12:47',
        isMine: true,
      },
      {
        id: 'msg-205',
        senderId: 'contact',
        text: 'Jamais ...',
        timestamp: '12:49',
        isMine: false,
      },
      {
        id: 'msg-206',
        senderId: 'me',
        text: 'Então pronto, seu zé mané!',
        timestamp: '12:51',
        isMine: true,
      },
      {
        id: 'msg-207',
        senderId: 'contact',
        text: 'Ah tá, entendi.',
        timestamp: '12:52',
        isMine: false,
      },
      {
        id: 'msg-208',
        senderId: 'contact',
        text: 'Vou chamar o Gabriel.',
        timestamp: '12:53',
        isMine: false,
      },
      {
        id: 'msg-209',
        senderId: 'contact',
        text: 'Até logo!',
        timestamp: '12:54',
        isMine: false,
      },
    ],
  },
  {
    id: 'conv-03',
    contactName: 'Francisco',
    avatarUrl: 'assets/images/chat-avatar-1.png',
    status: 'online',
    lastMessage: 'estacionar dentro de... ',
    lastTime: '12:54',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-301',
        senderId: 'contact',
        text: 'Bom dia! Posso estacionar dentro de 20 minutos?',
        timestamp: '12:54',
        isMine: false,
      },
    ],
  },
  {
    id: 'conv-04',
    contactName: 'Francisco',
    avatarUrl: 'assets/images/chat-avatar-1.png',
    status: 'busy',
    lastMessage: 'você!',
    lastTime: '12:54',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-401',
        senderId: 'me',
        text: 'Obrigado pela reserva, até a próxima!',
        timestamp: '12:50',
        isMine: true,
      },
      {
        id: 'msg-402',
        senderId: 'contact',
        text: 'Eu que agradeço a você!',
        timestamp: '12:54',
        isMine: false,
      },
    ],
  },
  {
    id: 'conv-05',
    contactName: 'Francisco',
    avatarUrl: 'assets/images/chat-avatar-1.png',
    status: 'online',
    lastMessage: 'você!',
    lastTime: '12:54',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-501',
        senderId: 'contact',
        text: 'Portão automático já está aberto para você!',
        timestamp: '12:54',
        isMine: false,
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

