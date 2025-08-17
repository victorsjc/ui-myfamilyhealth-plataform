
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('historyChart', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  sidebarMinimized = false;
  showProfileMenu = false;
  showCardDetails = false;
  showHistory = false;
  selectedCard: any = null;

  healthCards = [
    {
      name: 'Vitamina D',
      description: 'Vitamina essencial para ossos e imunidade',
      value: '30',
      unit: 'ng/mL',
      collectionDate: '15/01/2024',
      collectionType: 'Sangue',
      method: 'Quimioluminescência',
      history: [
        { date: '15/11/2023', value: 25 },
        { date: '15/12/2023', value: 28 },
        { date: '15/01/2024', value: 30 }
      ]
    },
    {
      name: 'Vitamina B12',
      description: 'Importante para sistema nervoso',
      value: '1200',
      unit: 'pg/mL',
      collectionDate: '12/01/2024',
      collectionType: 'Sangue',
      method: 'Eletroquimioluminescência',
      history: [
        { date: '12/10/2023', value: 950 },
        { date: '12/11/2023', value: 1100 },
        { date: '12/01/2024', value: 1200 }
      ]
    },
    {
      name: 'Colesterol LDL',
      description: 'Colesterol ruim no sangue',
      value: '161',
      unit: 'mg/dL',
      collectionDate: '10/01/2024',
      collectionType: 'Sangue',
      method: 'Enzimático',
      history: [
        { date: '10/09/2023', value: 180 },
        { date: '10/11/2023', value: 170 },
        { date: '10/01/2024', value: 161 }
      ]
    }
  ];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', (event) => {
      if (!event.target || !(event.target as Element).closest('.user-profile')) {
        this.showProfileMenu = false;
      }
    });
  }

  toggleSidebar() {
    this.sidebarMinimized = !this.sidebarMinimized;
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    // Implementar logout
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  openCardDetails(card: any) {
    this.selectedCard = card;
    this.showCardDetails = true;
    this.showHistory = false;
  }

  closeCardDetails() {
    this.showCardDetails = false;
    this.selectedCard = null;
    this.showHistory = false;
  }

  toggleHistory() {
    if (this.showHistory && this.selectedCard) {
      setTimeout(() => {
        this.drawChart();
      }, 100);
    }
  }

  private drawChart() {
    if (!this.chartCanvas || !this.selectedCard) return;

    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const history = this.selectedCard.history;
    const margin = 40;
    const chartWidth = canvas.width - 2 * margin;
    const chartHeight = canvas.height - 2 * margin;

    // Encontrar valores min e max
    const values = history.map((h: any) => h.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    // Configurar estilo
    ctx.strokeStyle = '#4ec5d9';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#4ec5d9';
    ctx.font = '12px Inter';

    // Desenhar eixos
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Eixo Y
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, margin + chartHeight);
    ctx.stroke();

    // Eixo X
    ctx.beginPath();
    ctx.moveTo(margin, margin + chartHeight);
    ctx.lineTo(margin + chartWidth, margin + chartHeight);
    ctx.stroke();

    // Desenhar linha do gráfico
    ctx.strokeStyle = '#4ec5d9';
    ctx.lineWidth = 2;
    ctx.beginPath();

    history.forEach((point: any, index: number) => {
      const x = margin + (index / (history.length - 1)) * chartWidth;
      const y = margin + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Desenhar ponto
      ctx.fillStyle = '#4ec5d9';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Label da data
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.fillText(point.date.substring(0, 5), x, margin + chartHeight + 20);

      // Label do valor
      ctx.fillText(point.value.toString(), x, y - 10);
    });

    ctx.stroke();
  }
}
