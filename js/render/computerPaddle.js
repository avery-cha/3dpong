import * as THREE from 'three';
import {
  sphere,
} from './../initialize/sphere';
import {
  computerPaddle1,
  computerPaddle2,
  demoPaddle1,
  demoPaddle2,
} from './../initialize/paddles';

export let demoPaddleSpeed = .25;

export const moveComputerPaddle = (paddleSpeed = demoPaddleSpeed) => {
  if (sphere.position.x > computerPaddle1.position.x && computerPaddle1.position.x < 6.5) {
    computerPaddle1.translateX(paddleSpeed);
    // computerPaddle2.translateX(paddleSpeed);
  }
  if (sphere.position.y > computerPaddle1.position.y && computerPaddle1.position.y < 3.5) {
    computerPaddle1.translateY(paddleSpeed);
    // computerPaddle2.translateY(paddleSpeed);
  }
  if (sphere.position.x < computerPaddle1.position.x && computerPaddle1.position.x > -6.5) {
    computerPaddle1.translateX(-paddleSpeed);
    // computerPaddle2.translateX(-paddleSpeed);
  }
  if (sphere.position.y < computerPaddle1.position.y && computerPaddle1.position.y > -3.5) {
    computerPaddle1.translateY(-paddleSpeed);
    // computerPaddle2.translateY(-paddleSpeed);
  }

  if (demoPaddle1) {
    if (sphere.position.x > demoPaddle1.position.x && demoPaddle1.position.x < 6.5) {
      demoPaddle1.translateX(paddleSpeed);
      // demoPaddle2.translateX(paddleSpeed);
    }
    if (sphere.position.y > demoPaddle1.position.y && demoPaddle1.position.y < 3.5) {
      demoPaddle1.translateY(paddleSpeed);
      // demoPaddle2.translateY(paddleSpeed);
    }
    if (sphere.position.x < demoPaddle1.position.x && demoPaddle1.position.x > -6.5) {
      demoPaddle1.translateX(-paddleSpeed);
      // demoPaddle2.translateX(-paddleSpeed);
    }
    if (sphere.position.y < demoPaddle1.position.y && demoPaddle1.position.y > -3.5) {
      demoPaddle1.translateY(-paddleSpeed);
      // demoPaddle2.translateY(-paddleSpeed);
    }
  }
};