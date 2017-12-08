import * as THREE from 'three';
import {
  sphere,
} from './../initialize/sphere';

export let baseBallSpeed = 0.275;
export let xBallVelocity = 0.275;
export let yBallVelocity = 0.275;
export let zBallVelocity = 0.275;


export const resetBall = side => {
  if (side === "computer") {
    sphere.position.set(0, 0, -9.5);
    zBallVelocity = Math.abs(zBallVelocity);
  } else if (side === "player") {
    sphere.position.set(0, 0, 9.5);
    zBallVelocity = -Math.abs(zBallVelocity);
  }
  xBallVelocity = 0;
  yBallVelocity = 0;

  // resetInBounds();
};
  
  export const moveBall = () => {
    sphere.translateX(xBallVelocity);
    sphere.translateY(yBallVelocity);
    sphere.translateZ(zBallVelocity);

    // resetInBounds();
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
  yBallVelocity = newYBallVelocity;
}

export function updateZBallVelocity(newZBallVelocity) {
  zBallVelocity = newZBallVelocity;
}

export const resetInBounds = () => {
  if (sphere.position.x > 9) {
    sphere.position.set( 7, sphere.position.y, sphere.position.z);
  }
  if (sphere.position.x < -9) {
    sphere.position.set( -7, sphere.position.y, sphere.position.z);
  }
  if (sphere.position.y > 5) {
    sphere.position.set(sphere.position.x, 3.5, sphere.position.y);
  }
  if (sphere.position.y < -5) {
    sphere.position.set(sphere.position.x, -3.5, sphere.position.y);
  }

  xBallVelocity = xBallVelocity % 1;
  yBallVelocity = yBallVelocity % 1;
  zBallVelocity = zBallVelocity % 1;
};