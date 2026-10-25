import { Component } from '@angular/core';
import { InputComponent } from '../../atoms/input/input';
import { Button } from '../../atoms/button/button';
import { Link } from '../../atoms/link/link';

@Component({
  selector: 'app-login-form',
  imports: [InputComponent, Button, Link],
  template: ` 
    <form>
        <app-input type="email" icon="email" placeholder="E-mail" hint="exemplo → meuexemplodeemail@email.com"></app-input>
        <app-input type="password" icon="password" placeholder="Digite sua senha"
            hint="exemplo → meuexemplodesenha123@"></app-input>
    
        <app-button type="submit" variant="primary" text="Entrar"></app-button>

        <app-link route="/" content="Esqueceu a senha ?"></app-link>
    </form>
  `,
  styles: `
  @use '../../../../styles/variables' as *;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;

        width: max-content;
        padding: 15px 10px;
    }
  `,
})
export class LoginForm {}
