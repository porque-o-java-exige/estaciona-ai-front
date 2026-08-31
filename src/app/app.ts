import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from './components/atoms/button/button';
import { IconButton } from "./components/atoms/icon-button/icon-button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button, IconButton, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('estacionaAi');
}
