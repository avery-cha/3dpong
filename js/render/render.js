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
  resetBall,
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
  muteBool,
  gameOverBool,
  gameMode,
  pauseGame,
  pauseGameOn,
  playerLives,
  computerLives,
  decrementLife,
  pauseGameOff,
  computerPaddleSpeed,
  toggleMuteBool,
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

function checkPastNet() {
  if (playerLives > 0 && computerLives > 0) {
    if (sphere.position.z <= -11) {
      if (!muteBool && !gameOverBool) document.getElementById("beep5").play();
      if (gameMode === "play" && pauseGame === false && gameOverBool === false) {
        decrementLife("computer");
      }
      resetBall("computer");
      pauseGameOn();
      setTimeout(pauseGameOff, 1000);
    } else if (sphere.position.z >= 11) {
      if (!muteBool && !gameOverBool) document.getElementById("shut-down2").play();

      if (gameMode === "play" && pauseGame === false && gameOverBool === false) {
        decrementLife("player");
      }
      resetBall("player");
      pauseGameOn();
      setTimeout(pauseGameOff, 1000);
    }
  }
}