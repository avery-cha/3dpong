import * as THREE from 'three';
import {
  scene,
} from './init';

export let topOutline;
export let bottomOutline;
export let rightOutline;
export let leftOutline;

export const initOutline = () => {
  var outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ee00, side: THREE.DoubleSide });

  var horizOutline = new THREE.PlaneGeometry(16, 0.6);
  var vertOutline = new THREE.PlaneGeometry(0.6, 9);

  topOutline = new THREE.Mesh(horizOutline, outlineMaterial);
  topOutline.translateY(4.5);
  topOutline.rotation.x = 3.14159 / 2;
  scene.add(topOutline);

  bottomOutline = new THREE.Mesh(horizOutline, outlineMaterial);
  bottomOutline.translateY(-4.5);
  bottomOutline.rotation.x = 3.14159 / 2;
  scene.add(bottomOutline);

  leftOutline = new THREE.Mesh(vertOutline, outlineMaterial);
  leftOutline.translateX(-8);
  leftOutline.rotation.y = 3.14159 / 2;
  scene.add(leftOutline);

  rightOutline = new THREE.Mesh(vertOutline, outlineMaterial);
  rightOutline.translateX(8);
  rightOutline.rotation.y = 3.14159 / 2;
  scene.add(rightOutline);
};