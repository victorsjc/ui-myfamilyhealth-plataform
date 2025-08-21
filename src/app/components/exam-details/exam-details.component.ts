
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

interface ExamRequest {
  id: string;
  familyMember: string;
  requestDate: Date;
  processDate: Date | null;
  status: string;
  doctorId?: string;
  labId?: string;
}

@Component({
  selector: 'app-exam-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.css'
})
export class ExamDetailsComponent implements OnInit {
  sidebarMinimized = false;
  showProfileMenu = false;
  exam: ExamRequest | null = null;
  examId: string = '';

  // Dados mock dos exames (mesmos dados do ExamsComponent)
  private allExams: ExamRequest[] = [
    {
      id: 'REQ001',
      familyMember: 'João Carlos da Silva Santos',
      requestDate: new Date('2024-01-15T10:30:00'),
      processDate: new Date('2024-01-15T14:20:00'),
      status: 'Concluído com Sucesso',
      doctorId: 'MD001-SP-2024',
      labId: 'LAB123-SP-2024'
    },
    {
      id: 'REQ002',
      familyMember: 'Maria Fernanda Oliveira',
      requestDate: new Date('2024-01-14T09:15:00'),
      processDate: new Date('2024-01-14T16:45:00'),
      status: 'Concluído com Falhas',
      doctorId: 'MD002-RJ-2024',
      labId: 'LAB456-RJ-2024'
    },
    {
      id: 'REQ003',
      familyMember: 'Pedro Santos',
      requestDate: new Date('2024-01-13T11:20:00'),
      processDate: null,
      status: 'Processando',
      doctorId: 'MD003-MG-2024',
      labId: 'LAB789-MG-2024'
    },
    {
      id: 'REQ004',
      familyMember: 'Ana Beatriz Costa e Silva Ferreira',
      requestDate: new Date('2024-01-12T14:45:00'),
      processDate: new Date('2024-01-12T18:30:00'),
      status: 'Inválido',
      doctorId: 'MD004-PR-2024',
      labId: 'LAB101-PR-2024'
    },
    {
      id: 'REQ005',
      familyMember: 'Carlos Eduardo',
      requestDate: new Date('2024-01-11T08:10:00'),
      processDate: null,
      status: 'Pendente de Análise',
      doctorId: 'MD005-RS-2024',
      labId: 'LAB202-RS-2024'
    },
    {
      id: 'REQ006',
      familyMember: 'Luiza Fernanda Almeida',
      requestDate: new Date('2024-01-10T16:30:00'),
      processDate: null,
      status: 'Em Análise',
      doctorId: 'MD006-SC-2024',
      labId: 'LAB303-SC-2024'
    },
    {
      id: 'REQ007',
      familyMember: 'Roberto Silva',
      requestDate: new Date('2024-01-09T12:15:00'),
      processDate: new Date('2024-01-09T15:22:00'),
      status: 'Cancelado',
      doctorId: 'MD007-BA-2024',
      labId: 'LAB404-BA-2024'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.examId = params['id'];
      this.loadExamDetails();
    });
  }

  loadExamDetails() {
    // Simular carregamento dos dados
    setTimeout(() => {
      this.exam = this.allExams.find(exam => exam.id === this.examId) || null;
      if (!this.exam) {
        // Se o exame não for encontrado, redirecionar para a lista
        this.router.navigate(['/exames']);
      }
    }, 500);
  }

  toggleSidebar() {
    this.sidebarMinimized = !this.sidebarMinimized;
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/exames']);
  }

  formatDate(date: Date | null): string {
    if (!date) return '-';
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Processando': 'status-processing',
      'Concluído com Falhas': 'status-failed',
      'Concluído com Sucesso': 'status-success',
      'Inválido': 'status-rejected',
      'Cancelado': 'status-cancelled',
      'Pendente de Análise': 'status-pending',
      'Em Análise': 'status-analyzing'
    };
    return statusClasses[status] || '';
  }

  getStatusMessage(): string {
    if (!this.exam) return '';

    switch (this.exam.status) {
      case 'Concluído com Sucesso':
        return `Foram processados 25 exames com sucesso. Todos os resultados estão disponíveis para visualização.`;
      case 'Concluído com Falhas':
        return `Ocorreram falhas durante o processamento dos exames. Alguns resultados podem não estar disponíveis.`;
      case 'Inválido':
        return `Os dados enviados não passaram na validação inicial.`;
      default:
        return '';
    }
  }

  getStatusTitle(): string {
    if (!this.exam) return '';

    switch (this.exam.status) {
      case 'Concluído com Sucesso':
        return 'Processamento Concluído';
      case 'Concluído com Falhas':
        return 'Falhas no Processamento';
      case 'Inválido':
        return 'Dados Inválidos';
      default:
        return '';
    }
  }

  getStatusMessageClass(): string {
    if (!this.exam) return '';

    switch (this.exam.status) {
      case 'Concluído com Sucesso':
        return 'success';
      case 'Concluído com Falhas':
        return 'warning';
      case 'Inválido':
        return 'error';
      default:
        return '';
    }
  }

  getInvalidReason(): string {
    return 'O documento não representa um resultado de exame médico válido. Verifique se o arquivo enviado contém informações médicas legítimas e está no formato correto.';
  }

  sendForAnalysis() {
    if (this.exam) {
      // Simular envio para análise
      this.exam.status = 'Em Análise';
      
      // Mostrar feedback ao usuário
      alert('Solicitação enviada para análise com sucesso!');
    }
  }
}
