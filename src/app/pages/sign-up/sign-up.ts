import { Component } from '@angular/core';
import { Form } from '../../components/molecules/form/form';
import { EnterWithGoogle } from '../../components/molecules/enter-with-google/enter-with-google';
import { Logotype } from '../../components/molecules/logotype/logotype';
import { Link } from '../../components/atoms/link/link';

@Component({
  selector: 'app-sign-up',
  imports: [Form, EnterWithGoogle, Logotype, Link],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {}
