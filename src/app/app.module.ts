import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { PersonaComponent } from './pages/persona/persona.component';
import { PersonaDialogoComponent } from './pages/persona/persona-dialogo/persona-dialogo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonaConfirmDeleteComponent } from './pages/persona/persona-confirm-delete/persona-confirm-delete.component';
import { ProductoComponent } from './page/producto/producto.component';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';
import { ProductoConfirmDeleteComponent } from './pages/producto/producto-confirm-delete/producto-confirm-delete.component';
import { VentaComponent } from './page/venta/venta.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    PersonaDialogoComponent,
    PersonaConfirmDeleteComponent,
    ProductoComponent,
    ProductoEdicionComponent,
    ProductoConfirmDeleteComponent,
    VentaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
