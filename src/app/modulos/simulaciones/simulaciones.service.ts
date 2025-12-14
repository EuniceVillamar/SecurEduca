import { Injectable } from '@angular/core';

export interface CorreoSimulado {
  id: number;
  asunto: string;
  remitente: string;
  destinatario: string;
  contenido: string;
  linkPhishing: string;
  fechaEnvio: Date;
}

export interface InteraccionPhishing {
  id: number;
  correoId: number;
  usuario: string;
  accion: 'clic' | 'reportado' | 'ignorado';
  fechaInteraccion: Date;
  detalles: string;
}

@Injectable({
  providedIn: 'root',
})
export class SimulacionesService {
  private readonly STORAGE_KEY_CORREOS = 'simulaciones_correos';
  private readonly STORAGE_KEY_INTERACCIONES = 'simulaciones_interacciones';

  constructor() {
    this.inicializarDatosEjemplo();
  }

  // Gestión de correos simulados
  obtenerCorreos(): CorreoSimulado[] {
    const data = localStorage.getItem(this.STORAGE_KEY_CORREOS);
    return data ? JSON.parse(data) : [];
  }

  agregarCorreo(correo: Omit<CorreoSimulado, 'id' | 'fechaEnvio'>): CorreoSimulado {
    const correos = this.obtenerCorreos();
    const nuevoCorreo: CorreoSimulado = {
      ...correo,
      id: Date.now(),
      fechaEnvio: new Date(),
    };
    correos.push(nuevoCorreo);
    localStorage.setItem(this.STORAGE_KEY_CORREOS, JSON.stringify(correos));
    return nuevoCorreo;
  }

  eliminarCorreo(id: number): void {
    const correos = this.obtenerCorreos().filter((c) => c.id !== id);
    localStorage.setItem(this.STORAGE_KEY_CORREOS, JSON.stringify(correos));
  }

  // Gestión de interacciones
  obtenerInteracciones(): InteraccionPhishing[] {
    const data = localStorage.getItem(this.STORAGE_KEY_INTERACCIONES);
    return data ? JSON.parse(data) : [];
  }

  registrarInteraccion(
    interaccion: Omit<InteraccionPhishing, 'id' | 'fechaInteraccion'>
  ): InteraccionPhishing {
    const interacciones = this.obtenerInteracciones();
    const nuevaInteraccion: InteraccionPhishing = {
      ...interaccion,
      id: Date.now(),
      fechaInteraccion: new Date(),
    };
    interacciones.push(nuevaInteraccion);
    localStorage.setItem(this.STORAGE_KEY_INTERACCIONES, JSON.stringify(interacciones));
    return nuevaInteraccion;
  }

  obtenerEstadisticas() {
    const interacciones = this.obtenerInteracciones();
    const total = interacciones.length;
    const clics = interacciones.filter((i) => i.accion === 'clic').length;
    const reportados = interacciones.filter((i) => i.accion === 'reportado').length;
    const ignorados = interacciones.filter((i) => i.accion === 'ignorado').length;

    return {
      total,
      clics,
      reportados,
      ignorados,
      tasaExito: total > 0 ? Math.round((clics / total) * 100) : 0,
      tasaReportados: total > 0 ? Math.round((reportados / total) * 100) : 0,
    };
  }

  private inicializarDatosEjemplo(): void {
    // Solo inicializar si no hay datos
    if (!localStorage.getItem(this.STORAGE_KEY_CORREOS)) {
      const correosEjemplo: CorreoSimulado[] = [
        {
          id: 1,
          asunto: 'Actualización urgente de seguridad',
          remitente: 'soporte@bancoseguro.com',
          destinatario: 'usuario@empresa.com',
          contenido:
            'Estimado cliente, hemos detectado actividad sospechosa en su cuenta. Haga clic aquí para verificar su identidad.',
          linkPhishing: 'http://bancoseguro-verificacion.fake/login',
          fechaEnvio: new Date('2025-01-10'),
        },
        {
          id: 2,
          asunto: 'Premio sorpresa - Has ganado $1000',
          remitente: 'premios@sorteo-online.com',
          destinatario: 'usuario@empresa.com',
          contenido:
            'Felicidades, has sido seleccionado para recibir $1000. Haz clic en el siguiente enlace para reclamar tu premio.',
          linkPhishing: 'http://reclama-premio.fake/claim',
          fechaEnvio: new Date('2025-01-12'),
        },
      ];
      localStorage.setItem(this.STORAGE_KEY_CORREOS, JSON.stringify(correosEjemplo));

      const interaccionesEjemplo: InteraccionPhishing[] = [
        {
          id: 1,
          correoId: 1,
          usuario: 'juan.perez',
          accion: 'clic',
          fechaInteraccion: new Date('2025-01-10T10:30:00'),
          detalles: 'Usuario hizo clic en el enlace de phishing',
        },
        {
          id: 2,
          correoId: 1,
          usuario: 'maria.garcia',
          accion: 'reportado',
          fechaInteraccion: new Date('2025-01-10T11:15:00'),
          detalles: 'Usuario identificó el correo como phishing y lo reportó',
        },
        {
          id: 3,
          correoId: 2,
          usuario: 'carlos.rodriguez',
          accion: 'ignorado',
          fechaInteraccion: new Date('2025-01-12T14:20:00'),
          detalles: 'Usuario ignoró el correo sin interactuar',
        },
      ];
      localStorage.setItem(this.STORAGE_KEY_INTERACCIONES, JSON.stringify(interaccionesEjemplo));
    }
  }

  limpiarDatos(): void {
    localStorage.removeItem(this.STORAGE_KEY_CORREOS);
    localStorage.removeItem(this.STORAGE_KEY_INTERACCIONES);
    this.inicializarDatosEjemplo();
  }
}
