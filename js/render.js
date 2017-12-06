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
  demoPaddle1,
  demoPaddle2,
} from './init';
import { setTimeout } from 'timers';

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

  // normal camera view
  camera.position.z = 18;

  // opponent camera view
  // camera.position.z = -18;
  // camera.rotation.y = 180 * Math.PI / 180


  // camera.rotation.y = 3.14159 / 2;
  // camera.lookAt(scene.sphere);

  var computerPaddleSpeed = 0.225;

  function moveComputerPaddle() {
    if (sphere.position.x > computerPaddle1.position.x && computerPaddle1.position.x < 6.5) {
      computerPaddle1.translateX(computerPaddleSpeed);
      computerPaddle2.translateX(computerPaddleSpeed);
    }
    if (sphere.position.y > computerPaddle1.position.y && computerPaddle1.position.y < 3.5) {
      computerPaddle1.translateY(computerPaddleSpeed);
      computerPaddle2.translateY(computerPaddleSpeed);
    }
    if (sphere.position.x < computerPaddle1.position.x && computerPaddle1.position.x > -6.5) {
      computerPaddle1.translateX(-computerPaddleSpeed);
      computerPaddle2.translateX(-computerPaddleSpeed);
    }
    if (sphere.position.y < computerPaddle1.position.y && computerPaddle1.position.y > -3.5) {
      computerPaddle1.translateY(-computerPaddleSpeed);
      computerPaddle2.translateY(-computerPaddleSpeed);
    }
    // if (sphere.position.x > computerPaddle1.position.x) {
    //   computerPaddle1.translateX(computerPaddleSpeed);
    //   computerPaddle2.translateX(computerPaddleSpeed);
    // }
    // if (sphere.position.y > computerPaddle1.position.y) {
    //   computerPaddle1.translateY(computerPaddleSpeed);
    //   computerPaddle2.translateY(computerPaddleSpeed);
    // }
    // if (sphere.position.x < computerPaddle1.position.x) {
    //   computerPaddle1.translateX(-computerPaddleSpeed);
    //   computerPaddle2.translateX(-computerPaddleSpeed);
    // }
    // if (sphere.position.y < computerPaddle1.position.y) {
    //   computerPaddle1.translateY(-computerPaddleSpeed);
    //   computerPaddle2.translateY(-computerPaddleSpeed);
    // }

    if (demoPaddle1 && demoPaddle2) {
      if (sphere.position.x > demoPaddle1.position.x& demoPaddle1.position.x < 6.5) {
        demoPaddle1.translateX(computerPaddleSpeed);
        demoPaddle2.translateX(computerPaddleSpeed);
      }
      if (sphere.position.y > demoPaddle1.position.y && demoPaddle1.position.y < 3.5) {
        demoPaddle1.translateY(computerPaddleSpeed);
        demoPaddle2.translateY(computerPaddleSpeed);
      }
      if (sphere.position.x < demoPaddle1.position.x && demoPaddle1.position.x > -6.5) {
        demoPaddle1.translateX(-computerPaddleSpeed);
        demoPaddle2.translateX(-computerPaddleSpeed);
      }
      if (sphere.position.y < demoPaddle1.position.y && demoPaddle1.position.y > -3.5) {
        demoPaddle1.translateY(-computerPaddleSpeed);
        demoPaddle2.translateY(-computerPaddleSpeed);
      }
    }
    // if (demoPaddle1 && demoPaddle2) {
    //   if (sphere.position.x > demoPaddle1.position.x) {
    //     demoPaddle1.translateX(computerPaddleSpeed);
    //     demoPaddle2.translateX(computerPaddleSpeed);
    //   }
    //   if (sphere.position.y > demoPaddle1.position.y) {
    //     demoPaddle1.translateY(computerPaddleSpeed);
    //     demoPaddle2.translateY(computerPaddleSpeed);
    //   }
    //   if (sphere.position.x < demoPaddle1.position.x) {
    //     demoPaddle1.translateX(-computerPaddleSpeed);
    //     demoPaddle2.translateX(-computerPaddleSpeed);
    //   }
    //   if (sphere.position.y < demoPaddle1.position.y) {
    //     demoPaddle1.translateY(-computerPaddleSpeed);
    //     demoPaddle2.translateY(-computerPaddleSpeed);
    //   }
    // }
  }

  // demo ball speed
  var baseBallSpeed = 0.2;
  var xBallVelocity = 0.25;
  var yBallVelocity = 0.25;
  var zBallVelocity = -0.25;

  function checkPastNet() {
    if (sphere.position.z < -13) {
      if (gameMode === "play") {
        decrementLife("computer");
      }
      resetBall("player");
    } else if (sphere.position.z > 13) {
      if (gameMode === "play") {
        decrementLife("player");
      }
      resetBall("computer");
    }
  }

  document.getElementById("play-button").onclick = () => {
    startGame();
    resetCamera();
  };

  function resetCamera() {
    camera_pivot.rotation.set( 0, 0, 0);
  }

  let playerLives = 3;
  let computerLives = 3;

  function decrementLife(player) {
    if (player === "computer") {
      computerLives = computerLives - 1;
      document.getElementById('comp-score').innerHTML = computerLives;
    } else if (player === "player") {
      if (playerLives > 0) {
        playerLives = playerLives - 1;
      }
      document.getElementById('player-score').innerHTML = playerLives;
    }
    if (playerLives <= 0) {
      gameOver();
    } else if (computerLives <= 0) {
      nextLevel();
    }
  }

  function nextLevel() {
    computerLives = 3;
    computerPaddleSpeed *= 1.085;
    baseBallSpeed *= 1.08;
    xBallVelocity *= 1.08;
    yBallVelocity *= 1.08;
    zBallVelocity *= 1.08;
  }

  let gameOverBool = false;
  function gameOver() {
    gameOverBool = true;
    // cancelAnimationFrame(id);
    document.getElementById("game-over-message").classList.remove("hide");
  }

  let gameMode = "demo";
  function startGame() {
    document.getElementById("game-over-message").classList.add("hide");
    resetGame();
    gameMode = "play";
    scene.remove(demoPaddle1);
    scene.remove(demoPaddle2);
    // scene.add(playerPaddle1);
    // scene.add(playerPaddle2);
    // playerPaddle1.position.set(0, 0, 9.5);
    // playerPaddle2.position.set(0, 0, 9.5);
    requestAnimationFrame(render);
  }

  function resetGame() {
    gameOverBool = false;
    playerLives = 3;
    computerLives = 3;
    computerPaddleSpeed = 0.165;
    baseBallSpeed = 0.2;
    xBallVelocity = 0.2;
    yBallVelocity = 0.2;
    zBallVelocity = -0.2;
    sphere.position.set(0, 0, 9.5);
    document.getElementById('comp-score').innerHTML = computerLives;
    document.getElementById('player-score').innerHTML = playerLives;
  }

  function resetBall(side) {
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
  }


  var camera_pivot = new THREE.Object3D();
  var Y_AXIS = new THREE.Vector3(0, 1, 0);

  // camera pivot
  scene.add(camera_pivot);
  camera_pivot.add(camera);
  camera.lookAt(camera_pivot.position);
  
  // camera.position.set(23, 0, 0);

  let id;
  let xDirection;
  let yDirection;
  let xPaddleBallDiff;
  let yPaddleBallDiff;
  function animate() {

    id = requestAnimationFrame(animate);
    render();
    // update();

    // camera pivot
    if (gameMode === "demo") {
      camera_pivot.rotateOnAxis(Y_AXIS, 0.01);
    }

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
        if (sphere.position.z > 0) {
          // player side
          if (gameMode === "demo") {
            xDirection = xBallVelocity / Math.abs(xBallVelocity);
            xPaddleBallDiff = (demoPaddle1.position.x - sphere.position.x) / 1.5;
            xBallVelocity = xDirection * Math.abs(xPaddleBallDiff) * baseBallSpeed * 1;
            
            yDirection = yBallVelocity / Math.abs(yBallVelocity);
            yPaddleBallDiff = (demoPaddle1.position.y - sphere.position.y);
            yBallVelocity = yDirection * Math.abs(yPaddleBallDiff) * baseBallSpeed * 1;
          }
          if (gameMode === "play") {
            xDirection = xBallVelocity / Math.abs(xBallVelocity);
            xPaddleBallDiff = (playerPaddle1.position.x - sphere.position.x) / 1.5;
            xBallVelocity = xDirection * Math.abs(xPaddleBallDiff) * baseBallSpeed * 1;

            yDirection = yBallVelocity / Math.abs(yBallVelocity);
            yPaddleBallDiff = (playerPaddle1.position.y - sphere.position.y);
            yBallVelocity = yDirection * Math.abs(yPaddleBallDiff) * baseBallSpeed * 1;
          }
        } else if (sphere.position.z < 0) {
          // comp side
          xDirection = xBallVelocity / Math.abs(xBallVelocity);
          xPaddleBallDiff = computerPaddle1.position.x - sphere.position.x;
          xBallVelocity = xDirection * Math.abs(xPaddleBallDiff) * baseBallSpeed * 1.1;

          yDirection = yBallVelocity / Math.abs(yBallVelocity);
          yPaddleBallDiff = computerPaddle1.position.y - sphere.position.y;
          yBallVelocity = yDirection * Math.abs(yPaddleBallDiff) * baseBallSpeed * 1.1;
        }
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
    if (gameOverBool) return;
    renderer.render(scene, camera);
  }

  // function update() {

  // }

  animate();
};