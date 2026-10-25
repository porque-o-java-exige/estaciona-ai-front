import { Component } from '@angular/core';
import { EnterWithGoogle } from '../../components/molecules/enter-with-google/enter-with-google';
import { Logotype } from '../../components/molecules/logotype/logotype';
import { Link } from '../../components/atoms/link/link';
import { LoginForm } from '../../components/molecules/login-form/login-form';

@Component({
  selector: 'app-login',
  imports: [EnterWithGoogle, Logotype, Link, LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class login {}
