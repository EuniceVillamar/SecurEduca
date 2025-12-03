import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { inject } from '@angular/core';
import { TarjetaCurso } from '../tarjeta-curso/tarjeta-curso';
import { ProgresoCurso } from '../progreso-curso/progreso-curso';
import { Curso } from '../curso';

@Component({
  selector: 'app-cursos-teoricos',
  standalone: true,
  imports: [NgFor, TarjetaCurso, ProgresoCurso],
  templateUrl: './cursos-teoricos.html',
  styleUrls: ['./cursos-teoricos.css'],
})
export class CursosTeoricos {
  leccionSrv = inject(Curso);

  completar(id: number) {
    this.leccionSrv.marcarCompletada(id);
  }

  reiniciarTodo() {
    this.leccionSrv.reiniciar();
  }
}
