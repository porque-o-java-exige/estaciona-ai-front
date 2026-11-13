import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../components/atoms/button/button';
import { Input } from '../../components/atoms/input/input';
import { Logo } from '../../components/atoms/logo/logo';
import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [FormsModule, RouterLink, Logo, Input, Button],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.scss',
})
export class SignInPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly feedback = inject(FeedbackService);

  email = signal('');
  password = signal('');
  formError = signal('');

  handleSubmit = (): void => {
    this.formError.set('');

    if (!this.email().trim() || !this.password().trim()) {
      this.formError.set('Preencha seu e-mail e senha para entrar.');
      return;
    }

    const isSuccess = this.authService.signIn({
      email: this.email(),
      password: this.password(),
    });

    if (isSuccess) {
      this.feedback.showSuccess('Login realizado com sucesso.');
      this.router.navigate(['/home']);
    }
  };

  handleGoogleSignIn = (): void => {
    const isSuccess = this.authService.signInWithGoogle();
    if (isSuccess) {
      this.feedback.showSuccess('Login com Google realizado com sucesso.');
      this.router.navigate(['/home']);
    }
  };
}
