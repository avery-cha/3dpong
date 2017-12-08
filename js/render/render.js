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
  xCollidableList,
  yCollidableList,
  zCollidableList,
} from './../initialize/walls';
import {
  playerPaddle1,
  playerPaddle2,
  computerPaddle1,
  computerPaddle2,
  demoPaddle1,
  demoPaddle2,
} from './../initialize/paddles';
import {
  userControls,
} from './userControls';
import {
  demoPaddleSpeed,
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
  updateBallSpeed,
  updateXBallVelocity,
  updateYBallVelocity,
  updateZBallVelocity,
  baseBallSpeed,
  xBallVelocity,
  yBallVelocity,
  zBallVelocity,
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
    console.log("muting");
  };

  function checkPastNet() {
    if (playerLives > 0 && computerLives > 0 ) {
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
  
  function animate() {
    requestAnimationFrame(animate);
    render();

    demoCameraPivot();

    moveComputerPaddle(computerPaddleSpeed);
    checkPastNet();

    handleCollision();

    moveBall();
    moveOutline();
  }

  animate();
};

export function render() {
  if (gameOverBool || pauseGame) return;
  renderer.render(scene, camera);
}