import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Curso {
  Curso = [
    {
      id: 1,
      title: 'Conceptos básicos de Ciberseguridad',
      description: 'Aprende qué es la ciberseguridad.',
      content: `
        Conceptos fundamentales:
        - Amenazas
        - Phishing
        - Buenas prácticas
      `,
      completed: false,
    },
    {
      id: 2,
      title: 'Cómo identificar correos de phishing',
      description: 'Reconoce señales de correos fraudulentos.',
      content: `
        Aprenderás:
        - Enlaces falsos
        - Remitentes falsificados
      `,
      completed: false,
    },
    {
      id: 3,
      title: 'Contraseñas seguras',
      description: 'Crea contraseñas fuertes.',
      content: `
        Contenido:
        - Gestores de contraseñas
        - 2FA
      `,
      completed: false,
    },
  ];

  constructor() {
    this.cargar();
  }

  marcarCompletada(id: number) {
    const l = this.Curso.find((x) => x.id === id);
    if (l) {
      l.completed = true;
      this.guardar();
    }
  }

  guardar() {
    localStorage.setItem('progreso_lecciones', JSON.stringify(this.Curso));
  }

  cargar() {
    const data = localStorage.getItem('progreso_lecciones');
    if (data) this.Curso = JSON.parse(data);
  }

  progreso() {
    const done = this.Curso.filter((l) => l.completed).length;
    return Math.round((done / this.Curso.length) * 100);
  }

  reiniciar() {
    this.Curso = this.Curso.map((l) => ({
      ...l,
      completed: false,
    }));
    this.guardar();
  }
}
