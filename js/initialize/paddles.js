import * as THREE from 'three';
import {
  scene,
} from './init';
import {
  zCollidableList,
} from './walls';

export let playerPaddle1 = undefined;
export let playerPaddle2 = undefined;
export let computerPaddle1 = undefined;
export let computerPaddle2 = undefined;
export let demoPaddle1 = undefined;
export let demoPaddle2 = undefined;

export function initPaddle() {
  // ** Paddles **
  // var paddleGeometry = new THREE.PlaneGeometry(3, 2, 32, 32);
  // var playerPaddleMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ee, wireframe: true, transparent: true });

  // playerPaddle1 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  // playerPaddle1.translateX(1000);
  // playerPaddle1.translateZ(9.5);
  // scene.add(playerPaddle1);
  // zCollidableList.push(playerPaddle1);
  // playerPaddle2 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  // playerPaddle2.translateX(1000);
  // playerPaddle2.translateZ(9.5);
  // scene.add(playerPaddle2);
  
  // var computerPaddleMaterial = new THREE.MeshBasicMaterial({ color: 0xee0000, wireframe: true, transparent: true });
  // computerPaddle1 = new THREE.Mesh(paddleGeometry, computerPaddleMaterial);
  // computerPaddle1.translateZ(-9.5);
  // scene.add(computerPaddle1);
  // zCollidableList.push(computerPaddle1);
  // computerPaddle2 = new THREE.Mesh(paddleGeometry, computerPaddleMaterial);
  // computerPaddle2.translateZ(-9.5);
  // scene.add(computerPaddle2);
  
  // demoPaddle1 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  // demoPaddle1.translateZ(9.5);
  // scene.add(demoPaddle1);
  // zCollidableList.push(demoPaddle1);
  // demoPaddle2 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  // demoPaddle2.translateZ(9.5);
  // scene.add(demoPaddle2);

  // Creating paddles with cubes instead
  var paddleGeometry = new THREE.BoxGeometry(3, 2, 1, 16, 16);
  var playerPaddleMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ee, wireframe: true, transparent: true });

  playerPaddle1 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  playerPaddle1.translateX(1000);
  playerPaddle1.translateZ(10);
  scene.add(playerPaddle1);
  zCollidableList.push(playerPaddle1);
  playerPaddle2 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  playerPaddle2.translateX(1000);
  playerPaddle2.translateZ(10);
  scene.add(playerPaddle2);

  var computerPaddleMaterial = new THREE.MeshBasicMaterial({ color: 0xee0000, wireframe: true, transparent: true });
  computerPaddle1 = new THREE.Mesh(paddleGeometry, computerPaddleMaterial);
  computerPaddle1.translateZ(-10);
  scene.add(computerPaddle1);
  zCollidableList.push(computerPaddle1);
  computerPaddle2 = new THREE.Mesh(paddleGeometry, computerPaddleMaterial);
  computerPaddle2.translateZ(-10);
  scene.add(computerPaddle2);

  demoPaddle1 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  demoPaddle1.translateZ(10);
  scene.add(demoPaddle1);
  zCollidableList.push(demoPaddle1);
  demoPaddle2 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  demoPaddle2.translateZ(10);
  scene.add(demoPaddle2);

}