import { Persona } from './persona';
import { DetalleVenta } from './detalleVenta';

export class Venta {
  fecha: string;
  persona: Persona;
  detalleVenta: DetalleVenta[];

  calcularTotal(): number {
    let total = 0;
    for (const detalle of this.detalleVenta) {
      total += detalle.calcularSubtotal();
    }
    return total;
  }
}
