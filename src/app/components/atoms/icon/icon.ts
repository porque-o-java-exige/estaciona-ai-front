import { Component, input } from '@angular/core';

export type IconName =
  | 'accessibility'
  | 'account'
  | 'add'
  | 'back'
  | 'booking'
  | 'card'
  | 'check'
  | 'chat'
  | 'chevron'
  | 'close'
  | 'distance'
  | 'edit'
  | 'email'
  | 'eyeClosed'
  | 'eyeOpen'
  | 'filter'
  | 'garage'
  | 'google'
  | 'history'
  | 'location'
  | 'lock'
  | 'minus'
  | 'notification'
  | 'phone'
  | 'pix'
  | 'search'
  | 'shield'
  | 'star'
  | 'user'
  | 'vehicle'
  | 'wallet';

const iconFiles: Record<IconName, string> = {
  accessibility: 'assets/icons/png/accessibility-icon.png',
  account: 'assets/icons/png/account-bank-icon.png',
  add: 'assets/icons/png/add-circle-icon.png',
  back: 'assets/icons/png/chevron-left-icon.png',
  booking: 'assets/icons/svg/booking-icon.svg',
  card: 'assets/icons/png/bank-card-icon.png',
  check: 'assets/icons/png/check-circle-icon.png',
  chat: 'assets/icons/png/opacity-chat-icon.png',
  chevron: 'assets/icons/png/chevron-left-icon.png',
  close: 'assets/icons/png/close-circle-icon.png',
  distance: 'assets/icons/svg/distance-icon.svg',
  edit: 'assets/icons/png/edit-icon.png',
  email: 'assets/icons/png/email-icon.png',
  eyeClosed: 'assets/icons/png/eye-closed-icon.png',
  eyeOpen: 'assets/icons/png/eye-open-icon.png',
  filter: 'assets/icons/svg/filter-icon.svg',
  garage: 'assets/icons/png/garage-icon.png',
  google: 'assets/icons/svg/google-icon.svg',
  history: 'assets/icons/png/history-icon.png',
  location: 'assets/icons/png/location-pin-icon.png',
  lock: 'assets/icons/png/lock-icon.png',
  minus: 'assets/icons/png/minus-circle-icon.png',
  notification: 'assets/icons/svg/notification-icon.svg',
  phone: 'assets/icons/png/phone-icon.png',
  pix: 'assets/icons/png/pix-icon.png',
  search: 'assets/icons/svg/search-icon.svg',
  shield: 'assets/icons/png/shield-icon.png',
  star: 'assets/icons/png/star-yellow-icon.png',
  user: 'assets/icons/png/user-icon.png',
  vehicle: 'assets/icons/png/vehicle-icon.png',
  wallet: 'assets/icons/png/wallet-icon.png',
};

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  host: {
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
  },
})
export class Icon {
  name = input.required<IconName>();
  size = input<number>(18);
  alt = input<string>('');

  src = (): string => iconFiles[this.name()];
}
