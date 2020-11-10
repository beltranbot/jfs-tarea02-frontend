import { Producto } from './producto';

export class DetalleVenta {
  producto: Producto;
  cantidad: number;
  precioUnidad: number;

  calcularSubtotal(): number {
    return this.cantidad * this.precioUnidad;
  }
}
