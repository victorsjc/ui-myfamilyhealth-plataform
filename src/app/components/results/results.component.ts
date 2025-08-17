
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  sidebarMinimized = false;
  searchTerm = '';
  showFilterModal = false;
  showNewResultModal = false;
  showSuccessModal = false;
  startDate = '';
  endDate = '';
  isDragOver = false;
  selectedFile: File | null = null;

  newResultForm = {
    labId: '',
    doctorId: ''
  };

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
    this.showNewResultModal = true;
    this.resetForm();
  }

  closeNewResultModal() {
    this.showNewResultModal = false;
    this.resetForm();
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  resetForm() {
    this.newResultForm = {
      labId: '',
      doctorId: ''
    };
    this.selectedFile = null;
    this.isDragOver = false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileSelection(files[0]);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFileSelection(file);
    }
  }

  handleFileSelection(file: File) {
    // Validar tipo de arquivo
    if (file.type !== 'application/pdf') {
      alert('Apenas arquivos PDF são permitidos.');
      return;
    }

    // Validar tamanho do arquivo (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('O arquivo não pode ser maior que 5MB.');
      return;
    }

    this.selectedFile = file;
  }

  removeFile() {
    this.selectedFile = null;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  canSave(): boolean {
    return this.selectedFile !== null;
  }

  saveNewResult() {
    if (!this.canSave()) {
      return;
    }

    // Simular upload e processamento
    // Em um cenário real, aqui seria feita a requisição para obter a URL pré-assinada
    // e realizar o upload para AWS S3
    
    // Gerar um novo ID para o resultado
    const newId = 'REQ' + String(this.allResults.length + 1).padStart(3, '0');
    
    // Lista de nomes familiares fictícios para teste
    const familyNames = [
      'Maria Silva Santos',
      'João Pedro Oliveira',
      'Ana Carolina Ferreira',
      'Carlos Eduardo Lima',
      'Fernanda Costa',
      'Roberto Almeida',
      'Juliana Rodrigues',
      'Marcos Antonio',
      'Camila Souza',
      'Rafael Santos'
    ];
    
    // Selecionar um nome aleatório
    const randomName = familyNames[Math.floor(Math.random() * familyNames.length)];
    
    // Criar novo resultado
    const newResult: ResultRequest = {
      id: newId,
      familyMember: randomName,
      requestDate: new Date(),
      processDate: null,
      status: 'Processando'
    };

    // Adicionar à lista
    this.allResults.unshift(newResult);
    this.filteredResults = [...this.allResults];

    // Fechar modal e mostrar sucesso
    this.showNewResultModal = false;
    this.showSuccessModal = true;
  }

  returnToResults() {
    this.showSuccessModal = false;
    this.resetForm();
  }
}
