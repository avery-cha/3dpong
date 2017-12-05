import * as THREE from 'three';
import {
  init,
  scene,
  camera,
  renderer,
  sphere,
  xCollidableList,
  yCollidableList,
  zCollidableList,
  playerPaddle1,
  playerPaddle2,
  computerPaddle1,
  computerPaddle2,
} from './init';

export const renderContainer = () => {
  // ** Below code is to enable mouse control of the paddle **
  // Code created with the help of Stack Overflow question
  // https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z
  // Question by Rob Evans:
  // https://stackoverflow.com/users/599020/rob-evans
  // Answer by WestLangley:
  // https://stackoverflow.com/users/1461008/westlangley

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var vector = new THREE.Vector3();

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  function onDocumentMouseMove(event) {
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


  camera.position.z = 18;
  // camera.position.z = -18;
  // camera.rotation.y = 180 * Math.PI / 180


  // camera.rotation.y = 3.14159 / 2;
  // camera.lookAt(scene.sphere);

  var computerPaddleXSpeed = 0.15;
  var computerPaddleYSpeed = 0.15;

  function moveComputerPaddle() {
    if (sphere.position.x > computerPaddle1.position.x) {
      computerPaddle1.translateX(computerPaddleXSpeed);
      computerPaddle2.translateX(computerPaddleXSpeed);
    }
    if (sphere.position.y > computerPaddle1.position.y) {
      computerPaddle1.translateY(computerPaddleYSpeed);
      computerPaddle2.translateY(computerPaddleYSpeed);
    }
    if (sphere.position.x < computerPaddle1.position.x) {
      computerPaddle1.translateX(-computerPaddleXSpeed);
      computerPaddle2.translateX(-computerPaddleXSpeed);
    }
    if (sphere.position.y < computerPaddle1.position.y) {
      computerPaddle1.translateY(-computerPaddleYSpeed);
      computerPaddle2.translateY(-computerPaddleYSpeed);
    }

  }

  var xBallVelocity = 0.2;
  var yBallVelocity = 0.2;
  var zBallVelocity = -0.2;
  // debugger;

  function checkPastNet() {
    if (sphere.position.z > 13) {
      incrementPoint("computer");
      resetBall("computer");
    } else if (sphere.position.z < -13) {
      incrementPoint("player");
      resetBall("player");
    }
  }

  let playerPoints = 0;
  let computerPoints = 0;

  function incrementPoint(player) {
    if (player === "computer") {
      computerPoints = computerPoints + 1;
      document.getElementById('comp-score').innerHTML = computerPoints;
    } else if (player === "player") {
      playerPoints = playerPoints + 1;
      document.getElementById('player-score').innerHTML = playerPoints;
    }
    // if (playerPoints >= 10) {
    //   gameOver("player");
    // } else if (computerPoints >= 10) {
    //   gameOver("computer");
    // }
  }

  function resetBall(side) {
    if (side === "computer") {
      sphere.position.set(0, 0, -9.5);
      zBallVelocity = Math.abs(zBallVelocity);
    } else if (side === "player") {
      sphere.position.set(0, 0, 9.5);
      zBallVelocity = -Math.abs(zBallVelocity);
    }
  }

  function animate() {

    requestAnimationFrame(animate);
    render();
    // update();

    moveComputerPaddle();
    checkPastNet();

    var originPoint = sphere.position.clone();
    for (var vertexIndex = 0; vertexIndex < sphere.geometry.vertices.length; vertexIndex++) {
      var localVertex = sphere.geometry.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4(sphere.matrix);
      var directionVector = globalVertex.sub(sphere.position);

      var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      var xCollisionResults = ray.intersectObjects(xCollidableList);
      if (xCollisionResults.length > 0 && xCollisionResults[0].distance < directionVector.length()) {
        yBallVelocity = -yBallVelocity;
      }

      var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      var yCollisionResults = ray.intersectObjects(yCollidableList);
      if (yCollisionResults.length > 0 && yCollisionResults[0].distance < directionVector.length()) {
        xBallVelocity = -xBallVelocity;
      }

      var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      var zCollisionResults = ray.intersectObjects(zCollidableList);
      if (zCollisionResults.length > 0 && zCollisionResults[0].distance < directionVector.length()) {
        zBallVelocity = -zBallVelocity;
      }

      // var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      // var netCollisionResults = ray.intersectObjects(netCollidableList);
      // if (netCollisionResults.length > 0 && netCollisionResults[0].distance < directionVector.length()) {
      //   zBallVelocity = -zBallVelocity;
      //   // scene.remove( sphere );
      //   sphere.position.set(0, 0, 0)
      //   // sphere.translateX(0);
      //   // sphere.translateY(0);
      //   // sphere.translateZ(0);
      //   // scene.add( sphere );
      // }
    }

    sphere.translateX(xBallVelocity);
    sphere.translateY(yBallVelocity);
    sphere.translateZ(zBallVelocity);
  }

  function render() {
    renderer.render(scene, camera);
  }

  // function update() {

  // }

  animate();
}