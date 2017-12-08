import * as THREE from 'three';
import {
  sphere,
} from './../initialize/sphere';
import {
  xCollidableList,
  yCollidableList,
  zCollidableList,
} from './../initialize/walls';
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
  gameMode,
  muteBool,
  gameOverBool,
} from './game';
import {
  mouseSpeed,
} from './userControls';

export let xCurve = 1;
export let yCurve = 1;

export const handleCollision = () => {
  let xDirection;
  let yDirection;
  let xPaddleBallDiff;
  let yPaddleBallDiff;

  var originPoint = sphere.position.clone();
  for (var vertexIndex = 0; vertexIndex < sphere.geometry.vertices.length; vertexIndex++) {
    var localVertex = sphere.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4(sphere.matrix);
    var directionVector = globalVertex.sub(sphere.position);

    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    var xCollisionResults = ray.intersectObjects(xCollidableList);
    if (xCollisionResults.length > 0 && xCollisionResults[0].distance < directionVector.length()) {
      xCurve = 1;
      yCurve = 1;
      updateYBallVelocity(-yBallVelocity);
      if (!muteBool && !gameOverBool) document.getElementById("beep1").play();
    }

    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    var yCollisionResults = ray.intersectObjects(yCollidableList);
    if (yCollisionResults.length > 0 && yCollisionResults[0].distance < directionVector.length()) {
      xCurve = 1;
      yCurve = 1;
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

          if ( mouseSpeed[0] <= 300 ) {
            xCurve = 1;
          } else {
            xCurve = mouseSpeed[0] / 300;
          }


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
};