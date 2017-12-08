import * as THREE from 'three';
import {
  init,
  scene,
  camera,
  renderer,
} from './../initialize/init';
import {
  userControls,
} from './userControls';
import {
  moveComputerPaddle
} from './computerPaddle';
import {
  initCamera,
  resetCamera,
  demoCameraPivot,
} from './camera';
import {
  moveBall,
  xBallVelocity,
} from './ball';
import {
  moveOutline,
} from './outline';
import {
  checkPastNet,
  gameOverBool,
  pauseGame,
  startGame,
  computerPaddleSpeed,
  toggleMuteBool,
} from './game';
import {
  handleCollisions,
} from './collision';

export const renderContainer = () => {
  userControls();
  initCamera();

  addPlayButtonEventListener();
  addMuteButtonEventListener();

  animate();
};

export function animate() {
  requestAnimationFrame(animate);
  render();
  demoCameraPivot();
  checkPastNet();
  moveComputerPaddle(computerPaddleSpeed);
  handleCollisions();  
  moveBall();
  moveOutline();
}

export function render() {
  if (gameOverBool || pauseGame) return;
  renderer.render(scene, camera);
}

const addPlayButtonEventListener = () => {
  document.getElementById("play-button").onclick = () => {
    startGame();
    resetCamera();
    document.getElementById("play-button-text").classList.remove("blink-me");
  };
};

const addMuteButtonEventListener = () => {
  document.getElementById("mute-button").onclick = () => {
    toggleMuteBool();
  };
};