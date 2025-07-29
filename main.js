import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let ROWS = 8;
let COLS = 16;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

class AnalogClock {
  constructor(scene, position = [0, 0, 0], clock_size = 4) {
    // Draw Clock
    this.clockMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(
        clock_size / 2,
        clock_size / 2,
        clock_size / 4,
        64
      ),
      new THREE.MeshPhongMaterial({ color: 0x0000ff })
    );
    this.clockMesh.position.set(
      0 + position[0],
      0 + position[1],
      -clock_size / 8 + position[2]
    );
    this.clockMesh.rotateX(Math.PI / 2);
    scene.add(this.clockMesh);

    // Create hands
    const hourShape = new THREE.Shape();
    hourShape.moveTo(-clock_size / 30, 0);
    hourShape.lineTo(clock_size / 30, 0);
    hourShape.lineTo(clock_size / 30, clock_size / 3);
    hourShape.lineTo(0, clock_size / 2.5);
    hourShape.lineTo(-clock_size / 30, clock_size / 3);
    hourShape.lineTo(-clock_size / 30, 0);

    const hourExtrudeSettings = {
      steps: 1,
      depth: 0.1,
      bevelEnabled: false,
    };

    this.hourHand = new THREE.Mesh(
      new THREE.ExtrudeGeometry(hourShape, hourExtrudeSettings),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    this.hourHand.position.set(position[0], position[1], position[2]);

    const minuteShape = new THREE.Shape();
    minuteShape.moveTo(-clock_size / 30, 0);
    minuteShape.lineTo(clock_size / 30, 0);
    minuteShape.lineTo(clock_size / 30, (clock_size * 2) / 5);
    minuteShape.lineTo(0, clock_size / 2);
    minuteShape.lineTo(-clock_size / 30, (clock_size * 2) / 5);
    minuteShape.lineTo(-clock_size / 30, 0);
    const minuteExtrudeSettings = {
      steps: 1,
      depth: 0.1,
      bevelEnabled: false,
    };
    this.minuteHand = new THREE.Mesh(
      new THREE.ExtrudeGeometry(minuteShape, minuteExtrudeSettings),
      new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    );
    this.minuteHand.position.set(position[0], position[1], position[2]);

    scene.add(this.hourHand);
    scene.add(this.minuteHand);
  }

  update(ang1, ang2) {
    this.hourHand.rotation.z = ang1;
    this.minuteHand.rotation.z = ang2;
  }
}

class ClockWall {
  constructor(
    scene,
    center_position = [0, 0, 0],
    clock_size = 4,
    clock_spacing = 0.5
  ) {
    this.clocks = [];
    for (let i = 0; i < ROWS; i++) {
      this.clocks[i] = [];
      for (let j = 0; j < COLS; j++) {
        this.clocks[i][j] = new AnalogClock(
          scene,
          [
            center_position[0] +
              j * (clock_size + clock_spacing) -
              ((clock_size + clock_spacing) * (COLS - 1)) / 2,
            center_position[1] +
              i * (clock_size + clock_spacing) -
              ((clock_size + clock_spacing) * (ROWS - 1)) / 2,
            center_position[2],
          ],
          clock_size
        );
      }
    }
  }

  setFace(i, j, ang1, ang2) {
    this.clocks[i][j].update(ang1, ang2);
  }
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const stats = new Stats();
document.body.appendChild(stats.dom);

// add helper axes
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

new OrbitControls(camera, renderer.domElement);

// Add a light source
const color = 0xffffff;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-5, -5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x505050); // Soft white light
scene.add(ambientLight);

const clockwall = new ClockWall(scene, [0, 0, 0], 1.5);

camera.position.z = 12;
camera.lookAt(0, 0, 0);

function animate() {
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60; // Convert to 12-hour format
  const second_angle = -(seconds * Math.PI) / 30; // 360 degrees / 60 seconds = 6 degrees per second
  //   clock.update(hour_angle, minute_angle);
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let ang1 = second_angle + ((j - 7.5) * Math.PI) / 16 + (i * Math.PI) / 8;
      let ang2 = ang1 + Math.PI;
      clockwall.setFace(i, j, ang1, ang2);
    }
  }

  renderer.render(scene, camera);
  stats.update();
}
