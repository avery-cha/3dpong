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
  checkPastNet,
  muteBool,
  gameOverBool,
  playerLives,
  computerLives,
  gameMode,
  pauseGame,
  startGame,
  computerPaddleSpeed,
  toggleMuteBool,
} from './game';

export const renderContainer = () => {
  userControls();
  initCamera();

  document.getElementById("play-button").onclick = () => {
    startGame();
    resetCamera();
  };

  document.getElementById("mute-button").onclick = () => {
    toggleMuteBool();
  };

  animate();
};

export function animate() {
  let xDirection;
  let yDirection;
  let xPaddleBallDiff;
  let yPaddleBallDiff;

  requestAnimationFrame(animate);
  render();

  demoCameraPivot();

  checkPastNet();
  moveComputerPaddle(computerPaddleSpeed);

  var originPoint = sphere.position.clone();
  for (var vertexIndex = 0; vertexIndex < sphere.geometry.vertices.length; vertexIndex++) {
    var localVertex = sphere.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4(sphere.matrix);
    var directionVector = globalVertex.sub(sphere.position);

    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    var xCollisionResults = ray.intersectObjects(xCollidableList);
    if (xCollisionResults.length > 0 && xCollisionResults[0].distance < directionVector.length()) {
      updateYBallVelocity(-yBallVelocity);
      if (!muteBool && !gameOverBool) document.getElementById("beep1").play();
    }

    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    var yCollisionResults = ray.intersectObjects(yCollidableList);
    if (yCollisionResults.length > 0 && yCollisionResults[0].distance < directionVector.length()) {
      updateXBallVelocity(-xBallVelocity);
      if (!muteBool && !gameOverBool) document.getElementById("beep1").play();
    }

    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    var zCollisionResults = ray.intersectObjects(zCollidableList);
    if (zCollisionResults.length > 0 && zCollisionResults[0].distance < directionVector.length()) {
      updateZBallVelocity(-zBallVelocity);
      if (!muteBool && !gameOverBool) document.getElementById("beep2").play();
      if (sphere.position.z > 0) {
        // player side
        if (gameMode === "demo") {
          xDirection = xBallVelocity === 0 ? 1 : xBallVelocity / Math.abs(xBallVelocity);
          xPaddleBallDiff = (demoPaddle1.position.x - sphere.position.x) / 1.5;
          let newXBallVelocity = xDirection * Math.abs(xPaddleBallDiff) * baseBallSpeed;
          updateXBallVelocity(newXBallVelocity);

          yDirection = yBallVelocity === 0 ? 1 : yBallVelocity / Math.abs(yBallVelocity);
          yPaddleBallDiff = (demoPaddle1.position.y - sphere.position.y);
          let newYBallVelocity = yDirection * Math.abs(yPaddleBallDiff) * baseBallSpeed;
          updateYBallVelocity(newYBallVelocity);

        }
        if (gameMode === "play") {
          xDirection = xBallVelocity === 0 ? 1 : xBallVelocity / Math.abs(xBallVelocity);
          xPaddleBallDiff = (playerPaddle1.position.x - sphere.position.x) / 1.5;
          let newXBallVelocity = xDirection * Math.abs(xPaddleBallDiff) * baseBallSpeed;
          updateXBallVelocity(newXBallVelocity);


          yDirection = yBallVelocity === 0 ? 1 : yBallVelocity / Math.abs(yBallVelocity);
          yPaddleBallDiff = (playerPaddle1.position.y - sphere.position.y);
          let newYBallVelocity = yDirection * Math.abs(yPaddleBallDiff) * baseBallSpeed;
          updateYBallVelocity(newYBallVelocity);
        }
        sphere.position.z = 8.7;

      } else if (sphere.position.z < 0) {
        // comp side
        xDirection = xBallVelocity === 0 ? 1 : xBallVelocity / Math.abs(xBallVelocity);
        xPaddleBallDiff = computerPaddle1.position.x - sphere.position.x;
        let newXBallVelocity = xDirection * Math.abs(xPaddleBallDiff) * baseBallSpeed * 1.1;
        updateXBallVelocity(newXBallVelocity);

        yDirection = yBallVelocity === 0 ? 1 : yBallVelocity / Math.abs(yBallVelocity);
        yPaddleBallDiff = computerPaddle1.position.y - sphere.position.y;
        let newYBallVelocity = yDirection * Math.abs(yPaddleBallDiff) * baseBallSpeed * 1.1;
        updateYBallVelocity(newYBallVelocity);

        sphere.position.z = -8.7;
      }
    }
  }

  moveBall();
  moveOutline();
}

export function render() {
  if (gameOverBool || pauseGame) return;
  renderer.render(scene, camera);
}