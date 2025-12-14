import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pregunta {
  pregunta: string;
  opciones: string[];
  correcta: number;
}

@Component({
  selector: 'app-evaluaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluaciones.html',
  styleUrls: ['./evaluaciones.css'],
})
export class Evaluaciones implements OnInit {
  // CONTROL DE VISTAS
  mostrarPresentacion = true;
  mostrarPreguntas = false;
  mostrarResultado = false;

  // CONFIGURACIÓN PAR PODER PONER EL TIEMPO POR CADA PREGUNTA
  tiempoPorPregunta = 15;
  tiempoRestante = this.tiempoPorPregunta;
  intervalo: any;

  // PUNTAJE
  puntaje = 0;

  // PREGUNTAS PARA LA EVALUACION
  preguntas: Pregunta[] = [
    {
      pregunta: '¿Qué es el phishing?',
      opciones: ['Un virus', 'Un ataque para robar información', 'Un antivirus', 'Un firewall'],
      correcta: 1,
    },
    {
      pregunta: '¿Cuál es una contraseña segura?',
      opciones: ['123456', 'password', 'Qw!9$Lm2', 'abcdef'],
      correcta: 2,
    },
    {
      pregunta: '¿Qué significa HTTPS?',
      opciones: ['Protocolo inseguro', 'Protocolo cifrado', 'Servidor web', 'Malware'],
      correcta: 1,
    },
    {
      pregunta: '¿Qué es un malware?',
      opciones: ['Un software malicioso', 'Un antivirus', 'Un sistema operativo', 'Un navegador'],
      correcta: 0,
    },
    {
      pregunta: '¿Para qué sirve un firewall?',
      opciones: [
        'Bloquear accesos no autorizados',
        'Crear virus',
        'Acelerar internet',
        'Guardar contraseñas',
      ],
      correcta: 0,
    },
    {
      pregunta: '¿Qué es la ingeniería social?',
      opciones: [
        'Programación avanzada',
        'Manipulación psicológica para obtener información',
        'Un virus informático',
        'Un antivirus',
      ],
      correcta: 1,
    },
    {
      pregunta: '¿Cuál es un ejemplo de información sensible?',
      opciones: [
        'Nombre de una página web',
        'Contraseña bancaria',
        'Color favorito',
        'Hora actual',
      ],
      correcta: 1,
    },
    {
      pregunta: '¿Qué debes hacer ante un correo sospechoso?',
      opciones: [
        'Abrir todos los enlaces',
        'Responder con datos personales',
        'Eliminarlo o reportarlo',
        'Reenviarlo a amigos',
      ],
      correcta: 2,
    },
    {
      pregunta: '¿Qué es la autenticación de dos factores (2FA)?',
      opciones: [
        'Usar dos contraseñas iguales',
        'Verificación adicional de identidad',
        'Un tipo de virus',
        'Un firewall',
      ],
      correcta: 1,
    },
    {
      pregunta: '¿Cuál es una buena práctica de seguridad?',
      opciones: [
        'Usar la misma contraseña siempre',
        'Actualizar el software regularmente',
        'Compartir contraseñas',
        'Desactivar antivirus',
      ],
      correcta: 1,
    },
    {
      pregunta: '¿Qué es un ataque de fuerza bruta?',
      opciones: [
        'Ataque físico al computador',
        'Probar muchas contraseñas hasta acertar',
        'Instalar antivirus',
        'Cifrar información',
      ],
      correcta: 1,
    },
    {
      pregunta: '¿Qué es el ransomware?',
      opciones: [
        'Un firewall',
        'Un malware que secuestra información',
        'Un antivirus',
        'Un navegador',
      ],
      correcta: 1,
    },
    {
      pregunta: '¿Por qué es importante cerrar sesión?',
      opciones: [
        'Para ahorrar batería',
        'Para evitar accesos no autorizados',
        'Para mejorar el internet',
        'No es importante',
      ],
      correcta: 1,
    },
    {
      pregunta: '¿Qué es una red Wi-Fi pública?',
      opciones: [
        'Una red segura siempre',
        'Una red privada',
        'Una red con mayor riesgo de seguridad',
        'Un firewall',
      ],
      correcta: 2,
    },
    {
      pregunta: '¿Qué debes hacer antes de descargar un archivo?',
      opciones: ['Nada', 'Verificar su origen', 'Desactivar antivirus', 'Compartirlo'],
      correcta: 1,
    },
  ];

  // SE MOSTRARAN LAS 15 PREGUNTAS MISMOS
  preguntasSeleccionadas: Pregunta[] = [];
  preguntaActual = 0;

  ngOnInit(): void {}

  // INICIAR EVALUACIÓN
  comenzar() {
    this.mostrarPresentacion = false;
    this.mostrarResultado = false;
    this.mostrarPreguntas = true;

    this.puntaje = 0;
    this.preguntaActual = 0;

    this.seleccionarPreguntas();
    this.iniciarTemporizador();
  }

  // EN ESTE METODO SE REALIZARA UNA SELECCIÓN ALEATORIA GRACIAS AL MATH.RANDOM
  seleccionarPreguntas() {
    this.preguntasSeleccionadas = [...this.preguntas].sort(() => Math.random() - 0.5);
  }

  // TEMPORIZADOR
  iniciarTemporizador() {
    this.tiempoRestante = this.tiempoPorPregunta;

    this.intervalo = setInterval(() => {
      this.tiempoRestante--;

      if (this.tiempoRestante === 0) {
        this.siguientePregunta();
      }
    }, 1000);
  }

  // RESPONDER
  responder(indice: number) {
    if (indice === this.preguntasSeleccionadas[this.preguntaActual].correcta) {
      this.puntaje++;
    }

    this.siguientePregunta();
  }

  // SIGUIENTE
  siguientePregunta() {
    clearInterval(this.intervalo);

    if (this.preguntaActual < this.preguntasSeleccionadas.length - 1) {
      this.preguntaActual++;
      this.iniciarTemporizador();
    } else {
      this.finalizarEvaluacion();
    }
  }

  // FINALIZACION DE LA EVLUAACION
  finalizarEvaluacion() {
    this.mostrarPreguntas = false;
    this.mostrarResultado = true;
    clearInterval(this.intervalo);
  }

  // REINTENTAR
  reiniciar() {
    this.mostrarResultado = false;
    this.mostrarPresentacion = true;
    this.preguntaActual = 0;
    clearInterval(this.intervalo);
  }
}
