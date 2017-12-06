import * as THREE from 'three';
import {
  scene,
  camera,
} from './../initialize/init';
import {
  gameMode,
} from './render';

export let camera_pivot;
export let Y_AXIS;

export const initCamera = () => {
  // normal camera view
  camera.position.z = 18;

  // opponent camera view
  // camera.position.z = -18;
  // camera.rotation.y = 180 * Math.PI / 180


  // camera.rotation.y = 3.14159 / 2;
  // camera.lookAt(scene.sphere);

  camera_pivot = new THREE.Object3D();
  Y_AXIS = new THREE.Vector3(0, 1, 0);

  // camera pivot
  scene.add(camera_pivot);
  camera_pivot.add(camera);
  camera.lookAt(camera_pivot.position);
};

export const resetCamera = () => {
  camera_pivot.rotation.set(0, 0, 0);
};

export const demoCameraPivot = () => {
  if (gameMode === "demo") {
    camera_pivot.rotateOnAxis(Y_AXIS, 0.01);
  }
};