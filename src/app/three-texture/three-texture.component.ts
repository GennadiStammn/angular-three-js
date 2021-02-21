import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ThreejsService } from './../threejs.service';

@Component({
  selector: 'app-three-texture',
  templateUrl: './three-texture.component.html',
  styleUrls: ['./three-texture.component.scss']
})
export class ThreeTextureComponent implements OnInit {

  constructor(private threejs: ThreejsService) {
  }

  ngOnInit(): void {
    const container = document.createElement('div')
    document.body.appendChild(container);
    this.threejs.appendRendererTo(container)

    this.threejs.addToScene((scene: THREE.Scene) => {
      // BACKGROUND
      const loader = new THREE.CubeTextureLoader();
      loader.setPath('../../assets/');
      const textureCube = loader.load([
        'hi.png', 'hi.png',
        'hi.png', 'hi.png',
        'hi.png', 'hi.png'
      ]);
      scene.background = textureCube

      // BOX WITH TEXTURE
      const texture = new THREE.TextureLoader().load('../../assets/oh.png');
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);

      this.threejs.appendAnimation( () => {
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01
      })

      scene.add(mesh)
    })

    this.threejs.start()
  }

}
