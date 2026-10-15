import { Component } from '@angular/core';
import { EnterWithGoogle } from '../../components/molecules/enter-with-google/enter-with-google';
import { Form } from '../../components/molecules/form/form';
import { Logotype } from '../../components/molecules/logotype/logotype';

@Component({
  selector: 'app-sign-in',
  imports: [EnterWithGoogle, Form, Logotype],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {}
