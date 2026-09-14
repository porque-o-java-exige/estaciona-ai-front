import { Component } from '@angular/core';
import { Form } from '../../components/molecules/form/form';
import { Button } from '../../components/atoms/button/button';

@Component({
  selector: 'app-sign-up',
  imports: [Form, Button],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {}
