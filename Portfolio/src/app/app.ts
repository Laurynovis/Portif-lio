import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser'; // 1. Importe o Title
import { RadialCarouselComponent } from './components/radial-carousel/radial-carousel';
import { startSnowfall } from '../snow';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RadialCarouselComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // 2. Corrigi o Signal para o nome certo (Portfolio)
  protected readonly title = signal('Portfolio | Pedro Enzo');

  // 3. Injetamos o Title no construtor
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    // 4. Forçamos o título na aba do navegador
    this.titleService.setTitle(this.title());

    this.initBackgroundEffect();
  }

  private initBackgroundEffect(): void {
    setTimeout(() => {
      try {
        startSnowfall();
      } catch (error) {
        console.warn('Erro ao inicializar background: ', error);
      }
    }, 0);
  }
}
