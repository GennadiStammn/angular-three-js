import { ThreeLightsComponent } from './three-lights/three-lights.component';
import { ThreeGeometriesComponent } from './three-geometries/three-geometries.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreeTextureComponent } from './three-texture/three-texture.component';

const routes: Routes = [{
  path: 'lights', component: ThreeLightsComponent
}, {
  path: 'geometries', component: ThreeGeometriesComponent
}, {
  path: 'texture', component: ThreeTextureComponent
}, {
  path: '**', component: ThreeLightsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
