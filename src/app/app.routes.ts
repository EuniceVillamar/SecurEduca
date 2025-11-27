import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { PrincipalPage } from './principal-page/principal-page';
import { CursosTeoricos } from './modulos/cursos-teoricos/cursos-teoricos';
import { EvaluadorContrasenas } from './modulos/evaluador-contrasenas/evaluador-contrasenas';
import { Simulaciones } from './modulos/simulaciones/simulaciones';
import { Evaluaciones } from './modulos/evaluaciones/evaluaciones';
import { Progreso } from './modulos/progreso/progreso';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'principal-page', component: PrincipalPage, canActivate: [authGuard] },
  { path: 'cursos-teoricos', component: CursosTeoricos, canActivate: [authGuard] },
  { path: 'evaluador-contrasenas', component: EvaluadorContrasenas, canActivate: [authGuard] },
  { path: 'simulaciones', component: Simulaciones, canActivate: [authGuard] },
  { path: 'evaluaciones', component: Evaluaciones, canActivate: [authGuard] },
  { path: 'progreso', component: Progreso, canActivate: [authGuard] },
  { path: '**', redirectTo: '/dashboard' },
];
