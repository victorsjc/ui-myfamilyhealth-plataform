
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  sidebarMinimized = false;
  showProfileMenu = false;
  showDeleteModal = false;
  showDeleteConfirmation = false;

  userProfile = {
    email: 'usuario@email.com',
    password: '••••••••••••',
    nickname: 'João Silva',
    loginMethod: 'google'
  };

  constructor(private router: Router) {}

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

  showDeleteAccount() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDeleteAccount() {
    this.showDeleteModal = false;
    this.showDeleteConfirmation = true;
  }

  closeDeleteConfirmation() {
    this.showDeleteConfirmation = false;
  }

  returnToProfile() {
    this.showDeleteConfirmation = false;
  }
}
