import { Component } from '@angular/core';
import { EnterWithGoogle } from '../../components/molecules/enter-with-google/enter-with-google';
import { Form } from '../../components/molecules/form/form';
import { Logotype } from '../../components/molecules/logotype/logotype';
import { Link } from '../../components/atoms/link/link';

@Component({
  selector: 'app-login',
  imports: [EnterWithGoogle, Form, Logotype, Link],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class login {}
