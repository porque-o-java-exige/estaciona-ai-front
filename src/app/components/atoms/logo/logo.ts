import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type LogoSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class Logo {
  size = input<LogoSize>('sm');
  linkTo = input<string>('/home');
}

