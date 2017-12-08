import * as THREE from 'three';
import {
  scene,
} from './init';

export const xCollidableList = [];
export const yCollidableList = [];
export const zCollidableList = [];

export function initWall() {
  var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true });

  var horizPlaneGeometry = new THREE.BoxGeometry(18, 21, 1, 17, 20);
  var vertPlaneGeometry = new THREE.BoxGeometry(21, 11, 1, 20, 10);

  var rightPlane = new THREE.Mesh(vertPlaneGeometry, planeMaterial);
  rightPlane.translateX(8.5);
  rightPlane.translateZ(0);
  rightPlane.rotation.y = 3.14159 / 2;
  scene.add(rightPlane);
  yCollidableList.push(rightPlane);
  var rightPlane = new THREE.Mesh(vertPlaneGeometry, planeMaterial);
  rightPlane.translateX(8.5);
  rightPlane.translateZ(0);
  rightPlane.rotation.y = 3.14159 / 2;
  scene.add(rightPlane);

  var leftPlane = new THREE.Mesh(vertPlaneGeometry, planeMaterial);
  leftPlane.translateX(-8.5);
  leftPlane.translateZ(0);
  leftPlane.rotation.y = 3.14159 / 2;
  scene.add(leftPlane);
  yCollidableList.push(leftPlane);
  var leftPlane = new THREE.Mesh(vertPlaneGeometry, planeMaterial);
  leftPlane.translateX(-8.5);
  leftPlane.translateZ(0);
  leftPlane.rotation.y = 3.14159 / 2;
  scene.add(leftPlane);

  var topPlane = new THREE.Mesh(horizPlaneGeometry, planeMaterial);
  topPlane.translateY(5);
  topPlane.rotation.x = 3.14159 / 2;
  scene.add(topPlane);
  xCollidableList.push(topPlane);
  var topPlane = new THREE.Mesh(horizPlaneGeometry, planeMaterial);
  topPlane.translateY(5);
  topPlane.rotation.x = 3.14159 / 2;
  scene.add(topPlane);

  var bottomPlane = new THREE.Mesh(horizPlaneGeometry, planeMaterial);
  bottomPlane.translateY(-5);
  bottomPlane.rotation.x = 3.14159 / 2;
  scene.add(bottomPlane);
  xCollidableList.push(bottomPlane);
  var bottomPlane = new THREE.Mesh(horizPlaneGeometry, planeMaterial);
  bottomPlane.translateY(5);
  bottomPlane.rotation.x = 3.14159 / 2;
  scene.add(bottomPlane);
}