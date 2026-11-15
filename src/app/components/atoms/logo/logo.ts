import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

export type LogoSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class Logo {
  private readonly authService = inject(AuthService);

  size = input<LogoSize>('sm');
  linkTo = input<string>('/home');

  iconSrc = computed(() =>
    this.authService.settings().darkMode
      ? 'assets/logos/svg/estaciona-ai-white-symbol.svg'
      : 'assets/logos/svg/estaciona-ai-symbol.svg'
  );
}

