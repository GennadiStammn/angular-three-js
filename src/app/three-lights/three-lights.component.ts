import { ThreejsService } from './../threejs.service';
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-lights',
  templateUrl: './three-lights.component.html',
  styleUrls: ['./three-lights.component.scss']
})
export class ThreeLightsComponent implements OnInit {

  constructor(private threejs: ThreejsService) { }

  ngOnInit(): void {
    // CREATE DIV FOR 3D CANVAS
    const container = document.createElement('div')
    document.body.appendChild(container);
    this.threejs.appendRendererTo(container)

    this.threejs.addToScene((scene) => {
      const geometryTorus1 = new THREE.TorusGeometry(0.5, 0.1, 64, 64);
      // NON SHINY MATERIAL
      const materialTorus1 = new THREE.MeshLambertMaterial({ color: 0xffa500 })
      const torus1 = new THREE.Mesh(geometryTorus1, materialTorus1);
      torus1.position.z -= 2
      scene.add(torus1)

      const geometryTorus2 = new THREE.TorusGeometry(0.5, 0.1, 64, 64);
      // SHINY MATERIAL
      const materialTorus2 = new THREE.MeshPhongMaterial({ color: 0xff0000 })
      const torus2 = new THREE.Mesh(geometryTorus2, materialTorus2);
      scene.add(torus2)

      // White directional light at half intensity shining from the top.
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
      scene.add(directionalLight);

      scene.background = new THREE.Color( 0xffffff );

      this.threejs.appendAnimation( () => {
        torus1.rotation.y += 0.01
        torus1.rotation.z += 0.01

        torus2.rotation.y += 0.02
        torus2.rotation.z += 0.02
      })
    })

    this.threejs.start()
  }

}
