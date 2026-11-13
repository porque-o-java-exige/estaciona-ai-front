import { Injectable, signal } from '@angular/core';

export interface UserFeedback {
  type: 'success' | 'error';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  readonly current = signal<UserFeedback | null>(null);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  showSuccess = (message: string): void => {
    this.show({ type: 'success', message });
  };

  showError = (message: string): void => {
    this.show({ type: 'error', message });
  };

  dismiss = (): void => {
    this.current.set(null);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  };

  private show(feedback: UserFeedback): void {
    this.dismiss();
    this.current.set(feedback);
    this.timeoutId = setTimeout(() => {
      this.current.set(null);
      this.timeoutId = null;
    }, 4000);
  }
}
