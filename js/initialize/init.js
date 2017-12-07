import * as THREE from 'three';
import initSphere from './sphere';
import {
  initWall,
  xCollidableList,
  yCollidableList,
  zCollidableList,
} from './walls';
import {
  initPaddle,
  playerPaddle1,
  playerPaddle2,
  computerPaddle1,
  computerPaddle2,
  demoPaddle1,
  demoPaddle2,
} from './paddles';
import {
  initOutline
} from './outline';

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
export const renderer = new THREE.WebGLRenderer();



export const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // ** Create Objects **
  initSphere();
  initWall();
  initPaddle();
  initOutline();
  // initNets();
};