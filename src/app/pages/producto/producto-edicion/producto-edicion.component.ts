import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Producto } from 'src/app/_model/producto';
import { ProductoService } from 'src/app/_service/producto.service';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css'],
})
export class ProductoEdicionComponent implements OnInit {
  idProducto: number;
  producto: Producto;
  form: FormGroup;
  edicion: boolean = false;

  constructor(
    private productoServicio: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.producto = new Producto();

    this.form = new FormGroup({
      idProducto: new FormControl(0),
      nombre: new FormControl(''),
      marca: new FormControl(''),
      precioUnidad: new FormControl(0.0),
    });

    this.route.params.subscribe((params: Params) => {
      this.idProducto = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.productoServicio.listarPorId(this.idProducto).subscribe((data) => {
        let idProducto = data.idProducto;
        let nombre = data.nombre;
        let marca = data.marca;
        let precioUnidad = data.precioUnidad / 1;
        this.form = new FormGroup({
          idProducto: new FormControl(idProducto),
          nombre: new FormControl(nombre),
          marca: new FormControl(marca),
          precioUnidad: new FormControl(precioUnidad),
        });
      });
    }
  }

  operar() {
    this.producto.idProducto = this.form.value['idProducto'];
    this.producto.nombre = this.form.value['nombre'];
    this.producto.marca = this.form.value['marca'];
    this.producto.precioUnidad = this.form.value['precioUnidad'];

    if (this.producto != null && this.producto.idProducto > 0) {
      // modificar

      this.productoServicio
        .modificar(this.producto)
        .pipe(
          switchMap(() => {
            return this.productoServicio.listar();
          })
        )
        .subscribe((data) => {
          this.productoServicio.setProductoCambio(data);
          this.productoServicio.setMensajeCambio('Se modificó');
        });
    } else {
      // registrar
      this.productoServicio
        .registrar(this.producto)
        .pipe(
          switchMap(() => {
            return this.productoServicio.listar();
          })
        )
        .subscribe((producto) => {
          this.productoServicio.setProductoCambio(producto);
          this.productoServicio.setMensajeCambio('Se registró');
        });
    }

    this.router.navigate(['producto']);
  }
}
