import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName = '';
  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    public globalService: GlobalService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userName = this.authService.getCurrentUser();

    this.authSubscription = this.authService.getAuthState().subscribe(authState => {
      this.isLoggedIn = authState.isAuthenticated;
      this.userName = authState.user;
    });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  onAcercaDe(): void {
    alert('SecurEduca - Plataforma interactiva para entrenamiento en seguridad digital');
  }

  logout() {
    this.authService.logout();
  }
}
