import { Component } from '@angular/core';
import { InputComponent } from '../../atoms/input/input';
import { Button } from '../../atoms/button/button';

@Component({
  selector: 'app-sign-up-form',
  imports: [InputComponent, Button],
  template: `
      <form>
        <app-input type="text" icon="user" placeholder="Digite seu nome..." hint="exemplo → Arthur "></app-input>
        <app-input type="email" icon="email" placeholder="E-mail" hint="exemplo → meuexemplodeemail@email.com"></app-input>
        <app-input type="password" icon="password" placeholder="Digite sua senha"
            hint="exemplo → meuexemplodesenha123@"></app-input>
        <app-input type="tel" icon="phone" placeholder="(11) 99999-9999"></app-input>
    
        <app-button type="submit" variant="primary" text="Cadastrar"></app-button>
    </form>`,
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
export class SignUpForm {
  
}
