import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header.component';
import { Footer } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {}
