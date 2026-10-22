import { Component, input } from '@angular/core';
import { InputComponent } from '../../atoms/input/input';
import { Button } from '../../atoms/button/button';
import { Link } from '../../atoms/link/link';

export type formVariant = 'sign-up' | 'login' 

@Component({
  selector: 'app-form',
  imports: [
    InputComponent,
    Button,
    Link
],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  variant = input<formVariant>()

}
