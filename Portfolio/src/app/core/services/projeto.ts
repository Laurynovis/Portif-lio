// src/app/core/services/projeto.service.ts
import { Injectable } from '@angular/core';
import { Experiencia } from '../models/experiencia.model';
import { Projeto } from '../models/projeto.model'; // Importamos o "Molde" que criamos

@Injectable({
  providedIn: 'root' // Isso diz: "Angular, crie apenas UMA instância disso pro app todo"
})
export class ProjetoService {

  

  // Simulando o nosso Banco de Dados (Em OutSystems seria uma Entity)
  // Veja que usamos o tipo "Projeto[]" (Uma lista de objetos que seguem o nosso Molde)
  private projetosDb: Projeto[] = [
    { 
      id: 'p1', 
      title: 'Gestao de Academias', 
      tech: 'Mendix Low-Code', 
      shortDesc: 'Gestão de treinos e alunos.',
      fullDesc: 'Sistema desenvolvido em Mendix para academias, englobando gestão de matrículas, fichas de treino dinâmicas e painel financeiro.'
    },
    { 
      id: 'p2', 
      title: 'Paciência Spider', 
      tech: 'Swift / iOS', 
      shortDesc: 'Jogo clássico de cartas.',
      fullDesc: 'Recriação do Paciência Spider nativo para iOS usando Swift e as melhores práticas de gerenciamento de estado da Apple.'
    },
    { 
      id: 'p3', 
      title: 'Gerenciador de estoque', 
      tech: 'Outsystems', 
      shortDesc: 'Projeto avaliativo',
      fullDesc: 'Sistema construido com arquittura layer canvas, reutilixzação de contexto com blocos e integração com API REST.'
    }
    ,
    { 
      id: 'p4', 
      title: 'Avaliador de Eventos', 
      tech: 'React Native', 
      shortDesc: 'Projeto de disciplina mobile',
      fullDesc: 'Consttruido com React Native, o aplicativo permite que os usuários avaliem eventos, fornecendo feedback em tempo real e visualizações de dados para organizadores.'
    }

  ];

  private trajetoriaDb: Experiencia[] = [
    {
      periodo: 'Nov 2025 - Presente',
      titulo: 'Trainee / Desenvolvedor',
      empresa: 'Tata Consultancy Services (TCS)',
      descricao: 'Atuação no desenvolvimento de soluções corporativas utilizando Angular e Spring Boot, focando em agilidade e escalabilidade.',
      tipo: 'trabalho'
    },
    {
      periodo: '2022 - 2026',
      titulo: 'Engenharia de Computação',
      empresa: 'UTFPR',
      descricao: 'Bacharelado com foco em sistemas embarcados, redes, sistemas operacionais e arquitetura de software.',
      tipo: 'educacao'
    }
  ];

  // --- MÉTODOS DE PROJETOS ---
  getTodosProjetos(): Projeto[] {
    return this.projetosDb;
  }

  getProjetoById(id: string): Projeto | undefined {
    return this.projetosDb.find(projeto => projeto.id === id);
  }

  // --- MÉTODOS DE TRAJETÓRIA ---
  // Equivalente a um "GetTrajetorias" do OutSystems
  getTrajetoria(): Experiencia[] {
    return this.trajetoriaDb;
  }
  // Método 1: Traz todos os registros (Equivalente a um Aggregate sem filtros no OS)
  // Usaremos isso no Carrossel
  
}