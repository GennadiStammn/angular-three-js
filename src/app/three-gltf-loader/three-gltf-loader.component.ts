import { ThreejsService } from './../threejs.service';
import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

@Component({
  selector: 'app-three-gltf-loader',
  templateUrl: './three-gltf-loader.component.html',
  styleUrls: ['./three-gltf-loader.component.scss']
})
export class ThreeGltfLoaderComponent implements OnInit {

  gltfLoader = new GLTFLoader();
  objLoader = new OBJLoader();

  constructor(private threejs: ThreejsService) { }

  ngOnInit(): void {
    // CREATE DIV FOR 3D CANVAS
    const container = document.createElement('div')
    document.body.appendChild(container);
    this.threejs.appendRendererTo(container)

    this.threejs.addToScene((scene) => {

      this.gltfLoader.loadAsync('../../assets/cesiumman/CesiumMan.glb').then((gltf) => {
        var mixer = new THREE.AnimationMixer(gltf.scene);
        var action = mixer.clipAction(gltf.animations[0]);
        action.play();
        scene.add(gltf.scene);
        this.threejs.appendMixer(mixer)
      })

      // OBJ LOADER
      let object;
      function loadModel() {
        object.traverse(function (child) {
          if (child.isMesh) child.material.map = texture;
        });
        object.position.x = - 2;
        scene.add(object);
      }
      const manager = new THREE.LoadingManager(loadModel);
      manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
      };
      const textureLoader = new THREE.TextureLoader(manager);
      const texture = textureLoader.load('../../assets/chr_knight.png')
      this.objLoader.loadAsync('../../assets/chr_knight.obj').then((obj) => {
        object = obj;
      })

      // OBJ with material
      new MTLLoader( manager )
      .load( '../../assets/chr_knight.mtl', function ( materials ) {

        materials.preload();

        new OBJLoader( manager )
          .setMaterials( materials )
          .load( '../../assets/chr_knight.obj', function ( object ) {

            object.position.x = 2
            scene.add( object );

          });

      } );

      // OBJ with material
      new MTLLoader( manager )
      .load( '../../assets/church.mtl', function ( materials ) {

        materials.preload();

        new OBJLoader( manager )
          .setMaterials( materials )
          .load( '../../assets/church.obj', function ( object ) {

            object.position.z = -2
            scene.add( object );

          });

      } );

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
