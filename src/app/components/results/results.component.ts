
import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface ExamResult {
  id: string;
  examName: string;
  value: number;
  unit: string;
  referenceRange: string;
  status: string;
  date: Date;
  method: string;
  showHistory?: boolean;
  history?: Array<{
    date: Date;
    value: number;
  }>;
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements AfterViewInit {
  sidebarMinimized = false;
  showProfileMenu = false;
  searchTerm = '';
  showFilterModal = false;
  startDate = '';
  endDate = '';
  statusFilter = '';

  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 0;

  allResults: ExamResult[] = [
    {
      id: 'R001',
      examName: 'Glicose em Jejum',
      value: 95,
      unit: 'mg/dL',
      referenceRange: '70-100',
      status: 'Normal',
      date: new Date('2024-01-15'),
      method: 'Enzimático',
      history: [
        { date: new Date('2023-11-15'), value: 88 },
        { date: new Date('2023-12-20'), value: 92 },
        { date: new Date('2024-01-15'), value: 95 }
      ]
    },
    {
      id: 'R002',
      examName: 'Colesterol Total',
      value: 220,
      unit: 'mg/dL',
      referenceRange: '<200',
      status: 'Alto',
      date: new Date('2024-01-14'),
      method: 'Colorimétrico',
      history: [
        { date: new Date('2023-11-10'), value: 205 },
        { date: new Date('2023-12-18'), value: 215 },
        { date: new Date('2024-01-14'), value: 220 }
      ]
    },
    {
      id: 'R003',
      examName: 'Hemoglobina',
      value: 11.5,
      unit: 'g/dL',
      referenceRange: '12.0-16.0',
      status: 'Baixo',
      date: new Date('2024-01-13'),
      method: 'Fotométrico',
      history: [
        { date: new Date('2023-10-15'), value: 11.8 },
        { date: new Date('2023-12-10'), value: 11.6 },
        { date: new Date('2024-01-13'), value: 11.5 }
      ]
    },
    {
      id: 'R004',
      examName: 'Creatinina',
      value: 1.8,
      unit: 'mg/dL',
      referenceRange: '0.6-1.2',
      status: 'Crítico',
      date: new Date('2024-01-12'),
      method: 'Jaffé Cinético',
      history: [
        { date: new Date('2023-09-20'), value: 1.5 },
        { date: new Date('2023-11-25'), value: 1.7 },
        { date: new Date('2024-01-12'), value: 1.8 }
      ]
    },
    {
      id: 'R005',
      examName: 'Vitamina D',
      value: 35,
      unit: 'ng/mL',
      referenceRange: '30-100',
      status: 'Normal',
      date: new Date('2024-01-11'),
      method: 'Quimioluminescência'
    },
    {
      id: 'R006',
      examName: 'TSH',
      value: 2.5,
      unit: 'mUI/L',
      referenceRange: '0.4-4.0',
      status: 'Normal',
      date: new Date('2024-01-10'),
      method: 'Imunoquimioluminescência'
    },
    {
      id: 'R007',
      examName: 'ALT (TGP)',
      value: 55,
      unit: 'U/L',
      referenceRange: '<40',
      status: 'Alto',
      date: new Date('2024-01-09'),
      method: 'Cinético UV'
    },
    {
      id: 'R008',
      examName: 'Ferro Sérico',
      value: 45,
      unit: 'μg/dL',
      referenceRange: '60-170',
      status: 'Baixo',
      date: new Date('2024-01-08'),
      method: 'Colorimétrico'
    },
    {
      id: 'R009',
      examName: 'Ureia',
      value: 35,
      unit: 'mg/dL',
      referenceRange: '15-45',
      status: 'Normal',
      date: new Date('2024-01-07'),
      method: 'Enzimático UV'
    },
    {
      id: 'R010',
      examName: 'Ácido Úrico',
      value: 7.5,
      unit: 'mg/dL',
      referenceRange: '3.5-7.0',
      status: 'Alto',
      date: new Date('2024-01-06'),
      method: 'Enzimático'
    },
    {
      id: 'R011',
      examName: 'HDL Colesterol',
      value: 38,
      unit: 'mg/dL',
      referenceRange: '>40',
      status: 'Baixo',
      date: new Date('2024-01-05'),
      method: 'Homogêneo'
    },
    {
      id: 'R012',
      examName: 'LDL Colesterol',
      value: 160,
      unit: 'mg/dL',
      referenceRange: '<100',
      status: 'Alto',
      date: new Date('2024-01-04'),
      method: 'Calculado'
    },
    {
      id: 'R013',
      examName: 'Triglicerídeos',
      value: 180,
      unit: 'mg/dL',
      referenceRange: '<150',
      status: 'Alto',
      date: new Date('2024-01-03'),
      method: 'Enzimático'
    },
    {
      id: 'R014',
      examName: 'Proteína C Reativa',
      value: 8.5,
      unit: 'mg/L',
      referenceRange: '<3.0',
      status: 'Alto',
      date: new Date('2024-01-02'),
      method: 'Turbidimétrico'
    },
    {
      id: 'R015',
      examName: 'Vitamina B12',
      value: 180,
      unit: 'pg/mL',
      referenceRange: '200-900',
      status: 'Baixo',
      date: new Date('2024-01-01'),
      method: 'Quimioluminescência'
    },
    {
      id: 'R016',
      examName: 'Ácido Fólico',
      value: 12,
      unit: 'ng/mL',
      referenceRange: '3-17',
      status: 'Normal',
      date: new Date('2023-12-30'),
      method: 'Quimioluminescência'
    },
    {
      id: 'R017',
      examName: 'Ferritina',
      value: 450,
      unit: 'ng/mL',
      referenceRange: '15-150',
      status: 'Alto',
      date: new Date('2023-12-29'),
      method: 'Quimioluminescência'
    },
    {
      id: 'R018',
      examName: 'Cálcio Total',
      value: 9.8,
      unit: 'mg/dL',
      referenceRange: '8.5-10.5',
      status: 'Normal',
      date: new Date('2023-12-28'),
      method: 'Colorimétrico'
    },
    {
      id: 'R019',
      examName: 'Magnésio',
      value: 1.6,
      unit: 'mg/dL',
      referenceRange: '1.7-2.2',
      status: 'Baixo',
      date: new Date('2023-12-27'),
      method: 'Colorimétrico'
    },
    {
      id: 'R020',
      examName: 'Fósforo',
      value: 4.2,
      unit: 'mg/dL',
      referenceRange: '2.5-4.5',
      status: 'Normal',
      date: new Date('2023-12-26'),
      method: 'Colorimétrico'
    },
    {
      id: 'R021',
      examName: 'Albumina',
      value: 3.8,
      unit: 'g/dL',
      referenceRange: '3.5-5.0',
      status: 'Normal',
      date: new Date('2023-12-25'),
      method: 'Colorimétrico'
    },
    {
      id: 'R022',
      examName: 'Bilirrubina Total',
      value: 1.8,
      unit: 'mg/dL',
      referenceRange: '<1.2',
      status: 'Alto',
      date: new Date('2023-12-24'),
      method: 'Colorimétrico'
    },
    {
      id: 'R023',
      examName: 'AST (TGO)',
      value: 48,
      unit: 'U/L',
      referenceRange: '<40',
      status: 'Alto',
      date: new Date('2023-12-23'),
      method: 'Cinético UV'
    },
    {
      id: 'R024',
      examName: 'Gama GT',
      value: 65,
      unit: 'U/L',
      referenceRange: '<50',
      status: 'Alto',
      date: new Date('2023-12-22'),
      method: 'Cinético'
    },
    {
      id: 'R025',
      examName: 'Fosfatase Alcalina',
      value: 95,
      unit: 'U/L',
      referenceRange: '40-150',
      status: 'Normal',
      date: new Date('2023-12-21'),
      method: 'Cinético'
    }
  ];

  filteredResults: ExamResult[] = [...this.allResults];

  constructor(private router: Router) {
    this.updatePagination();
  }

  ngAfterViewInit() {
    // Renderizar gráficos após a view ser inicializada
    setTimeout(() => {
      this.renderCharts();
    }, 100);
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

  onSearch() {
    this.applyFilters();
  }

  toggleFilterModal() {
    this.showFilterModal = !this.showFilterModal;
  }

  applyFilters() {
    this.filteredResults = this.allResults.filter(result => {
      const matchesSearch = !this.searchTerm ||
        result.examName.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesDateRange = this.checkDateRange(result.date);

      const matchesStatus = !this.statusFilter || result.status === this.statusFilter;

      return matchesSearch && matchesDateRange && matchesStatus;
    });

    this.currentPage = 1;
    this.updatePagination();
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
    this.statusFilter = '';
    this.searchTerm = '';
    this.filteredResults = [...this.allResults];
    this.currentPage = 1;
    this.updatePagination();
    this.showFilterModal = false;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Normal': 'status-normal',
      'Alto': 'status-alto',
      'Baixo': 'status-baixo',
      'Crítico': 'status-critico'
    };
    return statusClasses[status] || '';
  }

  getValueClass(value: number, referenceRange: string): string {
    // Lógica simplificada para determinar se o valor está dentro da referência
    const cleanRange = referenceRange.replace(/[<>]/g, '');
    
    if (referenceRange.includes('<')) {
      const maxValue = parseFloat(cleanRange);
      return value > maxValue ? 'alto' : 'normal';
    }
    
    if (referenceRange.includes('>')) {
      const minValue = parseFloat(cleanRange);
      return value < minValue ? 'baixo' : 'normal';
    }
    
    if (referenceRange.includes('-')) {
      const [min, max] = cleanRange.split('-').map(v => parseFloat(v.trim()));
      if (value < min) return 'baixo';
      if (value > max) return 'alto';
      return 'normal';
    }
    
    return 'normal';
  }

  toggleHistory(result: ExamResult) {
    if (result.showHistory) {
      setTimeout(() => {
        this.renderChart(result);
      }, 100);
    }
  }

  showResultDetails(result: ExamResult) {
    // Aqui poderia abrir um modal com detalhes completos do resultado
    console.log('Mostrando detalhes do resultado:', result);
  }

  renderCharts() {
    this.paginatedResults.forEach(result => {
      if (result.showHistory && result.history) {
        this.renderChart(result);
      }
    });
  }

  renderChart(result: ExamResult) {
    if (!result.history || result.history.length === 0) return;

    const canvas = document.getElementById(`chart-${result.id}`) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const history = result.history.slice(-3); // Últimos 3 valores
    const padding = 30;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    // Encontrar valores mínimo e máximo para escala
    const values = history.map(h => h.value);
    const minValue = Math.min(...values) * 0.9;
    const maxValue = Math.max(...values) * 1.1;

    // Configurar escala Y com valores de referência de 5 em 5
    const yMin = Math.floor(minValue / 5) * 5;
    const yMax = Math.ceil(maxValue / 5) * 5;
    const yRange = yMax - yMin;

    // Desenhar linhas de referência horizontais (cinza claro)
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = yMin; i <= yMax; i += 5) {
      const y = padding + (yMax - i) * chartHeight / yRange;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
      
      // Labels do eixo Y
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Inter';
      ctx.textAlign = 'right';
      ctx.fillText(i.toString(), padding - 5, y + 3);
    }

    // Labels do eixo Y com unidade
    ctx.fillStyle = '#374151';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(15, padding + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`Valores (${result.unit})`, 0, 0);
    ctx.restore();

    // Desenhar linha conectando os valores
    if (history.length > 1) {
      ctx.strokeStyle = '#4ec5d9';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      history.forEach((point, index) => {
        const x = padding + (index * chartWidth) / (history.length - 1);
        const y = padding + (yMax - point.value) * chartHeight / yRange;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }

    // Desenhar pontos dos dados
    ctx.fillStyle = '#4ec5d9';
    history.forEach((point, index) => {
      const x = padding + (index * chartWidth) / (history.length - 1);
      const y = padding + (yMax - point.value) * chartHeight / yRange;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      // Label da data no eixo X
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(
        point.date.toLocaleDateString('pt-BR'),
        x,
        canvas.height - 10
      );
      
      // Valor do ponto
      ctx.fillStyle = '#374151';
      ctx.font = '10px Inter';
      ctx.fillText(
        point.value.toString(),
        x,
        y - 8
      );
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredResults.length / this.itemsPerPage);
  }

  get paginatedResults(): ExamResult[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredResults.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      setTimeout(() => {
        this.renderCharts();
      }, 100);
    }
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  mathMin(a: number, b: number): number {
    return Math.min(a, b);
  }
}
