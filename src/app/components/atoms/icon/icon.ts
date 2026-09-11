import { Component, computed, input } from '@angular/core';

export type IconName =
  | 'home' | 'booking' | 'payment' | 'chat-tab' | 'profile'
  | 'back-arrow' | 'map-pin' | 'clock' | 'car' | 'wallet'
  | 'bell' | 'location-pin' | 'accessibility' | 'history'
  | 'chevron-right' | 'add' | 'verified' | 'send'
  | 'notification' | 'filter' | 'star' | 'distance' | 'chat'
  | 'card' | 'pix' | 'google';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const iconFileMap: Record<IconName, string> = {
  home: 'home-icon.svg',
  booking: 'booking-icon.svg',
  payment: 'payment-icon.svg',
  'chat-tab': 'chat-tab-icon.svg',
  profile: 'profile-icon.svg',
  'back-arrow': 'back-arrow-icon.svg',
  'map-pin': 'map-pin-icon.svg',
  clock: 'clock-icon.svg',
  car: 'car-icon.svg',
  wallet: 'wallet-icon.svg',
  bell: 'bell-icon.svg',
  'location-pin': 'location-pin-icon.svg',
  accessibility: 'accessibility-icon.svg',
  history: 'history-icon.svg',
  'chevron-right': 'chevron-right-icon.svg',
  add: 'add-icon.svg',
  verified: 'verified-icon.svg',
  send: 'send-icon.svg',
  notification: 'notification-icon.svg',
  filter: 'filter-icon.svg',
  star: 'star-icon.svg',
  distance: 'distance-icon.svg',
  chat: 'chat-icon.svg',
  card: 'card-icon.svg',
  pix: 'pix-icon.svg',
  google: 'google-icon.svg',
};

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {
  name = input.required<IconName>();
  size = input<IconSize>('md');
  alt = input<string>('');

  src = computed(() => `/assets/icons/${iconFileMap[this.name()]}`);
  sizePx = computed(() => sizeMap[this.size()]);
}
