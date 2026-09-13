import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chip } from './components/atoms/chip/chip';
import { InputComponent } from './components/atoms/input/input';
import { Button } from './components/atoms/button/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Chip,
    Button,
    InputComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('estacionaAi');
}
