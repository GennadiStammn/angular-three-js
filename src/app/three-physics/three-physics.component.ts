import { Component, OnInit } from '@angular/core';
import { Project, Scene3D, PhysicsLoader } from 'enable3d'

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
    // preload your assets here
  }

  async create() {
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed()

    // position camera
    this.camera.position.set(10, 10, 20)

    // enable physics debug
    this.physics.debug.enable()

    // add shape with physics
    // let sphere1 = this.physics.add.sphere({y: 5, x: 0.01, radius: 0.5}, {lambert: {color: 'yellow'}})
    // sphere1.body.setBounciness(1)

    // add compound shape with physics
    // let box1 = this.add.box({}, {lambert: {color: 'green'}})
    // let box2 = this.add.box({y: 1}, {lambert: {color: 'green'}})
    // let cone = this.add.cone({y: 2, radius: 0.5, radiusSegments: 32}, {lambert: {color: 'green'}});
    // box1.add(box2)
    // box1.add(cone)
    // this.physics.add.existing(box1)

    // collision detection
    // sphere1.body.on.collision((otherObject, event) => {
    //   if (otherObject.name !== 'ground') {
    //     console.log(otherObject.name)
    //   }
    // })

    //water
    // const textures = await Promise.all([
    //   this.load.texture('/assets/water/Water_1_M_Normal.jpg'),
    //   this.load.texture('/assets/water/Water_2_M_Normal.jpg')
    // ])

    // textures[0].needsUpdate = true
    // textures[1].needsUpdate = true

    // this.misc.water({
    //   y: 0.01,
    //   normalMap0: textures[0],
    //   normalMap1: textures[1]
    // })


    // wrecking ball
    for (let i = 2; i <= 12; i++) {
      // chain
      let t2 = this.add.torus(
        { x: i * 1.3 - 20, y: 22, tubularSegments: 12, tube: 0.2 },
        { standard: { emissive: 0x888888, roughness: 0.4, metalness: 1 } }
      )
      if (i % 2 == 0) t2.rotateX(Math.PI / 2)
      this.physics.add.existing(t2, { mass: i === 12 ? 0 : 1 })

      // ball
      if (i === 2) {
        let ball = this.physics.add.sphere(
          { mass: 2, radius: 2, x: -20.8, y: 22 },
          { standard: { emissive: 0x222222, roughness: 0.4, metalness: 1 } }
        )
        this.physics.add.constraints.lock(t2.body, ball.body)
      }
    }

    // wall
    for (let y = 0; y <= 6; y += 2) {
      for (let z = -4; z <= 2; z += 2) {
        for (let x = 0; x <= 2; x += 2) {
          this.physics.add.box({ x, y, z, width: 1.95, height: 1.95, depth: 1.95, mass: 0.4 })
        }
      }
    }
  }

  update() {

  }

  ngOnInit(): void {
  }

}

// set your project configs
const config = { scenes: [ThreePhysicsComponent], gravity: { x: 0, y: -9.81, z: 0 }, maxSubSteps: 4, fixedTimeStep: 1 / 60  }
PhysicsLoader('../assets/ammo', () => new Project(config))
