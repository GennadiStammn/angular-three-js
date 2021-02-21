import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreeGeometriesComponent } from './three-geometries/three-geometries.component';
import { ThreeTextureComponent } from './three-texture/three-texture.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeGeometriesComponent,
    ThreeTextureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
