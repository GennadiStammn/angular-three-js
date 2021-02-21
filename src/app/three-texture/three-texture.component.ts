import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
const scene: THREE.Scene = new THREE.Scene()

// load a texture, set wrap mode to repeat
const loader = new THREE.CubeTextureLoader();
loader.setPath( '../../assets/' );
const textureCube = loader.load( [
	'hi.png', 'hi.png',
	'hi.png', 'hi.png',
	'hi.png', 'hi.png'
] );

var geometry = new THREE.SphereGeometry(1, 20, 20);
var material = new THREE.MeshBasicMaterial({
  envMap: textureCube
});
var sphere = new THREE.Mesh(geometry, material);

const controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render );
controls.target.set( 0, 0, 0 );
controls.minZoom = 0.5;
controls.maxZoom = 4;
controls.update();

export function animate() {
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  sphere.rotation.z += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

export function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function render() {

  renderer.render( scene, camera );

}

@Component({
  selector: 'app-three-texture',
  templateUrl: './three-texture.component.html',
  styleUrls: ['./three-texture.component.scss']
})
export class ThreeTextureComponent implements OnInit {

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

    // RENDERER
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // EVENTS
    window.addEventListener('resize', onWindowResize);

    // add cube
    group.add(sphere);

    // ANIMATE
    animate()
  }

}
