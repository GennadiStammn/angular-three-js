import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// CAMERA
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
camera.position.set(0, 5, 5);
camera.lookAt(0, 0, 0);

// RENDERER
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// SCENE
const scene: THREE.Scene = new THREE.Scene()

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);
controls.target.set(0, 0, 0);
controls.minZoom = 0.5;
controls.maxZoom = 4;
controls.update();

const animations: { (): void }[] = []
const mixers: THREE.AnimationMixer[] = []
const clock = new THREE.Clock();

export function animate() {
  requestAnimationFrame(animate);

  animations.forEach(a => a())

  var delta = clock.getDelta();
  mixers.forEach( mixer => mixer.update(delta) )

  render()
}

export function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function render() {
  renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize);

@Injectable({
  providedIn: 'root'
})
export class ThreejsService {

  constructor() { }

  public appendRendererTo(container: HTMLDivElement) {
    if (container != null) {
      container.appendChild(renderer.domElement);
    }
  }

  public addToScene(apply: (scene: THREE.Scene) => void) {
    apply(scene)
  }

  public appendAnimation(animation: () => void) {
    animations.push(animation)
  }

  public appendMixer(mixer: THREE.AnimationMixer) {
    mixers.push(mixer)
  }

  public start() {
    animate()
  }
}
