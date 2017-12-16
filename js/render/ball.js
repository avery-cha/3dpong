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


    resetInBounds();
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
  if (sphere.position.x > 10 || 
      sphere.position.x < -10 ||
      sphere.position.y > 6.5 ||
      sphere.position.y < -6.5
    ) {
      sphere.position.set( 0, 0, sphere.position.z);
      xBallVelocity = 0;
      yBallVelocity = 0;
  }
  // if (sphere.position.x < -10) {
  //   sphere.position.set( 0, sphere.position.y, sphere.position.z);
  //   xBallVelocity = 0;
  //   yBallVelocity = 0;
  // }
  // if (sphere.position.y > 6.5) {
  //   sphere.position.set(sphere.position.x, 0, sphere.position.y);
  //   xBallVelocity = 0;
  //   yBallVelocity = 0;
  // }
  // if (sphere.position.y < -6.5) {
  //   sphere.position.set(sphere.position.x, 0, sphere.position.y);
  //   xBallVelocity = 0;
  //   yBallVelocity = 0;
  // }

  // xBallVelocity = 0;
  // yBallVelocity = 0;
};