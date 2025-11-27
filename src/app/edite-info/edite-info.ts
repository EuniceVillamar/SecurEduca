import { Component, OnInit } from '@angular/core';
import { Autorizacion } from '../autorizacion';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-info',
  imports: [FormsModule, CommonModule],
  templateUrl: './edite-info.html',
  styleUrl: './edite-info.css',
})
export class EditarInfo implements OnInit {
  NModulo: number = 0;
  Nombre: string = '';
  Responsable: string = '';
  Objetivo1: string = '';
  Objetivo2: string = '';

  moduloselect: any = {};

  constructor(private autoriza: Autorizacion, private dialogRef: MatDialogRef<EditarInfo>) {}

  ngOnInit(): void {
    this.autoriza.modulo$.subscribe((data) => {
      this.moduloselect = data;
      this.NModulo = this.moduloselect.NModulo;
      this.Nombre = this.moduloselect.Nombre;
      this.Responsable = this.moduloselect.Responsable;
      this.Objetivo1 = this.moduloselect.Objetivo1;
      this.Objetivo2 = this.moduloselect.Objetivo2;
    });
  }

  guardarInfo() {
    const moduloActualizado = {
      NModulo: this.NModulo,
      Nombre: this.Nombre,
      Responsable: this.Responsable,
      Objetivo1: this.Objetivo1,
      Objetivo2: this.Objetivo2,
    };

    this.dialogRef.close(moduloActualizado);
  }

  cancelarEdit() {
    this.dialogRef.close();
  }
}
