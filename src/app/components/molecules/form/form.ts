import { Component, input } from '@angular/core';
import { InputComponent } from '../../atoms/input/input';
import { Button } from '../../atoms/button/button';

export type formVariant = 'sign-up' | 'sign-in' 

@Component({
  selector: 'app-form',
  imports: [
    InputComponent,
    Button  
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  variant = input<formVariant>()

}
