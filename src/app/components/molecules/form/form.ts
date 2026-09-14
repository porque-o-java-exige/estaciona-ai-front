import { Component } from '@angular/core';
import { InputComponent } from '../../atoms/input/input';
import { Button } from '../../atoms/button/button';

@Component({
  selector: 'app-form',
  imports: [
    InputComponent,
    Button  
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {}
