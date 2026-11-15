import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { BottomNav } from './components/organisms/bottom-nav/bottom-nav';
import { CookieConsent } from './components/organisms/cookie-consent/cookie-consent';
import { Header } from './components/organisms/header/header';
import { Sidebar } from './components/organisms/sidebar/sidebar';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { FeedbackService } from './services/feedback.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Sidebar, BottomNav, CookieConsent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[attr.data-theme]': "authService.settings().darkMode ? 'dark' : 'light'",
  },
})
export class App {
  private readonly router = inject(Router);
  private readonly chatService = inject(ChatService);
  readonly authService = inject(AuthService);
  readonly feedbackService = inject(FeedbackService);

  protected readonly title = signal('estacionaAi');
  currentUrl = signal(this.router.url || '/sign-in');

  isAuthRoute = computed(() => {
    const url = this.currentUrl();
    return url.startsWith('/sign-in') || url.startsWith('/sign-up');
  });

  isChatRoute = computed(() => this.currentUrl().startsWith('/chat'));

  isGarageDetailsRoute = computed(() => this.currentUrl().startsWith('/list/'));

  isMobileChatThread = computed(
    () => this.isChatRoute() && this.chatService.mobileThreadOpen()
  );

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }
}
