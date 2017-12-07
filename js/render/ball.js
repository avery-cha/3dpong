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


export let baseBallSpeed = 0.275;
export let xBallVelocity = 0.275;
export let yBallVelocity = 0.275;
export let zBallVelocity = 0.275;


export const resetBall = side => {
  if (side === "computer") {
    sphere.position.set(0, 0, -9);
    zBallVelocity = Math.abs(zBallVelocity);
  } else if (side === "player") {
    sphere.position.set(0, 0, 9);
    zBallVelocity = -Math.abs(zBallVelocity);
  }
  xBallVelocity = 0;
  yBallVelocity = 0;
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
  zBallVelocity = -baseBallSpeed;
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