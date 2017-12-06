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