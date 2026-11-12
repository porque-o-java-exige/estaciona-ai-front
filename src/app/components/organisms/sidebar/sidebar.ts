import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarNavItem {
  id: 'home' | 'booking' | 'payment' | 'chat' | 'profile';
  label: string;
  route: string;
  icon: string;
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
  isExpanded = signal<boolean>(false);

  navItems: SidebarNavItem[] = [
    { id: 'home', label: 'Início', route: '/home', icon: 'assets/icons/home-icon.svg' },
    { id: 'booking', label: 'Reservas', route: '/booking', icon: 'assets/icons/booking-icon.svg' },
    {
      id: 'payment',
      label: 'Pagamentos',
      route: '/payment',
      icon: 'assets/icons/payment-icon.svg',
      badgeColor: 'yellow',
    },
    {
      id: 'chat',
      label: 'Conversas',
      route: '/chat',
      icon: 'assets/icons/chat-nav-icon.svg',
      badgeColor: 'red',
    },
    { id: 'profile', label: 'Perfil', route: '/profile', icon: 'assets/icons/profile-icon.svg' },
  ];

  setExpanded = (expanded: boolean): void => {
    this.isExpanded.set(expanded);
  };

  onFocusOut = (event: FocusEvent): void => {
    const currentTarget = event.currentTarget as HTMLElement | null;
    const relatedTarget = event.relatedTarget as Node | null;
    if (currentTarget && (!relatedTarget || !currentTarget.contains(relatedTarget))) {
      this.isExpanded.set(false);
    }
  };
}
