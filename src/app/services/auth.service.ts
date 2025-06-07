
import { Injectable } from '@angular/core';

declare global {
  interface Window {
    google: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Substituir pelo seu Client ID

  constructor() {
    this.loadGoogleScript();
  }

  private loadGoogleScript() {
    if (typeof window !== 'undefined' && !window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  initializeGoogleSignIn() {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this)
      });
    }
  }

  private handleCredentialResponse(response: any) {
    // Decodificar o JWT token
    const payload = this.decodeJWT(response.credential);
    console.log('User info:', payload);
    
    // Aqui você pode salvar as informações do usuário
    localStorage.setItem('user', JSON.stringify(payload));
    
    // Redirecionar para o dashboard ou página principal
    // this.router.navigate(['/dashboard']);
  }

  private decodeJWT(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  signOut() {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
