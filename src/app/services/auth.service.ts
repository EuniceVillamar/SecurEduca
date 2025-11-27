import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Credenciales fijas para validación
  private validUser = 'secureduca';
  private validPassword = '1234';

  private isAuthenticated = false;
  private currentUser = '';
  private authState$ = new BehaviorSubject<{ isAuthenticated: boolean; user: string }>({
    isAuthenticated: false,
    user: '',
  });

  constructor(private router: Router) {}

  getAuthState(): Observable<{ isAuthenticated: boolean; user: string }> {
    return this.authState$.asObservable();
  }

  login(username: string, password: string): boolean {
    if (username === this.validUser && password === this.validPassword) {
      this.isAuthenticated = true;
      this.currentUser = username;
      this.authState$.next({ isAuthenticated: true, user: username });
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = '';
    this.authState$.next({ isAuthenticated: false, user: '' });
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): string {
    return this.currentUser;
  }
}
