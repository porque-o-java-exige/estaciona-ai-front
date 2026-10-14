import { Component } from '@angular/core';
import { Form } from '../../components/molecules/form/form';
import { Button } from '../../components/atoms/button/button';
import { EnterWithGoogle } from '../../components/molecules/enter-with-google/enter-with-google';

@Component({
  selector: 'app-sign-up',
  imports: [Form, EnterWithGoogle],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {}
