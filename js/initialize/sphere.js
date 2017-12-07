import * as THREE from 'three';
import {
  scene,
} from './init';

export let sphere;

export default function initSphere() {
  let sphereGeometry = new THREE.SphereGeometry(0.8, 8, 6);
  // let sphereMaterial = new THREE.MeshMaterial({ color: 0x00ff00 });
  let sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  scene.add(sphere);
}