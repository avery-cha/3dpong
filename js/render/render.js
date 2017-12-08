import * as THREE from 'three';
import {
  init,
  scene,
  camera,
  renderer,
} from './../initialize/init';
import {
  sphere,
} from './../initialize/sphere';
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
} from './ball';
import {
  moveOutline,
} from './outline';
import {
  handleCollision,
} from './collision';
import {
  startGame,
  gameOverBool,
  pauseGame,
  playerLives,
  computerPaddleSpeed,
  toggleMuteBool,
  checkPastNet,
} from './game';

export const renderContainer = () => {
  userControls();
  initCamera();

  document.getElementById("play-button").onclick = () => {
    startGame();
    resetCamera();
    document.getElementById("play-button-text").classList.remove("blink-me");
  };

  document.getElementById("mute-button").onclick = () => {
    toggleMuteBool();
  };

  animate();
};

export function animate() {
  requestAnimationFrame(animate);
  render();
  demoCameraPivot();
  moveComputerPaddle(computerPaddleSpeed);
  checkPastNet();
  handleCollision();
  moveBall();
  moveOutline();
}

export function render() {
  if (gameOverBool || pauseGame) return;
  renderer.render(scene, camera);
}

