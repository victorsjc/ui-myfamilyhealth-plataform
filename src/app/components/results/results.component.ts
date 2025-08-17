
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ResultRequest {
  id: string;
  familyMember: string;
  requestDate: Date;
  processDate: Date | null;
  status: 'Processando' | 'Concluído com Falhas' | 'Concluído com Sucesso' | 'Rejeitado' | 'Cancelado' | 'Pendente de Análise' | 'Em Análise';
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  sidebarMinimized = false;
  searchTerm = '';
  showFilterModal = false;
  startDate = '';
  endDate = '';

  allResults: ResultRequest[] = [
    {
      id: 'REQ001',
      familyMember: 'João Carlos da Silva Santos',
      requestDate: new Date('2024-01-15T10:30:00'),
      processDate: new Date('2024-01-15T14:20:00'),
      status: 'Concluído com Sucesso'
    },
    {
      id: 'REQ002',
      familyMember: 'Maria Fernanda Oliveira',
      requestDate: new Date('2024-01-14T09:15:00'),
      processDate: new Date('2024-01-14T16:45:00'),
      status: 'Concluído com Falhas'
    },
    {
      id: 'REQ003',
      familyMember: 'Pedro Santos',
      requestDate: new Date('2024-01-13T11:20:00'),
      processDate: null,
      status: 'Processando'
    },
    {
      id: 'REQ004',
      familyMember: 'Ana Beatriz Costa e Silva Ferreira',
      requestDate: new Date('2024-01-12T14:45:00'),
      processDate: new Date('2024-01-12T18:30:00'),
      status: 'Rejeitado'
    },
    {
      id: 'REQ005',
      familyMember: 'Carlos Eduardo',
      requestDate: new Date('2024-01-11T08:10:00'),
      processDate: null,
      status: 'Pendente de Análise'
    },
    {
      id: 'REQ006',
      familyMember: 'Luiza Fernanda Almeida',
      requestDate: new Date('2024-01-10T16:30:00'),
      processDate: null,
      status: 'Em Análise'
    },
    {
      id: 'REQ007',
      familyMember: 'Roberto Silva',
      requestDate: new Date('2024-01-09T12:15:00'),
      processDate: new Date('2024-01-09T15:22:00'),
      status: 'Cancelado'
    }
  ];

  filteredResults: ResultRequest[] = [...this.allResults];

  toggleSidebar() {
    this.sidebarMinimized = !this.sidebarMinimized;
  }

  onSearch() {
    this.applyFilters();
  }

  toggleFilterModal() {
    this.showFilterModal = !this.showFilterModal;
  }

  applyFilters() {
    this.filteredResults = this.allResults.filter(result => {
      const matchesSearch = !this.searchTerm || 
        result.familyMember.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesDateRange = this.checkDateRange(result.requestDate);
      
      return matchesSearch && matchesDateRange;
    });
    
    this.showFilterModal = false;
  }

  private checkDateRange(date: Date): boolean {
    if (!this.startDate && !this.endDate) return true;
    
    if (this.startDate && date < new Date(this.startDate)) return false;
    if (this.endDate && date > new Date(this.endDate)) return false;
    
    return true;
  }

  clearFilters() {
    this.startDate = '';
    this.endDate = '';
    this.searchTerm = '';
    this.filteredResults = [...this.allResults];
    this.showFilterModal = false;
  }

  formatDate(date: Date | null): string {
    if (!date) return '-';
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  truncateName(name: string): string {
    return name.length > 25 ? name.substring(0, 25) + '...' : name;
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Processando': 'status-processing',
      'Concluído com Falhas': 'status-failed',
      'Concluído com Sucesso': 'status-success',
      'Rejeitado': 'status-rejected',
      'Cancelado': 'status-cancelled',
      'Pendente de Análise': 'status-pending',
      'Em Análise': 'status-analyzing'
    };
    return statusClasses[status] || '';
  }

  newResult() {
    console.log('Novo resultado clicado');
  }
}
