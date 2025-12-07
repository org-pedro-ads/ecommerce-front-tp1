import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { Message } from './core/message/message';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Message],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-front-tp1');
}
