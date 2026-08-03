import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNav } from './layout/bottom-nav/bottom-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomNav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('estacionaAi');
}
