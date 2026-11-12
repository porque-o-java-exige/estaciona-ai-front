export type ContactStatus = 'online' | 'busy' | 'away';

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export interface ChatConversation {
  id: string;
  contactName: string;
  avatarUrl: string;
  status: ContactStatus;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

