import { Component } from '@angular/core';
import { EnterWithGoogle } from '../../components/molecules/enter-with-google/enter-with-google';
import { Logotype } from '../../components/molecules/logotype/logotype';
import { Link } from '../../components/atoms/link/link';
import { SignUpForm } from '../../components/molecules/sign-up-form/sign-up-form';

@Component({
  selector: 'app-sign-up',
  imports: [EnterWithGoogle, Logotype, Link, SignUpForm],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {}
