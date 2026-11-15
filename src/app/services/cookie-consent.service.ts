import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
}

const CONSENT_COOKIE = 'estaciona_ai_cookie_consent';
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly document = inject(DOCUMENT);

  readonly preferences = signal<CookiePreferences | null>(this.readPreferences());
  readonly analyticsChoice = signal(this.preferences()?.analytics ?? false);
  readonly settingsOpen = signal(false);
  readonly visible = computed(() => this.preferences() === null || this.settingsOpen());

  openSettings = (): void => {
    this.analyticsChoice.set(this.preferences()?.analytics ?? false);
    this.settingsOpen.set(true);
  };

  toggleSettings = (): void => {
    if (this.settingsOpen()) {
      this.settingsOpen.set(false);
      return;
    }
    this.openSettings();
  };

  setAnalyticsChoice = (allowed: boolean): void => {
    this.analyticsChoice.set(allowed);
  };

  acceptAll = (): void => {
    this.savePreferences(true);
  };

  rejectOptional = (): void => {
    this.savePreferences(false);
  };

  saveChoice = (): void => {
    this.savePreferences(this.analyticsChoice());
  };

  private savePreferences(analytics: boolean): void {
    const preferences: CookiePreferences = { necessary: true, analytics };
    const secure = this.document.location.protocol === 'https:' ? '; Secure' : '';
    this.document.cookie =
      `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(preferences))}; ` +
      `Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
    this.preferences.set(preferences);
    this.settingsOpen.set(false);
  }

  private readPreferences(): CookiePreferences | null {
    const cookie = this.document.cookie
      .split(';')
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${CONSENT_COOKIE}=`));
    if (!cookie) {
      return null;
    }

    try {
      const parsed: unknown = JSON.parse(
        decodeURIComponent(cookie.slice(CONSENT_COOKIE.length + 1)),
      );
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'necessary' in parsed &&
        parsed.necessary === true &&
        'analytics' in parsed &&
        typeof parsed.analytics === 'boolean'
      ) {
        return { necessary: true, analytics: parsed.analytics };
      }
    } catch {
      return null;
    }

    return null;
  }
}
