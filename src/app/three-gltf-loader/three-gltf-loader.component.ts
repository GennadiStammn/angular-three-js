import { ThreejsService } from './../threejs.service';
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-three-gltf-loader',
  templateUrl: './three-gltf-loader.component.html',
  styleUrls: ['./three-gltf-loader.component.scss']
})
export class ThreeGltfLoaderComponent implements OnInit {

  loader = new GLTFLoader();

  constructor(private threejs: ThreejsService) { }

  ngOnInit(): void {
    // CREATE DIV FOR 3D CANVAS
    const container = document.createElement('div')
    document.body.appendChild(container);
    this.threejs.appendRendererTo(container)

    this.threejs.addToScene((scene) => {

      this.loader.loadAsync('../../assets/cesiumman/CesiumMan.glb').then((gltf) => {
        var mixer = new THREE.AnimationMixer(gltf.scene);
        var action = mixer.clipAction(gltf.animations[0]);
        action.play();
        scene.add(gltf.scene);
        this.threejs.appendMixer(mixer)
      })

      // White directional light at half intensity shining from the top.
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.y += 5

      const targetObject = new THREE.Object3D();
      targetObject.position.x -= 5
      targetObject.position.z -= 5
      directionalLight.target = targetObject

      scene.add(targetObject);
      scene.add(directionalLight);

      scene.background = new THREE.Color(0xffa500);
    })

    this.threejs.start()
  }

}
