import * as THREE from 'three';
import {
  init,
  scene,
  camera,
  renderer,
} from './../initialize/init';
import {
  sphere,
} from './../initialize/sphere';
import {
  xCollidableList,
  yCollidableList,
  zCollidableList,
} from './../initialize/walls';
import {
  playerPaddle1,
  playerPaddle2,
  computerPaddle1,
  computerPaddle2,
  demoPaddle1,
  demoPaddle2,
} from './../initialize/paddles';
import {
  userControls,
} from './userControls';
import {
  demoPaddleSpeed,
  moveComputerPaddle
} from './computerPaddle';
import {
  initCamera,
  resetCamera,
  demoCameraPivot,
} from './camera';
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
  moveOutline,
} from './outline';
// import {
// for game por
// }

export let gameMode;

export const renderContainer = () => {

  let muteBool = true;

  userControls();
  initCamera();

  let pauseGame = false;

  function pauseGameOn() {
    pauseGame = true;
  }

  function pauseGameOff() {
    pauseGame = false;
    requestAnimationFrame(render);
  }

  document.getElementById("play-button").onclick = () => {
    startGame();
    resetCamera();
    document.getElementById("play-button-text").classList.remove("blink-me");
  };

  document.getElementById("mute-button").onclick = () => {
    muteBool = muteBool ? false : true;
  };

  function checkPastNet() {
    if (playerLives > 0 && computerLives > 0 ) {
      if (sphere.position.z <= -11) {
        if (!muteBool && !gameOverBool) document.getElementById("beep5").play();
        if (gameMode === "play" && pauseGame === false && gameOverBool === false) {
          decrementLife("computer");
        }
        resetBall("computer");
        pauseGameOn();
        setTimeout(pauseGameOff, 1000);
      } else if (sphere.position.z >= 11) {
        if (!muteBool && !gameOverBool) document.getElementById("shut-down2").play();

        if (gameMode === "play" && pauseGame === false && gameOverBool === false) {
          decrementLife("player");
        }
        resetBall("player");
        pauseGameOn();
        setTimeout(pauseGameOff, 1000);
      }
    }
  }

  const blinkText = domElement => {
    for (let i = 0; i < 8; i++) {
      setTimeout( () => {
        domElement.style.visibility = domElement.style.visibility === 'hidden' ? "" : 'hidden';
      },
      200 * i);
      }
  };
  

  let playerLives = 3;
  let computerLives = 3;

  function decrementLife(player) {
    if (player === "computer") {
      computerLives = computerLives - 1;
      document.getElementById('comp-score').innerHTML = computerLives;
      // document.getElementById('comp-score').classList.add("blink-me");
      // setTimeout(
      //   document.getElementById('comp-score').classList.remove("blink-me"),
      //   3000
      // );
      blinkText(document.getElementById('comp-score'));
    } else if (player === "player") {
      if (playerLives > 0) {
        playerLives = playerLives - 1;
      }
      document.getElementById('player-score').innerHTML = playerLives;
      // document.getElementById('player-score').classList.add("blink-me");
      // setTimeout(
      //   document.getElementById('player-score').classList.remove("blink-me"),
      //   3000
      // );
      blinkText(document.getElementById('player-score'));
    }

    if (playerLives <= 0) {
      gameOver();
    } else if (computerLives <= 0) {
      nextLevel();
    }
  }

  let computerPaddleSpeed;

  function nextLevel() {
    computerLives = 3;
    computerPaddleSpeed *= 1.1;
    updateBallSpeed(baseBallSpeed * 1.07);
    level += 1;
    document.getElementById("game-level").innerHTML = `Level ${level}`;
    // document.getElementById("game-level").classList.add('blink-me');
    // setTimeout(
    //   document.getElementById("game-level").classList.remove('blink-me'),
    //   3000
    // );
    blinkText(document.getElementById('game-level'));
  }

  let gameOverBool = false;
  
  function gameOver() {
    gameOverBool = true;
    // cancelAnimationFrame(id);
    document.getElementById("game-over-message").classList.remove("hide");
    document.getElementById("play-button-text").classList.add("blink-me");
  }
  
  let level = 1;
  gameMode = "demo";
  function startGame() {
    document.getElementById("game-over-message").classList.add("hide");
    document.getElementById("game-level").innerHTML = `Level ${level}`;
    
    resetGame();
    gameMode = "play";
    scene.remove(demoPaddle1);
    scene.remove(demoPaddle2);
    requestAnimationFrame(render);
  }

  function resetGame() {
    gameOverBool = false;
    playerLives = 3;
    computerLives = 3;
    computerPaddleSpeed = 0.15;
    updateBallSpeed(0.2);
    updateXBallVelocity(0.02);
    updateYBallVelocity(0.02);
    level = 1;
    sphere.position.set(0, 0, 9);
    document.getElementById('comp-score').innerHTML = computerLives;
    document.getElementById('player-score').innerHTML = playerLives;
    document.getElementById("game-level").innerHTML = `Level ${level}`;
  }


  let xDirection;
  let yDirection;
  let xPaddleBallDiff;
  let yPaddleBallDiff;

  function animate() {

    // setTimeout(() => requestAnimationFrame(animate), 1000/30);
    requestAnimationFrame(animate);
    render();

    // camera pivot
    demoCameraPivot();

    moveComputerPaddle(computerPaddleSpeed);
    checkPastNet();

    var originPoint = sphere.position.clone();
    for (var vertexIndex = 0; vertexIndex < sphere.geometry.vertices.length; vertexIndex++) {
      var localVertex = sphere.geometry.vertices[vertexIndex].clone();
      var globalVertex = localVertex.applyMatrix4(sphere.matrix);
      var directionVector = globalVertex.sub(sphere.position);

      var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      var xCollisionResults = ray.intersectObjects(xCollidableList);
      if (xCollisionResults.length > 0 && xCollisionResults[0].distance < directionVector.length()) {
        // yBallVelocity = -yBallVelocity;
        updateYBallVelocity(-yBallVelocity);
        if (!muteBool && !gameOverBool) document.getElementById("beep1").play();
      }

      var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      var yCollisionResults = ray.intersectObjects(yCollidableList);
      if (yCollisionResults.length > 0 && yCollisionResults[0].distance < directionVector.length()) {
        // xBallVelocity = -xBallVelocity;
        updateXBallVelocity(-xBallVelocity);
        if (!muteBool && !gameOverBool) document.getElementById("beep1").play();
      }

      var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
      var zCollisionResults = ray.intersectObjects(zCollidableList);
      if (zCollisionResults.length > 0 && zCollisionResults[0].distance < directionVector.length()) {
        // zBallVelocity = -zBallVelocity;
        updateZBallVelocity(-zBallVelocity);
        if (!muteBool && !gameOverBool) document.getElementById("beep2").play();
        if (sphere.position.z > 0) {
          // player side
          // BUG look here for sticky ball issues
          if (gameMode === "demo") {
            // sphere.position.z = demoPaddle1.position.z - (2 * sphere.position.z) - (sphere.radius * 2);
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
            // sphere.position.z -= playerPaddle1.position.z - sphere.position.z - (sphere.radius * 2)
            xDirection = xBallVelocity === 0 ? 1 : xBallVelocity / Math.abs(xBallVelocity);
            xPaddleBallDiff = (playerPaddle1.position.x - sphere.position.x) / 1.5;
            let newXBallVelocity = xDirection * Math.abs(xPaddleBallDiff) * baseBallSpeed;
            // if (newXBallVelocity > 3) debugger;
            updateXBallVelocity(newXBallVelocity);
            
            
            yDirection = yBallVelocity === 0 ? 1 : yBallVelocity / Math.abs(yBallVelocity);
            yPaddleBallDiff = (playerPaddle1.position.y - sphere.position.y);
            let newYBallVelocity = yDirection * Math.abs(yPaddleBallDiff) * baseBallSpeed;
            // if (newYBallVelocity > 3) debugger;
            updateYBallVelocity(newYBallVelocity);
            
          }

          sphere.position.z = 8.7;

        } else if (sphere.position.z < 0) {
          // comp side
          // sphere.position.z += computerPaddle1.position.z - sphere.position.z + (sphere.radius * 2);
          xDirection = xBallVelocity === 0 ? 1 : xBallVelocity / Math.abs(xBallVelocity);
          xPaddleBallDiff = computerPaddle1.position.x - sphere.position.x;
          let newXBallVelocity = xDirection * Math.abs(xPaddleBallDiff) * baseBallSpeed * 1.1;
          updateXBallVelocity(newXBallVelocity);

          yDirection = yBallVelocity === 0 ? 1 : yBallVelocity / Math.abs(yBallVelocity);
          yPaddleBallDiff = computerPaddle1.position.y - sphere.position.y;
          let newYBallVelocity = yDirection * Math.abs(yPaddleBallDiff) * baseBallSpeed * 1.1;
          updateYBallVelocity(newYBallVelocity);


          // BUG look here for sticky ball issues
          
          sphere.position.z = -8.7;
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

    moveBall();
    moveOutline();
  }

  function render() {
    if (gameOverBool || pauseGame) return;
    renderer.render(scene, camera);
  }

  animate();
};