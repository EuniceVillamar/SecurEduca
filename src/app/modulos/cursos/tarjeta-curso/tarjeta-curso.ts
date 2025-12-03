import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta-curso',
  imports: [CommonModule],
  templateUrl: './tarjeta-curso.html',
  styleUrl: './tarjeta-curso.css',
})
export class TarjetaCurso {
  @Input() Curso: any;
  @Output() completado = new EventEmitter<number>();

  completar() {
    this.completado.emit(this.Curso.id);
  }

  verMas() {
    alert(this.Curso.content);
  }
}
