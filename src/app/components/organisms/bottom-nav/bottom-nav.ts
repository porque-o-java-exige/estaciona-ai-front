import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface BottomNavItem {
  label: string;
  route: string;
  activeIcon: string;
  inactiveIcon: string;
  badgeColor?: 'yellow' | 'red';
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss',
})
export class BottomNav {
  navItems: BottomNavItem[] = [
    {
      label: 'Início',
      route: '/home',
      activeIcon: 'assets/icons/png/home-icon.png',
      inactiveIcon: 'assets/icons/png/nav-home-inactive.png',
    },
    {
      label: 'Reservas',
      route: '/booking',
      activeIcon: 'assets/icons/png/booking-icon.png',
      inactiveIcon: 'assets/icons/png/nav-booking-inactive.png',
    },
    {
      label: 'Pagamento',
      route: '/payment',
      activeIcon: 'assets/icons/png/payment-icon.png',
      inactiveIcon: 'assets/icons/png/opacity-payment-icon.png',
      badgeColor: 'yellow',
    },
    {
      label: 'Conversas',
      route: '/chat',
      activeIcon: 'assets/icons/png/chat-icon.png',
      inactiveIcon: 'assets/icons/png/opacity-chat-icon.png',
      badgeColor: 'red',
    },
    {
      label: 'Perfil',
      route: '/profile',
      activeIcon: 'assets/icons/png/user-icon.png',
      inactiveIcon: 'assets/icons/png/opacity-user-icon.png',
    },
  ];
}
