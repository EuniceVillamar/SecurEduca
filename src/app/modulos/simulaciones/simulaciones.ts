import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulacionesService, CorreoSimulado, InteraccionPhishing } from './simulaciones.service';

@Component({
  selector: 'app-simulaciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './simulaciones.html',
  styleUrl: './simulaciones.css',
})
export class Simulaciones {
  private simulacionesService = inject(SimulacionesService);

  // Control de vistas
  vistaActual: 'enviar' | 'interacciones' = 'enviar';

  // Datos
  correos: CorreoSimulado[] = [];
  interacciones: InteraccionPhishing[] = [];
  estadisticas = {
    total: 0,
    clics: 0,
    reportados: 0,
    ignorados: 0,
    tasaExito: 0,
    tasaReportados: 0,
  };

  // Formulario de nuevo correo
  nuevoCorreo = {
    asunto: '',
    remitente: '',
    destinatario: '',
    contenido: '',
    linkPhishing: '',
  };

  // Nueva interacción
  nuevaInteraccion = {
    correoId: 0,
    usuario: '',
    accion: 'clic' as 'clic' | 'reportado' | 'ignorado',
    detalles: '',
  };

  mostrarFormCorreo = false;
  mostrarFormInteraccion = false;

  constructor() {
    this.cargarDatos();
  }

  cambiarVista(vista: 'enviar' | 'interacciones'): void {
    this.vistaActual = vista;
  }

  cargarDatos(): void {
    this.correos = this.simulacionesService.obtenerCorreos();
    this.interacciones = this.simulacionesService.obtenerInteracciones();
    this.estadisticas = this.simulacionesService.obtenerEstadisticas();
  }

  // Gestión de correos
  toggleFormCorreo(): void {
    this.mostrarFormCorreo = !this.mostrarFormCorreo;
    if (this.mostrarFormCorreo) {
      this.resetFormCorreo();
    }
  }

  enviarCorreo(): void {
    if (this.validarFormCorreo()) {
      this.simulacionesService.agregarCorreo(this.nuevoCorreo);
      this.cargarDatos();
      this.toggleFormCorreo();
      alert('Correo simulado enviado exitosamente');
    }
  }

  eliminarCorreo(id: number): void {
    if (confirm('¿Está seguro de eliminar este correo simulado?')) {
      this.simulacionesService.eliminarCorreo(id);
      this.cargarDatos();
    }
  }

  private validarFormCorreo(): boolean {
    if (
      !this.nuevoCorreo.asunto ||
      !this.nuevoCorreo.remitente ||
      !this.nuevoCorreo.destinatario ||
      !this.nuevoCorreo.contenido
    ) {
      alert('Por favor complete todos los campos requeridos');
      return false;
    }
    return true;
  }

  private resetFormCorreo(): void {
    this.nuevoCorreo = {
      asunto: '',
      remitente: '',
      destinatario: '',
      contenido: '',
      linkPhishing: '',
    };
  }

  // Gestión de interacciones
  toggleFormInteraccion(): void {
    this.mostrarFormInteraccion = !this.mostrarFormInteraccion;
    if (this.mostrarFormInteraccion) {
      this.resetFormInteraccion();
    }
  }

  registrarInteraccion(): void {
    if (this.validarFormInteraccion()) {
      this.simulacionesService.registrarInteraccion(this.nuevaInteraccion);
      this.cargarDatos();
      this.toggleFormInteraccion();
      alert('Interacción registrada exitosamente');
    }
  }

  private validarFormInteraccion(): boolean {
    if (
      !this.nuevaInteraccion.correoId ||
      !this.nuevaInteraccion.usuario ||
      !this.nuevaInteraccion.accion
    ) {
      alert('Por favor complete todos los campos requeridos');
      return false;
    }
    return true;
  }

  private resetFormInteraccion(): void {
    this.nuevaInteraccion = {
      correoId: 0,
      usuario: '',
      accion: 'clic',
      detalles: '',
    };
  }

  obtenerNombreCorreo(correoId: number): string {
    const correo = this.correos.find((c) => c.id === correoId);
    return correo ? correo.asunto : 'Correo eliminado';
  }

  formatearFecha(fecha: Date): string {
    const d = new Date(fecha);
    return (
      d.toLocaleDateString('es-ES') +
      ' ' +
      d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    );
  }
}
