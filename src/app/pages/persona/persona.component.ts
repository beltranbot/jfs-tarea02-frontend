import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/_model/persona';
import { PersonaService } from 'src/app/_service/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonaDialogoComponent } from './persona-dialogo/persona-dialogo.component';
import { PersonaConfirmDeleteComponent } from './persona-confirm-delete/persona-confirm-delete.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit {
  displayedColumns = ['idPersona', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private personaService: PersonaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.personaService.getPersonaCambio().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.personaService.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.personaService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  abrirDialogo(persona?: Persona) {
    let data = persona != null ? persona : new Persona();
    this.dialog.open(PersonaDialogoComponent, {
      width: '250px',
      data,
    });
  }

  eliminar(persona: Persona) {
    this.dialog.open(PersonaConfirmDeleteComponent, {
      width: '250px',
      data: persona,
    });
  }
}
