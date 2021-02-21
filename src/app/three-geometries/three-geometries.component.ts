import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
const scene: THREE.Scene = new THREE.Scene()

export function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

export function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

@Component({
  selector: 'app-three-geometries',
  templateUrl: './three-geometries.component.html',
  styleUrls: ['./three-geometries.component.scss']
})
export class ThreeGeometriesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // CREATE DIV FOR 3D CANVAS
    const container = document.createElement('div')
    document.body.appendChild(container);

    // CAMERA
    camera.position.set(0, 4, 7);
    camera.lookAt(0, 0, 0);

    // SCENE

    // LIGHTS
    const pointLight = new THREE.PointLight(0xff0000, 2);
    scene.add(pointLight);

    // GROUP
    let group = new THREE.Group();
    scene.add(group);

    // GRID
    group.add(new THREE.GridHelper(4, 12, 0x888888, 0x444444));

    // RENDERER
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // EVENTS
    window.addEventListener('resize', onWindowResize);

    // add cube
    const geometryCube = new THREE.BoxGeometry();
    const materialCube = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometryCube, materialCube);
    cube.position.x = -2
    group.add(cube);

    // add cone
    const geometryCone = new THREE.ConeGeometry(0.5);
    const materialCone = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const cone = new THREE.Mesh(geometryCone, materialCone);
    group.add(cone);

    // add sphere
    const geometrySphere = new THREE.SphereGeometry(0.75);
    const materialSphere = new THREE.MeshBasicMaterial({color: 0xffff00 })
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.position.x = 2;
    group.add(sphere)

    // add torus
    const geometryTorus = new THREE.TorusGeometry(0.5, 0.1);
    const materialTorus = new THREE.MeshBasicMaterial({color: 0xffa500})
    const torus = new THREE.Mesh(geometryTorus, materialTorus);
    torus.position.z = -2
    group.add(torus)


    // add torus
    const geometryTetrahedron = new THREE.TetrahedronGeometry(0.5)
    const materialTetrahedron = new THREE.MeshBasicMaterial({color: 0x8800ff})
    const tetrahedron = new THREE.Mesh(geometryTetrahedron, materialTetrahedron);
    tetrahedron.position.z = 2
    tetrahedron.rotation.y += 0.7
    group.add(tetrahedron)

    // ANIMATE
    animate()
  }
}
