import { ThreePhysicsComponent } from './three-physics/three-physics.component';
import { ThreeGltfLoaderComponent } from './three-gltf-loader/three-gltf-loader.component';
import { ThreeLightsComponent } from './three-lights/three-lights.component';
import { ThreeGeometriesComponent } from './three-geometries/three-geometries.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreeTextureComponent } from './three-texture/three-texture.component';

const routes: Routes = [{
  path: 'physics', component: ThreePhysicsComponent
},{
  path: 'gltfloader', component: ThreeGltfLoaderComponent
},
{
  path: 'lights', component: ThreeLightsComponent
}, {
  path: 'geometries', component: ThreeGeometriesComponent
}, {
  path: 'texture', component: ThreeTextureComponent
}, {
  path: '**', component: ThreePhysicsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
