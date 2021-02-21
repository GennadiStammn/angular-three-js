import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ThreejsService } from './../threejs.service';

@Component({
  selector: 'app-three-geometries',
  templateUrl: './three-geometries.component.html',
  styleUrls: ['./three-geometries.component.scss']
})
export class ThreeGeometriesComponent implements OnInit {

  constructor(private threejs: ThreejsService) {
  }

  ngOnInit(): void {
    // CREATE DIV FOR 3D CANVAS
    const container = document.createElement('div')
    document.body.appendChild(container);
    this.threejs.appendRendererTo(container)

    this.threejs.addToScene((scene) => {
      scene.add(new THREE.GridHelper(4, 12, 0x888888, 0x444444));

      // add cube
      const geometryCube = new THREE.BoxGeometry();
      const materialCube = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometryCube, materialCube);
      cube.position.x = -2
      scene.add(cube);

      // add cone
      const geometryCone = new THREE.ConeGeometry(0.5);
      const materialCone = new THREE.MeshBasicMaterial({ color: 0x00ffff });
      const cone = new THREE.Mesh(geometryCone, materialCone);
      scene.add(cone);

      // add sphere
      const geometrySphere = new THREE.SphereGeometry(0.75);
      const materialSphere = new THREE.MeshBasicMaterial({ color: 0xffff00 })
      const sphere = new THREE.Mesh(geometrySphere, materialSphere);
      sphere.position.x = 2;
      scene.add(sphere)

      // add torus
      const geometryTorus = new THREE.TorusGeometry(0.5, 0.1);
      const materialTorus = new THREE.MeshBasicMaterial({ color: 0xffa500 })
      const torus = new THREE.Mesh(geometryTorus, materialTorus);
      torus.position.z = -2
      scene.add(torus)


      // add torus
      const geometryTetrahedron = new THREE.TetrahedronGeometry(0.5)
      const materialTetrahedron = new THREE.MeshBasicMaterial({ color: 0x8800ff })
      const tetrahedron = new THREE.Mesh(geometryTetrahedron, materialTetrahedron);
      tetrahedron.position.z = 2
      tetrahedron.rotation.y += 0.7
      scene.add(tetrahedron)
    })

    this.threejs.start()
  }
}
