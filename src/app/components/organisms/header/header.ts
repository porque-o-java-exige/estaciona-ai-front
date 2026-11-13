import {
  Component,
  computed,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import { Logo } from '../../atoms/logo/logo';
import { AuthService } from '../../../services/auth.service';
import { GarageService } from '../../../services/garage.service';

export interface HeaderNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  route: string;
  read: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink, Logo, Input, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly garageService = inject(GarageService);
  private readonly router = inject(Router);

  user = this.authService.currentUser;
  searchQuery = this.garageService.searchQuery;
  isNotificationsOpen = signal<boolean>(false);
  notificationsDialogRef = viewChild<ElementRef<HTMLDialogElement>>('notificationsDialog');

  notifications = signal<HeaderNotification[]>([
    {
      id: 'notif-1',
      title: 'Reserva ativa hoje',
      description: 'Garagem Paulista Prime • 19:00–21:00',
      time: 'Agora',
      route: '/booking',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Nova mensagem de Francisco',
      description: 'Sua vaga coberta está liberada para hoje.',
      time: '5 min',
      route: '/chat/conv-1',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Pagamento via PIX com 5% OFF',
      description: 'Aproveite o desconto instantâneo na sua reserva.',
      time: '1h',
      route: '/payment',
      read: true,
    },
  ]);

  unreadNotificationsCount = computed(
    () => this.notifications().filter((item) => !item.read).length
  );

  filterClick = output<void>();
  notificationClick = output<void>();

  onSearchChange = (value: string): void => {
    this.garageService.setSearchQuery(value);
  };

  onFilterClick = (): void => {
    this.filterClick.emit();
    this.router.navigate(['/list']);
  };

  onNotificationClick = (): void => {
    const dialog = this.notificationsDialogRef()?.nativeElement;
    if (dialog) {
      if (dialog.open) {
        dialog.close();
        this.isNotificationsOpen.set(false);
      } else {
        dialog.showModal();
        this.isNotificationsOpen.set(true);
      }
    }
    this.notificationClick.emit();
  };

  onNotificationsDialogClose = (): void => {
    this.isNotificationsOpen.set(false);
  };

  markAllNotificationsAsRead = (): void => {
    this.notifications.update((list) => list.map((item) => ({ ...item, read: true })));
  };

  onSelectNotification = (notification: HeaderNotification): void => {
    this.notifications.update((list) =>
      list.map((item) => (item.id === notification.id ? { ...item, read: true } : item))
    );
    const dialog = this.notificationsDialogRef()?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
    this.isNotificationsOpen.set(false);
    this.router.navigateByUrl(notification.route);
  };
}
