import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface BottomNavItem {
  label: string;
  route: string;
  icon: string;
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
    { label: 'Início', route: '/home', icon: 'assets/icons/home-icon.svg' },
    { label: 'Reservas', route: '/booking', icon: 'assets/icons/booking-icon.svg' },
    { label: 'Pagamento', route: '/payment', icon: 'assets/icons/payment-icon.svg', badgeColor: 'yellow' },
    { label: 'Conversas', route: '/chat', icon: 'assets/icons/chat-nav-icon.svg', badgeColor: 'red' },
    { label: 'Perfil', route: '/profile', icon: 'assets/icons/profile-icon.svg' },
  ];
}

