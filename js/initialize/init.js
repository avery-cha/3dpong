import * as THREE from 'three';
import initSphere from './sphere';

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
export const renderer = new THREE.WebGLRenderer();
export const xCollidableList = [];
export const yCollidableList = [];
export const zCollidableList = [];
export let playerPaddle1 = undefined;
export let playerPaddle2 = undefined;
export let computerPaddle1 = undefined;
export let computerPaddle2 = undefined;
export let demoPaddle1 = undefined;
export let demoPaddle2 = undefined;

export const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // ** Create Objects **
  initSphere();

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


  // ** Paddles **
  var paddleGeometry = new THREE.PlaneGeometry(3, 2, 32, 32);
  var playerPaddleMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ee, wireframe: true, transparent: true });

  playerPaddle1 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  playerPaddle1.translateX(1000);
  playerPaddle1.translateZ(9.5);
  scene.add(playerPaddle1);
  zCollidableList.push(playerPaddle1);
  playerPaddle2 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  playerPaddle2.translateX(1000);
  playerPaddle2.translateZ(9.5);
  scene.add(playerPaddle2);

  var computerPaddleMaterial = new THREE.MeshBasicMaterial({ color: 0xee0000, wireframe: true, transparent: true });
  computerPaddle1 = new THREE.Mesh(paddleGeometry, computerPaddleMaterial);
  computerPaddle1.translateZ(-9.5);
  scene.add(computerPaddle1);
  zCollidableList.push(computerPaddle1);
  computerPaddle2 = new THREE.Mesh(paddleGeometry, computerPaddleMaterial);
  computerPaddle2.translateZ(-9.5);
  scene.add(computerPaddle2);
  
  demoPaddle1 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  demoPaddle1.translateZ(9.5);
  scene.add(demoPaddle1);
  zCollidableList.push(demoPaddle1);
  demoPaddle2 = new THREE.Mesh(paddleGeometry, playerPaddleMaterial);
  demoPaddle2.translateZ(9.5);
  scene.add(demoPaddle2);

  // ** Create 'nets' behind player paddles **
  // var vertNetGeometry = new THREE.PlaneGeometry(7, 9, 7, 9);
  // var horizNetGeometry = new THREE.PlaneGeometry(16, 7, 16, 7);
  // var netMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true, transparent: true });

  // var rightPlayerNet = new THREE.Mesh(vertNetGeometry, netMaterial);
  // rightPlayerNet.translateX(8);
  // rightPlayerNet.translateZ(13.5);
  // rightPlayerNet.rotation.y = 3.14159 / 2;
  // scene.add(rightPlayerNet);
  // netCollidableList.push(rightPlayerNet);
  // var rightPlayerNet = new THREE.Mesh(vertNetGeometry, netMaterial);
  // rightPlayerNet.translateX(8);
  // rightPlayerNet.translateZ(13.5);
  // rightPlayerNet.rotation.y = 3.14159 / 2;
  // scene.add(rightPlayerNet);

  // var leftPlayerNet = new THREE.Mesh(vertNetGeometry, netMaterial);
  // leftPlayerNet.translateX(-8);
  // leftPlayerNet.translateZ(0);
  // leftPlayerNet.rotation.y = 3.14159 / 2;
  // scene.add(leftPlayerNet);
  // yCollidableList.push(leftPlayerNet);
  // var leftPlayerNet = new THREE.Mesh(vertNetGeometry, netMaterial);
  // leftPlayerNet.translateX(-8);
  // leftPlayerNet.translateZ(0);
  // leftPlayerNet.rotation.y = 3.14159 / 2;
  // scene.add(leftPlayerNet);

  // var topPlayerNet = new THREE.Mesh(horizNetGeometry, netMaterial);
  // topPlayerNet.translateY(4.5);
  // topPlayerNet.rotation.x = 3.14159 / 2;
  // scene.add(topPlayerNet);
  // xCollidableList.push(topPlayerNet);
  // var topPlayerNet = new THREE.Mesh(horizNetGeometry, netMaterial);
  // topPlayerNet.translateY(4.5);
  // topPlayerNet.rotation.x = 3.14159 / 2;
  // scene.add(topPlayerNet);

  // var bottomPlayerNet = new THREE.Mesh(horizNetGeometry, netMaterial);
  // bottomPlayerNet.translateY(-4.5);
  // bottomPlayerNet.rotation.x = 3.14159 / 2;
  // scene.add(bottomPlayerNet);
  // xCollidableList.push(bottomPlayerNet);
  // var bottomPlayerNet = new THREE.Mesh(horizNetGeometry, netMaterial);
  // bottomPlayerNet.translateY(4.5);
  // bottomPlayerNet.rotation.x = 3.14159 / 2;
  // scene.add(bottomPlayerNet);

  // var backPlane = new THREE.Mesh(planeGeometry, planeMaterial);
  // backPlane.translateZ( -10 );
  // scene.add(backPlane);
  // zCollidableList.push(backPlane);
  // var backPlane = new THREE.Mesh(planeGeometry, planeMaterial);
  // backPlane.translateZ( -10 );
  // scene.add(backPlane);


  // var netGeometry = new THREE.PlaneGeometry(60, 60, 60, 120);
  // var playerNet = new THREE.Mesh(netGeometry, netMaterial)
  // playerNet.translateZ(24);
  // scene.add(playerNet);
  // netCollidableList.push(playerNet);
  // var playerNet = new THREE.Mesh(netGeometry, netMaterial);
  // playerNet.translateZ(24);
  // scene.add(playerNet);

  // var netGeometry = new THREE.PlaneGeometry(60, 60, 60, 120);
  // var netMaterial = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true, transparent: true });
  // var computerNet = new THREE.Mesh(netGeometry, netMaterial)
  // computerNet.translateZ(-24);
  // scene.add(computerNet);
  // netCollidableList.push(computerNet);
  // var computerNet = new THREE.Mesh(netGeometry, netMaterial);
  // computerNet.translateZ(-24);
  // scene.add(computerNet);
};