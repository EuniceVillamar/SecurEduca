import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Autorizacion } from '../autorizacion';
import { MatTableDataSource } from '@angular/material/table';
import { EditarInfo } from '../edite-info/edite-info';
import { FormsModule } from '@angular/forms';

export interface PeriodicElement {
  NModulo: number;
  Nombre: string;
  Responsable: string;
  Objetivo1: string;
  Objetivo2: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    NModulo: 1,
    Nombre: 'Módulo de Lecciones Interactivas',
    Responsable: 'Ramirez Benavides Anthonny Gabriel',
    Objetivo1: 'Diseñar y desarrollar lecciones breves en formato de tarjetas interactivas.',
    Objetivo2: 'Gestionar el avance y registro de finalización por usuario.',
  },
  {
    NModulo: 2,
    Nombre: 'Módulo Simulador de Phishing',
    Responsable: 'Verdezoto Leon Carlos Gabriel',
    Objetivo1: 'Implementar el envío de correos electrónicos simulados.',
    Objetivo2: 'Registrar interacciones de los usuarios con enlaces phishing.',
  },
  {
    NModulo: 3,
    Nombre: 'Módulo Evaluador de Contraseñas',
    Responsable: 'Villamar Lascano Elizabeth Eunice',
    Objetivo1: 'Crear una herramienta que analice la fortaleza de contraseñas.',
    Objetivo2: 'Ofrecer recomendaciones y generar contraseñas seguras.',
  },
  {
    NModulo: 4,
    Nombre: 'Módulo de Cuestionarios de Conocimiento',
    Responsable: 'Mejia Mendez Gregory Stalyn',
    Objetivo1: 'Diseñar y programar tests con preguntas de opción múltiple.',
    Objetivo2: 'Mostrar resultados y explicaciones inmediatas.',
  },
  {
    NModulo: 5,
    Nombre: 'Módulo Dashboard de Progreso',
    Responsable: 'Silva Vega Alberth Gustavo',
    Objetivo1: 'Desarrollar gráficas y métricas del avance individual/grupal.',
    Objetivo2: 'Integrar logros y certificados virtuales.',
  },
];

@Component({
  selector: 'app-principal-page',
  standalone: true,
  imports: [MatTableModule, FormsModule],
  templateUrl: './principal-page.html',
  styleUrl: './principal-page.css',
})
export class PrincipalPage implements OnInit {
  displayedColumns: string[] = [
    'NModulo',
    'Nombre',
    'Responsable',
    'Objetivo1',
    'Objetivo2',
    'Acciones',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  moduloselect: any = {};

  readonly dialog = inject(MatDialog);

  constructor(private autoriza: Autorizacion) {}

  ngOnInit(): void {
    this.autoriza.modulo$.subscribe((data) => {
      this.moduloselect = data;
      console.log(this.moduloselect);
    });
  }

  editarModulo(row: any) {
    const dialogRef = this.dialog.open(EditarInfo, { width: '500px' });

    this.autoriza.modulo$.next(row);

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.actualizarModulo(resultado);
      }
    });
  }

  actualizarModulo(moduloEditado: any) {
    const index = this.dataSource.data.findIndex((m) => m.NModulo === moduloEditado.NModulo);

    if (index >= 0) {
      this.dataSource.data[index] = moduloEditado;
      this.dataSource._updateChangeSubscription();
    }
  }

  eliminarModulo(row: any) {
    const index = this.dataSource.data.indexOf(row);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }

  filtroTexto: string = '';

  aplicarFiltro() {
    this.dataSource.filter = this.filtroTexto.trim().toLowerCase();
  }
}
