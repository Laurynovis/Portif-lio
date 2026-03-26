import { Component, OnInit, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProjetoService } from '../../core/services/projeto';
import { Projeto } from '../../core/models/projeto.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css' // seguindo o padrão que sua Home usa
})
export class ProjectDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projetoService = inject(ProjetoService);

  protected projeto = signal<Projeto | undefined>(undefined);

  // container que anima (classe .play é alternada para reiniciar o keyframes)
  @ViewChild('conteudoRef', { static: false }) private conteudoRef?: ElementRef<HTMLElement>;

  // guarda a posição de scroll da janela entre trocas
  private lastScrollY = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // 1) captura a posição atual do scroll da janela
      this.lastScrollY = this.getWindowScrollY();

      // 2) carrega o novo projeto
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['/']);
        return;
      }
      const dados = this.projetoService.getProjetoById(id);
      if (!dados) {
        this.router.navigate(['/']);
        return;
      }

      // 3) seta o projeto (o bloco @if renderiza/atualiza o DOM)
      this.projeto.set(dados);

      // 4) no próximo frame: reinicia animação e restaura scroll
      requestAnimationFrame(() => {
        this.restartAnimation();
        this.restoreWindowScroll(this.lastScrollY);
      });
    });
  }

  voltar() {
    this.router.navigate(['/']);
  }

  /** Lê o scroll vertical da janela */
  private getWindowScrollY(): number {
    return window.scrollY || document.documentElement.scrollTop || 0;
  }

  /** Restaura a posição do scroll da janela.
   *  Reaplica algumas vezes para contornar barras dinâmicas do mobile (iOS/Android). */
  private restoreWindowScroll(y: number) {
    const apply = () => window.scrollTo({ top: y, behavior: 'auto' });

    // tentativa imediata
    apply();

    // reforça no fim da fila e em frames seguintes (mitiga “pulos” da barra de endereço móvel)
    setTimeout(apply, 0);
    requestAnimationFrame(apply);
    setTimeout(apply, 120);
  }

  /** Reinicia a animação CSS (remove classe, força reflow e recoloca) */
  private restartAnimation() {
    const el = this.conteudoRef?.nativeElement;
    if (!el) return;

    el.classList.remove('play');   // desliga animação
    void el.offsetWidth;           // força reflow
    requestAnimationFrame(() => {
      el.classList.add('play');    // liga de novo → reinicia @keyframes
    });
  }
}
