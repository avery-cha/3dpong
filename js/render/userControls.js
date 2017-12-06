import * as THREE from 'three';
import {
  gameMode,
} from './render';
import {
  camera
} from './../initialize/init';
import {
  playerPaddle1,
  playerPaddle2,
} from './../initialize/paddles';

export const userControls = () => {
  // Code created with the help of Stack Overflow question
  // https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z
  // Question by Rob Evans:
  // https://stackoverflow.com/users/599020/rob-evans
  // Answer by WestLangley:
  // https://stackoverflow.com/users/1461008/westlangley

  let mouse = new THREE.Vector2();
  let vector = new THREE.Vector3();

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  let previousMousePos = [0, 0];
  let mouseSpeed = [0, 0];
  
  function onDocumentMouseMove(event) {
    if (gameMode === "play") {
      event.preventDefault();

      vector.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        (event.clientY / window.innerHeight) * 2 - 1,
        0.5
      );
      vector.unproject(camera);
      var dir = vector.sub(camera.position).normalize();
      var distance = (9.5 - camera.position.z) / dir.z;
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));

      playerPaddle1.position.set(
        pos.x, -pos.y, pos.z);
      playerPaddle2.position.set(
        pos.x, -pos.y, pos.z);

      // calculate mouse speed
      mouseSpeed = [
        event.clientX - previousMousePos[0],
        -(event.clientY - previousMousePos[1])
      ];
      previousMousePos = [
        event.clientX,
        event.clientY
      ];
      console.log("mouseSpeed", mouseSpeed);
    }
  }

  // ** Below code is to enable WASD keyboard control of the paddle **
  // let xSpeed = 2.25;
  // let ySpeed = 2.25;

  // document.addEventListener("keydown", onDocumentKeyDown, false);
  // function onDocumentKeyDown(event) {
  //   var keyCode = event.which;
  //   if (keyCode == 87) {
  //     playerPaddle1.position.y += ySpeed;
  //   } else if (keyCode == 83) {
  //     playerPaddle1.position.y -= ySpeed;
  //   } else if (keyCode == 65) {
  //     playerPaddle1.position.x -= xSpeed;
  //   } else if (keyCode == 68) {
  //     playerPaddle1.position.x += xSpeed;
  //   } else if (keyCode == 32) {
  //     playerPaddle1.position.set(0, 0, 0);
  //   }
  //   if (keyCode == 87) {
  //     playerPaddle2.position.y += ySpeed;
  //   } else if (keyCode == 83) {
  //     playerPaddle2.position.y -= ySpeed;
  //   } else if (keyCode == 65) {
  //     playerPaddle2.position.x -= xSpeed;
  //   } else if (keyCode == 68) {
  //     playerPaddle2.position.x += xSpeed;
  //   } else if (keyCode == 32) {
  //     playerPaddle2.position.set(0, 0, 0);
  //   }
  // };

};

