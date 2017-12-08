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
  playerPaddle1,
  playerPaddle2,
  computerPaddle1,
  computerPaddle2,
  demoPaddle1,
  demoPaddle2,
} from './../initialize/paddles';
import {
  render
} from './render';

export let gameMode = 'demo';
export let muteBool = true;
export let gameOverBool = false;
export let pauseGame = false;
export let computerPaddleSpeed;
let level = 1;
export let playerLives = 3;
export let computerLives = 3;




export function pauseGameOn() {
  pauseGame = true;
}

export function pauseGameOff() {
  pauseGame = false;
  requestAnimationFrame(render);
}


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

export function startGame() {
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


export function decrementLife(player) {
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

export const toggleMuteBool = () => {
  muteBool = muteBool ? false : true;
};