import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { ChatService } from '../../../services/chat.service';

export interface SidebarNavItem {
  id: 'home' | 'booking' | 'payment' | 'chat' | 'profile';
  label: string;
  route: string;
  activeIcon: string;
  inactiveIcon: string;
  badgeColor?: 'yellow' | 'red';
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly bookingService = inject(BookingService);
  private readonly chatService = inject(ChatService);

  navItems: SidebarNavItem[] = [
    {
      id: 'home',
      label: 'Início',
      route: '/home',
      activeIcon: 'assets/icons/png/home-icon.png',
      inactiveIcon: 'assets/icons/png/nav-home-inactive.png',
    },
    {
      id: 'booking',
      label: 'Reservas',
      route: '/booking',
      activeIcon: 'assets/icons/png/booking-icon.png',
      inactiveIcon: 'assets/icons/png/nav-booking-inactive.png',
    },
    {
      id: 'payment',
      label: 'Pagamentos',
      route: '/payment',
      activeIcon: 'assets/icons/png/payment-icon.png',
      inactiveIcon: 'assets/icons/png/opacity-payment-icon.png',
      badgeColor: 'yellow',
    },
    {
      id: 'chat',
      label: 'Conversas',
      route: '/chat',
      activeIcon: 'assets/icons/png/chat-icon.png',
      inactiveIcon: 'assets/icons/png/opacity-chat-icon.png',
      badgeColor: 'red',
    },
    {
      id: 'profile',
      label: 'Perfil',
      route: '/profile',
      activeIcon: 'assets/icons/png/user-icon.png',
      inactiveIcon: 'assets/icons/png/opacity-user-icon.png',
    },
  ];

  shouldShowBadge = (item: SidebarNavItem): boolean => {
    if (item.id === 'payment') {
      return this.bookingService.paymentCandidates().length > 0;
    }
    return item.id === 'chat' && this.chatService.unreadMessagesCount() > 0;
  };
}
