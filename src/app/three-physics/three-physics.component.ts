import {  GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Component, OnInit } from '@angular/core';
import { Project, Scene3D, PhysicsLoader, ExtendedObject3D } from 'enable3d'
import * as THREE from 'three'

@Component({
  selector: 'app-three-physics',
  templateUrl: './three-physics.component.html',
  styleUrls: ['./three-physics.component.scss']
})
export class ThreePhysicsComponent extends Scene3D implements OnInit {

  constructor() {
    super()
  }

  async init() {
    this.renderer.setPixelRatio(1)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  async preload() {

  }

  async create() {
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed()

    // position camera
    this.camera.position.set(13, 10, 23)

    //this.haveSomeFun()

    // add shape with physics
    let box1 = this.physics.add.box({}, {phong: {color: 'green'}})
    let sphere1 = this.physics.add.sphere({y: 5, z: -3}, {lambert: {color: 'yellow'}})
    let torus1 = this.physics.add.torus({y: 1, z: 3, tube: 0.2, radialSegments: 16, tubularSegments: 16}, {lambert: {color: 'orange'}})

    // enable physics debug
    this.physics.debug.enable()

    // apply physic stuff
    sphere1.body.setBounciness(0.4)
    sphere1.body.applyForceX(0.3)
    torus1.body.applyForceX(5)

    //gltf loader
    new GLTFLoader().loadAsync('../../assets/Duck.glb').then( gltf => {

      const duck: any = gltf.scene.children[0]
      duck.position.y -= 1
      const object = new ExtendedObject3D()
      object.add(duck)
      object.position.z = 6
      this.add.existing(object)
      this.physics.add.existing(object, { shape: 'box', width: 2, height: 2, depth: 2 })

      // duck.position.z = 6
      // this.scene.add(duck as any)
      // this.physics.add.existing(duck, { shape: 'convex'})
    })
    let box2 = this.physics.add.box({x: -10, z: 6}, {phong: {color: 'red'}})
    box2.body.applyForceX(15)

    // compound objects
    let group = new THREE.Group()
    group.position.z = 9
    group.position.y = 5
    group.rotation.z -= 1.5
    let c1 = this.add.box({x: -1, y: -1})
    let c2 = this.add.box({x: -1, y: 0})
    let c3 = this.add.box({x: -1, y: 1})
    let c4 = this.add.box({y: 1})
    let c5 = this.add.box({x: 1, y: 1})
    let c6 = this.add.box({x: 2, y: 1})
    this.add.existing(group)
    group.add(c1 as any)
    group.add(c2 as any)
    group.add(c3 as any)
    group.add(c4 as any)
    group.add(c5 as any)
    group.add(c6 as any)
    this.physics.add.existing(group as any)

    // wrecking ball
    // for (let i = 2; i <= 12; i++) {
    //   // chain
    //   let t2 = this.add.torus(
    //     { x: i * 1.3 - 20, y: 22, tubularSegments: 12, tube: 0.2 },
    //     { standard: { emissive: 0x888888, roughness: 0.4, metalness: 1 } }
    //   )
    //   if (i % 2 == 0) t2.rotateX(Math.PI / 2)
    //   this.physics.add.existing(t2, { mass: i === 12 ? 0 : 1 })

    //   // ball
    //   if (i === 2) {
    //     let ball = this.physics.add.sphere(
    //       { mass: 2, radius: 2, x: -20.8, y: 22 },
    //       { standard: { emissive: 0x222222, roughness: 0.4, metalness: 1 } }
    //     )
    //     this.physics.add.constraints.lock(t2.body, ball.body)
    //   }
    // }

    // wall
    // for (let y = 0; y <= 6; y += 2) {
    //   for (let z = -4; z <= 2; z += 2) {
    //     for (let x = 0; x <= 2; x += 2) {
    //       this.physics.add.box({ x, y, z, width: 1.95, height: 1.95, depth: 1.95, mass: 0.4 })
    //     }
    //   }
    // }
  }

  update() {

  }

  ngOnInit(): void {
  }

}

// set your project configs
const config = { scenes: [ThreePhysicsComponent], antialias: true, gravity: { x: 0, y: -9.81, z: 0 } }
PhysicsLoader('../assets/ammo', () => new Project(config))
