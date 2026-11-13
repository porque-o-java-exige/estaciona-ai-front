import { Component, input } from '@angular/core';

export type AvatarStatus = 'online' | 'busy' | 'away';

@Component({
  selector: 'app-avatar',
  standalone: true,
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  host: {
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
  },
})
export class Avatar {
  src = input.required<string>();
  alt = input.required<string>();
  size = input<number>(48);
  status = input<AvatarStatus | null>(null);
  verified = input<boolean>(false);
}
