import * as THREE from 'three';
import {
  sphere,
} from './../initialize/sphere';
// import {
//   baseBallSpeed,
//   xBallVelocity,
//   yBallVelocity,
//   zBallVelocity,
// } from './render';


export let baseBallSpeed = 0.2;
export let xBallVelocity = 0.2;
export let yBallVelocity = 0.2;
export let zBallVelocity = 0.2;


export const resetBall = side => {
  // setTimeout(() => {
  if (side === "computer") {
    sphere.position.set(0, 0, -9);
    zBallVelocity = Math.abs(zBallVelocity);
  } else if (side === "player") {
    sphere.position.set(0, 0, 9);
    zBallVelocity = -Math.abs(zBallVelocity);
  }
  xBallVelocity = baseBallSpeed;
  yBallVelocity = baseBallSpeed;
      // zBallVelocity = -baseBallSpeed;
    // }, 1000);
    // pauseGameOn();
    // setTimeout(pauseGameOff, 1000);
};

export const moveBall = () => {
  sphere.translateX(xBallVelocity);
  sphere.translateY(yBallVelocity);
  sphere.translateZ(zBallVelocity);
};

export function updateBallSpeed(newBaseBallSpeed) {
  baseBallSpeed = newBaseBallSpeed;
  xBallVelocity = baseBallSpeed;
  yBallVelocity = baseBallSpeed;
  zBallVelocity = baseBallSpeed;
}

export function updateXBallVelocity(newXBallVelocity) {
  xBallVelocity = newXBallVelocity;
}

export function updateYBallVelocity(newYBallVelocity) {
  if (newYBallVelocity === -0) {
    yBallVelocity = 0;
  } else {
    yBallVelocity = newYBallVelocity;
  }

}

export function updateZBallVelocity(newZBallVelocity) {
  zBallVelocity = newZBallVelocity;
}