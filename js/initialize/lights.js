import * as THREE from 'three';
import {
  scene,
} from './init';

export const initLight = () => {
  var light1 = new THREE.PointLight(0xffffff, 3, 30);
  light1.position.set(0, 5, 14);
  scene.add(light1);

  var light2 = new THREE.PointLight(0xffffff, 3, 30);
  light2.position.set(0, 5, -14);
  scene.add(light2);
};