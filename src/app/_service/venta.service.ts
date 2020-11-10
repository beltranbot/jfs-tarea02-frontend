import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Venta } from '../_model/venta';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends GenericService<Venta>{
  constructor(protected http : HttpClient) {
    super(http, `${environment.HOST}/ventas`)
  }
}
