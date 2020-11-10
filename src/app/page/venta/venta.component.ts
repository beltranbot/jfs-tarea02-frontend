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
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Venta } from 'src/app/_model/venta';
import { VentaService } from 'src/app/_service/venta.service';

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

  displayedColumns = [
    'idProducto',
    'precioUnidad',
    'cantidad',
    'subtotal',
    'acciones',
  ];
  detalleVentas: DetalleVenta[] = [];
  dataSource: MatTableDataSource<DetalleVenta>;

  constructor(
    private personaService: PersonaService,
    private productoService: ProductoService,
    private VentaService: VentaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.listarPersonas();
    this.listarProductos();
    this.adicionarFila();
  }

  listarPersonas() {
    this.personas$ = this.personaService.listar();
  }

  listarProductos() {
    this.productos$ = this.productoService.listar();
  }

  disableRegistrar() {
    if (!this.idPersonaSeleccionado) return true;

    let productoIds = {};
    for (let i = 0; i < this.detalleVentas.length; i++) {
      const detalle = this.detalleVentas[i];

      if (Object.keys(detalle.producto).length === 0) return true;
      if (detalle.producto.idProducto in productoIds) return true;
      productoIds[detalle.producto.idProducto] = true;
    }

    return false;
  }

  aceptar() {
    let venta = new Venta();
    let persona = new Persona();
    persona.idPersona = this.idPersonaSeleccionado;
    venta.persona = persona;
    venta.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
    venta.detalleVenta = this.detalleVentas;

    this.VentaService
      .registrar(venta)
      .subscribe(() => {
        this.snackBar.open('Se registró', 'Aviso', { duration: 2000 });
        setTimeout(() => {
          this.limpiarControles();
        }, 2000);
      });
  }

  limpiarControles() {
    this.idPersonaSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.detalleVentas = [];
    this.dataSource = new MatTableDataSource(this.detalleVentas);
  }

  adicionarFila() {
    let detalleVenta = new DetalleVenta();
    detalleVenta.producto = new Producto();
    detalleVenta.cantidad = 1;
    this.detalleVentas.push(detalleVenta);
    this.dataSource = new MatTableDataSource(this.detalleVentas);
  }

  eliminarFila(index: number) {
    if (this.detalleVentas.length > 0) {
      this.detalleVentas.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.detalleVentas);
    }
  }
}
