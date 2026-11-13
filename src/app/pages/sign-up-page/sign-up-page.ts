import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../components/atoms/button/button';
import { Input } from '../../components/atoms/input/input';
import { Logo } from '../../components/atoms/logo/logo';
import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [FormsModule, RouterLink, Logo, Input, Button],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.scss',
})
export class SignUpPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly feedback = inject(FeedbackService);

  name = signal('');
  email = signal('');
  password = signal('');
  phone = signal('');
  formError = signal('');

  handleSubmit = (): void => {
    this.formError.set('');

    if (!this.name().trim() || !this.email().trim() || !this.password().trim()) {
      this.formError.set('Preencha nome, e-mail e senha para se cadastrar.');
      return;
    }

    const isSuccess = this.authService.signUp({
      name: this.name(),
      email: this.email(),
      password: this.password(),
      phone: this.phone(),
    });

    if (isSuccess) {
      this.feedback.showSuccess('Cadastro realizado com sucesso.');
      this.router.navigate(['/home']);
    }
  };

  handleGoogleSignUp = (): void => {
    const isSuccess = this.authService.signInWithGoogle();
    if (isSuccess) {
      this.feedback.showSuccess('Cadastro com Google realizado com sucesso.');
      this.router.navigate(['/home']);
    }
  };
}
