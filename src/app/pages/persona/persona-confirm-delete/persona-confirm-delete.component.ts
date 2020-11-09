import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Persona } from 'src/app/_model/persona';
import { PersonaService } from 'src/app/_service/persona.service';

@Component({
  selector: 'app-persona-dialogo',
  templateUrl: './persona-confirm-delete.component.html',
  styleUrls: ['./persona-confirm-delete.component.css'],
})
export class PersonaConfirmDeleteComponent implements OnInit {
  persona: Persona;

  constructor(
    private dialogRef: MatDialogRef<PersonaConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Persona,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.persona = new Persona();
    this.persona.idPersona = this.data.idPersona;
    this.persona.nombres = this.data.nombres;
    this.persona.apellidos = this.data.apellidos;
  }

  confirmar() {
    // eliminar
    this.personaService
      .eliminar(this.persona.idPersona)
      .pipe(
        switchMap(() => {
          return this.personaService.listar();
        })
      )
      .subscribe((data) => {
        this.personaService.setPersonaCambio(data);
        this.personaService.setMensajeCambio('SE ELIMINO');
      });
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
