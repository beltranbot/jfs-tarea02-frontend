import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { PersonaService } from 'src/app/_service/persona.service';
import { Persona } from 'src/app/_model/persona';
import { DetalleVenta } from 'src/app/_model/detalleVenta';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/_model/producto';
import { ProductoService } from 'src/app/_service/producto.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent implements OnInit {
  personas$: Observable<Persona[]>;
  productos$: Observable<Producto[]>;
  idPersonaSeleccionado: number;
  idDetalleSeleccionado: number;

  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date();

  displayedColumns = ['idProducto', 'precioUnidad', 'cantidad', 'subtotal'];
  detalleVentas : DetalleVenta[];
  dataSource: MatTableDataSource<DetalleVenta>;

  constructor(
    private personaService: PersonaService,
    private productoService: ProductoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.listarPersonas();
    this.listarProductos();
    let detalleVenta = new DetalleVenta();
    detalleVenta.producto = new Producto();
    detalleVenta.cantidad = 1;
    this.dataSource = new MatTableDataSource([detalleVenta]);
  }

  listarPersonas() {
    this.personas$ = this.personaService.listar();
  }

  listarProductos() {
    this.productos$ = this.productoService.listar();
  }

  agregar() {
    // if (this.diagnostico != null && this.tratamiento != null) {
    //   let det = new DetalleVenta();
    //   det.diagnostico = this.diagnostico;
    //   det.tratamiento = this.tratamiento;
    //   this.detalleVenta.push(det);
    //   this.diagnostico = null;
    //   this.tratamiento = null;
    // }
  }

  // removerDiagnostico(index: number) {
  //   this.detalleVenta.splice(index, 1);
  // }

  // agregarExamen() {
  //   if (this.idExamenSeleccionado > 0) {
  //     let cont = 0;
  //     for (let i = 0; i < this.examenesSeleccionados.length; i++) {
  //       let examen = this.examenesSeleccionados[i];
  //       if (examen.idExamen === this.idExamenSeleccionado) {
  //         cont++;
  //         break;
  //       }
  //     }

  //     if (cont > 0) {
  //       let mensaje = 'El examen se encuentra en la lista';
  //       this.snackBar.open(mensaje, 'AVISO', { duration: 2000 });
  //     } else {
  //       this.examenService
  //         .listarPorId(this.idExamenSeleccionado)
  //         .subscribe((data) => {
  //           this.examenesSeleccionados.push(data);
  //         });
  //     }
  //   }
  // }

  // removerExamen(index: number) {
  //   this.examenesSeleccionados.splice(index, 1);
  // }

  estadoBotonRegistrar() {
    return true;
  }

  aceptar() {
    // let medico = new Medico();
    // medico.idMedico = this.idMedicoSeleccionado;
    // let especialidad = new Especialidad();
    // especialidad.idEspecialidad = this.idEspecialidadSeleccionado;
    // let paciente = new Paciente();
    // paciente.idPaciente = this.idPacienteSeleccionado;
    // let venta = new Venta();
    // venta.medico = medico;
    // venta.especialidad = especialidad;
    // venta.paciente = paciente;
    // venta.numConsultorio = 'C1';
    // venta.fecha = moment(this.fechaSeleccionada).format(
    //   'YYYY-MM-DDTHH:mm:ss'
    // );
    // venta.detalleVenta = this.detalleVenta;
    // let ventaListaExamenDTO = new VentaListaExamenDTO();
    // ventaListaExamenDTO.venta = venta;
    // ventaListaExamenDTO.lstExamen = this.examenesSeleccionados;
    // console.log(ventaListaExamenDTO);
    // this.ventaService
    //   .registrarTransaccion(ventaListaExamenDTO)
    //   .subscribe(() => {
    //     this.snackBar.open('Se registró', 'Aviso', { duration: 2000 });
    //     setTimeout(() => {
    //       this.limpiarControles();
    //     }, 2000);
    //   });
  }

  limpiarControles() {
    this.idPersonaSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
  }
}
