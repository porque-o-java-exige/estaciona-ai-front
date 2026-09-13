import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chip } from './components/atoms/chip/chip';
import { InputComponent } from './components/atoms/input/input';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Chip,
    InputComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('estacionaAi');
}
