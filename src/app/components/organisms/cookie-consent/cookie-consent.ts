import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieConsentService } from '../../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.scss',
})
export class CookieConsent {
  readonly consent = inject(CookieConsentService);

  onAnalyticsChange = (event: Event): void => {
    if (event.target instanceof HTMLInputElement) {
      this.consent.setAnalyticsChoice(event.target.checked);
    }
  };
}
