import { Component, computed, input } from '@angular/core';

export type AvatarVariant = 'image' | 'initials';
export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarStatus = 'online' | 'offline' | 'none';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  src = input<string>('');
  name = input<string>('');
  size = input<AvatarSize>('md');
  status = input<AvatarStatus>('none');
  isVerified = input<boolean>(false);

  variant = computed<AvatarVariant>(() => (this.src() ? 'image' : 'initials'));

  initials = computed(() => {
    const parts = this.name().trim().split(/\s+/);
    if (parts.length === 0 || !parts[0]) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });
}
