import * as THREE from 'three';


import {
  init,
  // scene,
  // camera,
  // renderer,
  // sphere,
  // xCollidableList,
  // yCollidableList,
  // zCollidableList,
  // playerPaddle1,
  // playerPaddle2,
  // computerPaddle1,
  // computerPaddle2,
} from './initialize/init';

import {
  renderContainer,
} from './render';

    

document.addEventListener("DOMContentLoaded", function() {
  init();
  renderContainer();
});


    
