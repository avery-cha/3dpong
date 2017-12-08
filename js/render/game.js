import * as THREE from 'three';
import {
  scene,
} from './../initialize/init';
import {
  sphere,
} from './../initialize/sphere';
import {
  demoPaddle1,
  demoPaddle2,
} from './../initialize/paddles';
import {
  baseBallSpeed,
  resetBall,
  updateBallSpeed,
  updateXBallVelocity,
  updateYBallVelocity,
  xBallVelocity,
  yBallVelocity,
} from './ball';
import {
  render,
  animate,
} from './render';

export let playerLives = 3;
export let computerLives = 3;
export let muteBool = true;
export let pauseGame = false;
export let gameOverBool = false;
export let gameMode = 'demo';
export let computerPaddleSpeed;
export let level = 1;

export function checkPastNet() {
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

const blinkText = domElement => {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      domElement.style.visibility = domElement.style.visibility === 'hidden' ? "" : 'hidden';
    },
      200 * i);
  }
};

function nextLevel() {
  computerLives = 3;
  computerPaddleSpeed *= 1.1;
  updateBallSpeed(baseBallSpeed * 1.07);
  level += 1;
  document.getElementById("game-level").innerHTML = `Level ${level}`;
  blinkText(document.getElementById('game-level'));
}

function pauseGameOn() {
  pauseGame = true;
}

function pauseGameOff() {
  pauseGame = false;
  requestAnimationFrame(animate);
}

function gameOver() {
  gameOverBool = true;
  document.getElementById("game-over-message").classList.remove("hide");
  document.getElementById("play-button-text").classList.add("blink-me");

}

export function startGame() {
  document.getElementById("game-over-message").classList.add("hide");
  document.getElementById("game-level").innerHTML = `Level ${level}`;

  resetGame();
  gameMode = "play";
  scene.remove(demoPaddle1);
  scene.remove(demoPaddle2);
  requestAnimationFrame(animate);
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

export const toggleMuteBool = () => {
  muteBool = muteBool ? false : true;
};