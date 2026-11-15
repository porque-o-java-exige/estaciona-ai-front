import { computed, inject, Injectable, signal } from '@angular/core';
import { ChatConversation, ChatMessage } from '../interfaces/chat.interface';
import { GarageService } from './garage.service';

const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv-01',
    contactName: 'Francisco',
    avatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    status: 'online',
    lastMessage: 'Combinado, obrigado! Até mais.',
    lastTime: '14:36',
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
      {
        id: 'msg-105',
        senderId: 'contact',
        text: 'Pode me chamar por aqui assim que estiver chegando.',
        timestamp: '14:34',
        isMine: false,
      },
      {
        id: 'msg-106',
        senderId: 'me',
        text: 'Combinado, obrigado! Até mais.',
        timestamp: '14:36',
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
    lastTime: '13:53',
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
      {
        id: 'msg-207',
        senderId: 'contact',
        text: 'Isso mesmo. É só informar seu nome na portaria.',
        timestamp: '13:51',
        isMine: false,
      },
      {
        id: 'msg-208',
        senderId: 'me',
        text: 'Perfeito, obrigada!',
        timestamp: '13:53',
        isMine: true,
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly garageService = inject(GarageService);

  conversations = signal<ChatConversation[]>(this.createInitialConversations());
  selectedConversationId = signal<string>('conv-02');
  mobileThreadOpen = signal<boolean>(false);

  private createInitialConversations(): ChatConversation[] {
    const conversations = [...INITIAL_CONVERSATIONS];
    const knownContacts = new Set(conversations.map((conversation) => conversation.contactName));

    for (const garage of this.garageService.garages()) {
      if (knownContacts.has(garage.ownerName)) {
        continue;
      }

      const id = `catalog-${garage.ownerName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const lastMessage = `Na ${garage.name}, avise-me quando estiver chegando.`;
      conversations.push({
        id,
        contactName: garage.ownerName,
        avatarUrl: garage.ownerAvatarUrl,
        status: 'away',
        lastMessage,
        lastTime: 'Agora',
        unreadCount: 1,
        messages: [
          {
            id: `${id}-welcome`,
            senderId: 'contact',
            text: `Olá! Posso ajudar com sua reserva na ${garage.name}.`,
            timestamp: '14:10',
            isMine: false,
          },
          {
            id: `${id}-availability-question`,
            senderId: 'me',
            text: 'Oi! Gostaria de saber se há vaga disponível hoje.',
            timestamp: '14:12',
            isMine: true,
          },
          {
            id: `${id}-availability-answer`,
            senderId: 'contact',
            text: `Sim, temos vagas. O valor por hora é R$${garage.hourlyPrice}.`,
            timestamp: '14:14',
            isMine: false,
          },
          {
            id: `${id}-access-question`,
            senderId: 'me',
            text: 'A vaga é coberta? Como faço para entrar?',
            timestamp: '14:16',
            isMine: true,
          },
          {
            id: `${id}-access-answer`,
            senderId: 'contact',
            text: `A garagem fica em ${garage.address}. A entrada é bem sinalizada.`,
            timestamp: '14:18',
            isMine: false,
          },
          {
            id: `${id}-booking-confirmation`,
            senderId: 'me',
            text: 'Perfeito! Vou fazer a reserva pelo aplicativo.',
            timestamp: '14:20',
            isMine: true,
          },
          {
            id: `${id}-arrival-help`,
            senderId: 'contact',
            text: lastMessage,
            timestamp: 'Agora',
            isMine: false,
          },
        ],
      });
      knownContacts.add(garage.ownerName);
    }

    return conversations;
  }

  totalConversations = computed(() => this.conversations().length);

  unreadMessagesCount = computed(() =>
    this.conversations().reduce((total, conversation) => total + conversation.unreadCount, 0)
  );

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
