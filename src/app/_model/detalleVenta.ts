import { Producto } from './producto';

export class DetalleVenta {
  producto: Producto;
  cantidad: number;

  calcularSubtotal(): number {
    return this.cantidad * this.producto.precioUnidad;
  }
}
