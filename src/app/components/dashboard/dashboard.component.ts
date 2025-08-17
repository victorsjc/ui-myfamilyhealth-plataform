
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  sidebarMinimized = false;
  
  healthCards = [
    {
      name: 'Vitamina D',
      description: 'Vitamina essencial para ossos e imunidade',
      value: '30',
      unit: 'ng/mL'
    },
    {
      name: 'Vitamina B12',
      description: 'Importante para sistema nervoso',
      value: '1200',
      unit: 'pg/mL'
    },
    {
      name: 'Colesterol LDL',
      description: 'Colesterol ruim no sangue',
      value: '161',
      unit: 'mg/dL'
    }
  ];

  toggleSidebar() {
    this.sidebarMinimized = !this.sidebarMinimized;
  }
}
