import * as THREE from 'three';
import {
  scene,
} from './init';

export const xCollidableList = [];
export const yCollidableList = [];
export const zCollidableList = [];

export function initWall() {
  // ** Walls **
  // var planeGeometry = new THREE.PlaneGeometry(20.25, 20.25, 32, 32);
  // var planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide });
  var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true });

  var horizPlaneGeometry = new THREE.PlaneGeometry(16, 20, 24, 30);
  var vertPlaneGeometry = new THREE.PlaneGeometry(20, 9, 30, 14);

  var rightPlane = new THREE.Mesh(vertPlaneGeometry, planeMaterial);
  rightPlane.translateX(8);
  rightPlane.translateZ(0);
  rightPlane.rotation.y = 3.14159 / 2;
  scene.add(rightPlane);
  yCollidableList.push(rightPlane);
  var rightPlane = new THREE.Mesh(vertPlaneGeometry, planeMaterial);
  rightPlane.translateX(8);
  rightPlane.translateZ(0);
  rightPlane.rotation.y = 3.14159 / 2;
  scene.add(rightPlane);

  var leftPlane = new THREE.Mesh(vertPlaneGeometry, planeMaterial);
  leftPlane.translateX(-8);
  leftPlane.translateZ(0);
  leftPlane.rotation.y = 3.14159 / 2;
  scene.add(leftPlane);
  yCollidableList.push(leftPlane);
  var leftPlane = new THREE.Mesh(vertPlaneGeometry, planeMaterial);
  leftPlane.translateX(-8);
  leftPlane.translateZ(0);
  leftPlane.rotation.y = 3.14159 / 2;
  scene.add(leftPlane);

  var topPlane = new THREE.Mesh(horizPlaneGeometry, planeMaterial);
  topPlane.translateY(4.5);
  topPlane.rotation.x = 3.14159 / 2;
  scene.add(topPlane);
  xCollidableList.push(topPlane);
  var topPlane = new THREE.Mesh(horizPlaneGeometry, planeMaterial);
  topPlane.translateY(4.5);
  topPlane.rotation.x = 3.14159 / 2;
  scene.add(topPlane);

  var bottomPlane = new THREE.Mesh(horizPlaneGeometry, planeMaterial);
  bottomPlane.translateY(-4.5);
  bottomPlane.rotation.x = 3.14159 / 2;
  scene.add(bottomPlane);
  xCollidableList.push(bottomPlane);
  var bottomPlane = new THREE.Mesh(horizPlaneGeometry, planeMaterial);
  bottomPlane.translateY(4.5);
  bottomPlane.rotation.x = 3.14159 / 2;
  scene.add(bottomPlane);

    // var backPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    // backPlane.translateZ( -10 );
    // scene.add(backPlane);
    // zCollidableList.push(backPlane);
    // var backPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    // backPlane.translateZ( -10 );
    // scene.add(backPlane);

    // var frontPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    // frontPlane.translateZ( 10 );
    // scene.add(frontPlane);
    // zCollidableList.push(frontPlane);
    // var frontPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    // frontPlane.translateZ( 10 );
    // scene.add(frontPlane);
}