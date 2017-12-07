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
    console.log("reset on comp side");
  } else if (side === "player") {
    sphere.position.set(0, 0, 9);
    zBallVelocity = -Math.abs(zBallVelocity);
    console.log("reset on hooman side");
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
  // if (newBaseBallSpeed > 2) debugger;

  baseBallSpeed = newBaseBallSpeed;
  xBallVelocity = baseBallSpeed;
  yBallVelocity = baseBallSpeed;
  zBallVelocity = -baseBallSpeed;
}

export function updateXBallVelocity(newXBallVelocity) {
  // if (newXBallVelocity > 2) debugger;
  xBallVelocity = newXBallVelocity;
}

export function updateYBallVelocity(newYBallVelocity) {
  // if (newYBallVelocity > 2) debugger;

  // if (newYBallVelocity === -0) {
    yBallVelocity = 0;
  // } else {
    yBallVelocity = newYBallVelocity;
  // }
}

export function updateZBallVelocity(newZBallVelocity) {
  // if (newZBallVelocity > 2) debugger;

  zBallVelocity = newZBallVelocity;
}