import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Producto } from 'src/app/_model/producto';
import { ProductoService } from 'src/app/_service/producto.service';

@Component({
  selector: 'app-producto-dialogo',
  templateUrl: './producto-confirm-delete.component.html',
  styleUrls: ['./producto-confirm-delete.component.css'],
})
export class ProductoConfirmDeleteComponent implements OnInit {
  producto: Producto;

  constructor(
    private dialogRef: MatDialogRef<ProductoConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Producto,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.producto = new Producto();
    this.producto.idProducto = this.data.idProducto;
    this.producto.nombre = this.data.nombre;
    this.producto.marca = this.data.marca;
    this.producto.precioUnidad = this.data.precioUnidad;
  }

  confirmar() {
    // eliminar
    this.productoService
      .eliminar(this.producto.idProducto)
      .pipe(
        switchMap(() => {
          return this.productoService.listar();
        })
      )
      .subscribe((data) => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio('SE ELIMINO');
      });
    this.cerrar();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
