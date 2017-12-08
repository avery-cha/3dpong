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

export let gameMode = 'demo';
export let muteBool = true;
export let gameOverBool = false;

export const renderContainer = () => {
  userControls();
  initCamera();

  let pauseGame = false;

  function pauseGameOn() {
    pauseGame = true;
  }

  function pauseGameOff() {
    pauseGame = false;
    requestAnimationFrame(render);
  }

  document.getElementById("play-button").onclick = () => {
    startGame();
    resetCamera();
    document.getElementById("play-button-text").classList.remove("blink-me");
  };

  document.getElementById("mute-button").onclick = () => {
    muteBool = muteBool ? false : true;
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

  const blinkText = domElement => {
    for (let i = 0; i < 8; i++) {
      setTimeout( () => {
        domElement.style.visibility = domElement.style.visibility === 'hidden' ? "" : 'hidden';
      },
      200 * i);
      }
  };

  let playerLives = 3;
  let computerLives = 3;

  function decrementLife(player) {
    if (player === "computer") {
      computerLives = computerLives - 1;
      document.getElementById('comp-score').innerHTML = computerLives;
      blinkText(document.getElementById('comp-score'));
    } else if (player === "player") {
      if (playerLives > 0) {
        playerLives = playerLives - 1;
      }
      document.getElementById('player-score').innerHTML = playerLives;
      blinkText(document.getElementById('player-score'));
    }

    if (playerLives <= 0) {
      gameOver();
    } else if (computerLives <= 0) {
      nextLevel();
    }
  }

  let computerPaddleSpeed;

  function nextLevel() {
    computerLives = 3;
    computerPaddleSpeed *= 1.1;
    updateBallSpeed(baseBallSpeed * 1.07);
    level += 1;
    document.getElementById("game-level").innerHTML = `Level ${level}`;
    blinkText(document.getElementById('game-level'));
  }

  function gameOver() {
    gameOverBool = true;
    document.getElementById("game-over-message").classList.remove("hide");
    document.getElementById("play-button-text").classList.add("blink-me");
  }
  
  let level = 1;
  gameMode = "demo";
  function startGame() {
    document.getElementById("game-over-message").classList.add("hide");
    document.getElementById("game-level").innerHTML = `Level ${level}`;
    
    resetGame();
    gameMode = "play";
    scene.remove(demoPaddle1);
    scene.remove(demoPaddle2);
    requestAnimationFrame(render);
  }

  function resetGame() {
    gameOverBool = false;
    playerLives = 3;
    computerLives = 3;
    computerPaddleSpeed = 0.15;
    updateBallSpeed(0.2);
    updateXBallVelocity(0.02);
    updateYBallVelocity(0.02);
    level = 1;
    sphere.position.set(0, 0, 9);
    document.getElementById('comp-score').innerHTML = computerLives;
    document.getElementById('player-score').innerHTML = playerLives;
    document.getElementById("game-level").innerHTML = `Level ${level}`;
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

  function render() {
    if (gameOverBool || pauseGame) return;
    renderer.render(scene, camera);
  }

  animate();
};