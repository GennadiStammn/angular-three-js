import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreeTextureComponent } from './three-texture/three-texture.component';

const routes: Routes = [{
  path: '**', component: ThreeTextureComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
