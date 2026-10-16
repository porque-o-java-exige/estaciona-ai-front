import { Component } from '@angular/core';
import { EnterWithGoogle } from '../../components/molecules/enter-with-google/enter-with-google';
import { Form } from '../../components/molecules/form/form';
import { Logotype } from '../../components/molecules/logotype/logotype';
import { Link } from '../../components/atoms/link/link';

@Component({
  selector: 'app-sign-in',
  imports: [EnterWithGoogle, Form, Logotype, Link],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {}
