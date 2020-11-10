import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from './../../_service/producto.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from './../../_model/producto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoConfirmDeleteComponent } from 'src/app/pages/producto/producto-confirm-delete/producto-confirm-delete.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  displayedColumns = [
    'idProducto',
    'nombre',
    'marca',
    'precioUnidad',
    'acciones',
  ];
  dataSource: MatTableDataSource<Producto>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productoService.getProductoCambio().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.productoService.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000,
      });
    });

    this.productoService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(producto: Producto) {
    this.dialog.open(ProductoConfirmDeleteComponent, {
      width: '250px',
      data: producto,
    });
  }
}
