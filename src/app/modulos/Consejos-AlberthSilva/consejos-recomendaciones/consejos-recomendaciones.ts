import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Consejo {
  titulo: string;
  descripcion: string;
  categoria: string;
}

interface Recomendacion {
  titulo: string;
  descripcion: string;
  detalles: string[];
  prioridad: 'alta' | 'media' | 'baja';
}

@Component({
  selector: 'app-consejos-recomendaciones',
  imports: [CommonModule],
  templateUrl: './consejos-recomendaciones.html',
  styleUrl: './consejos-recomendaciones.css',
})
export class ConsejosRecomendaciones {
  activeTab: string = 'recomendaciones';

  recomendaciones: Recomendacion[] = [
    {
      titulo: 'Contraseñas robustas',
      descripcion: 'Usa combinaciones de letras, números y símbolos. Cambia periódicamente.',
      detalles: [
        'Mínimo 12 caracteres de longitud',
        'Combina mayúsculas, minúsculas, números y símbolos',
        'No uses información personal (nombres, fechas)',
        'Usa un gestor de contraseñas confiable',
        'Cambia tus contraseñas cada 3-6 meses',
        'Nunca reutilices contraseñas entre servicios'
      ],
      prioridad: 'alta'
    },
    {
      titulo: 'Autenticación en dos pasos',
      descripcion: 'Actívala en todos tus servicios importantes.',
      detalles: [
        'Protege tu cuenta incluso si alguien obtiene tu contraseña',
        'Disponible en correos, redes sociales y bancos',
        'Puede ser por SMS, app autenticadora o llave física',
        'Actívala especialmente en servicios financieros',
        'Guarda códigos de respaldo en lugar seguro',
        'Revisa dispositivos autorizados periódicamente'
      ],
      prioridad: 'alta'
    },
    {
      titulo: 'Actualizaciones constantes',
      descripcion: 'Mantén tu SO y apps siempre actualizadas.',
      detalles: [
        'Las actualizaciones corrigen vulnerabilidades de seguridad',
        'Activa actualizaciones automáticas cuando sea posible',
        'Actualiza navegadores, antivirus y software crítico',
        'Revisa actualizaciones de firmware en routers',
        'No ignores notificaciones de actualización',
        'Haz backup antes de actualizaciones mayores'
      ],
      prioridad: 'alta'
    },
    {
      titulo: 'Backup regular',
      descripcion: 'Realiza copias de seguridad periódicas de tus datos importantes.',
      detalles: [
        'Haz backup de archivos importantes semanalmente',
        'Usa almacenamiento en la nube y físico',
        'Prueba la restauración de backups periódicamente',
        'Protege tus backups con contraseñas',
        'Mantén múltiples copias en diferentes ubicaciones'
      ],
      prioridad: 'media'
    },
    {
      titulo: 'Navegación segura',
      descripcion: 'Ten cuidado con los sitios web que visitas y los enlaces en los que haces clic.',
      detalles: [
        'Verifica que los sitios usen HTTPS (candado verde)',
        'No hagas clic en enlaces sospechosos en emails',
        'Revisa la URL antes de ingresar credenciales',
        'Usa extensiones de seguridad en el navegador',
        'Evita descargar software de sitios no oficiales',
        'Cierra sesión en computadoras compartidas'
      ],
      prioridad: 'alta'
    }
  ];

  consejosPracticos: Consejo[] = [
    {
      titulo: 'Detecta correos phishing',
      descripcion: 'Aprende a identificar correos fraudulentos antes de hacer clic.',
      categoria: 'Email'
    },
    {
      titulo: 'Configura privacidad en redes sociales',
      descripcion: 'Ajusta la configuración de privacidad para proteger tu información personal.',
      categoria: 'Redes Sociales'
    },
    {
      titulo: 'Usa VPN en redes públicas',
      descripcion: 'Protege tu conexión cuando uses WiFi público en cafeterías o aeropuertos.',
      categoria: 'Redes'
    },
    {
      titulo: 'Revisa permisos de apps',
      descripcion: 'Verifica qué permisos solicitan las aplicaciones antes de instalarlas.',
      categoria: 'Aplicaciones'
    },
    {
      titulo: 'Elimina cuentas no utilizadas',
      descripcion: 'Cierra cuentas en servicios que ya no uses para reducir tu superficie de ataque.',
      categoria: 'Gestión'
    },
    {
      titulo: 'Verifica la seguridad de sitios web',
      descripcion: 'Aprende a leer certificados SSL y verificar la autenticidad de sitios.',
      categoria: 'Navegación'
    },
    {
      titulo: 'Protege tu router doméstico',
      descripcion: 'Cambia la contraseña por defecto y actualiza el firmware de tu router.',
      categoria: 'Redes'
    },
    {
      titulo: 'Usa bloqueo de pantalla',
      descripcion: 'Activa PIN, patrón o biometría en todos tus dispositivos móviles.',
      categoria: 'Dispositivos'
    }
  ];

  setTab(tab: string) {
    this.activeTab = tab;
  }

  getPrioridadClass(prioridad: string): string {
    return `prioridad-${prioridad}`;
  }
}
