import * as THREE from 'three';
import {
  init,
} from './initialize/init';
import {
  renderContainer,
} from './render/render';
import {
  handleOverlay
} from './overlay/overlay';

    

document.addEventListener("DOMContentLoaded", function() {
  init();
  renderContainer();
  handleOverlay();
});


    
