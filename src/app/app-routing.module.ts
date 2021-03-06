import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './page/producto/producto.component';
import { VentaComponent } from './page/venta/venta.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';

const routes: Routes = [
  { path: 'persona', component: PersonaComponent },
  {
    path: 'producto',
    component: ProductoComponent,
    children: [
      { path: 'nuevo', component: ProductoEdicionComponent },
      { path: 'edicion/:id', component: ProductoEdicionComponent },
    ],
  },
  { path: 'venta', component: VentaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
