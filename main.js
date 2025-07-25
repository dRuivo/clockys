import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

class AnalogClock {
  constructor(scene, position = [0, 0, 0]) {
    // Draw Clock
    this.clockMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(4, 4, 1, 64),
      new THREE.MeshPhongMaterial({ color: 0x0000ff })
    );
    this.clockMesh.position.set(0, 0, -0.5);
    this.clockMesh.rotateX(Math.PI / 2);
    scene.add(this.clockMesh);

    // Create hands
    this.hourHand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 2, 32),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    this.minuteHand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 3, 32),
      new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    );
    this.hourHand.position.set(0, 1, 0);
    this.minuteHand.position.set(0, 1.5, 0);

    scene.add(this.hourHand);
    scene.add(this.minuteHand);
  }

  update(ang1, ang2) {
    const current_hour_angle = this.hourHand.rotation.z;
    const current_minute_angle = this.minuteHand.rotation.z;

    let rotationMatrix = new THREE.Matrix4();
    const axis = new THREE.Vector3(0, 0, 1); // Rotate around the Y axis

    rotationMatrix.makeRotationAxis(axis, ang1 - current_hour_angle);
    this.hourHand.applyMatrix4(rotationMatrix);

    rotationMatrix.makeRotationAxis(axis, ang2 - current_minute_angle);
    this.minuteHand.applyMatrix4(rotationMatrix);
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

const clock = new AnalogClock(scene);

camera.position.z = 5;
camera.lookAt(0, 0, 0);

function animate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60; // Convert to 12-hour format
  const hour_angle = -(hours * Math.PI) / 6; // 360 degrees / 12 hours = 30 degrees per hour
  const minute_angle = -(minutes * Math.PI) / 30; // 360 degrees / 60 minutes = 6 degrees per minute
  clock.update(hour_angle, minute_angle);

  renderer.render(scene, camera);
  stats.update();
}
