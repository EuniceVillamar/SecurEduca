import { Component, inject } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Curso } from '../curso';

@Component({
  selector: 'app-progreso-curso',
  imports: [],
  templateUrl: './progreso-curso.html',
  styleUrl: './progreso-curso.css',
})
export class ProgresoCurso {
  srv = inject(Curso);
}
