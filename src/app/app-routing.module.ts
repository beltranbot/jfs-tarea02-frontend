import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './page/producto/producto.component';
import { PersonaComponent } from './pages/persona/persona.component';

const routes: Routes = [
  { path: 'persona', component: PersonaComponent },
  { path: 'producto', component: ProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
