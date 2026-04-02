import { Component, signal, OnInit, inject } from '@angular/core'; // <-- Adicionado o 'inject'
import { RouterOutlet } from '@angular/router';
import { RadialCarouselComponent } from './components/radial-carousel/radial-carousel';
import { startSnowfall } from '../snow'; 
import { Footer } from './components/footer/footer';

// Importações do nosso Model e Service (Verifique se as pastas conferem com as que você criou)
import { ProjetoService } from './core/services/projeto';
import { Projeto } from './core/models/projeto.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    RadialCarouselComponent,
     Footer], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Portifólio');

  // 1. Injetamos o Service (equivalente a puxar a Server Action no OutSystems)
  private projetoService = inject(ProjetoService);

  // 2. Criamos o Signal que vai guardar os dados para jogar no HTML
  protected listaProjetos = signal<Projeto[]>([]);

  ngOnInit(): void {
    // 3. Pede os dados para o Service e atualiza o nosso Signal
    const dados = this.projetoService.getTodosProjetos();
    this.listaProjetos.set(dados);

    // Inicializa o efeito de neve cinza claro após a renderização inicial
    this.initBackgroundEffect();
  }

  private initBackgroundEffect(): void {
    // O setTimeout garante que o ciclo de detecção do Angular 
    // termine antes de manipularmos o Canvas diretamente
    setTimeout(() => {
      try {
        startSnowfall();
      } catch (error) {
        console.warn('Erro ao inicializar background: ', error);
      }
    }, 0);
  }
}