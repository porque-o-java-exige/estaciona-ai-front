import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chip } from './components/atoms/chip/chip';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Chip
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('estacionaAi');
}
