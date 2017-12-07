import * as THREE from 'three';
import {
  scene,
} from './init';

export const initLight = () => {
  var light1 = new THREE.PointLight(0xffffff, 2, 30);
  light1.position.set(0, 0, 14);
  scene.add(light1);

  var light2 = new THREE.PointLight(0xffffff, 2, 30);
  light2.position.set(0, 0, -14);
  scene.add(light2);
};