import * as THREE from 'three';

import {
  sphere,
} from './../initialize/sphere';

import {
  topOutline,
  bottomOutline,
  rightOutline,
  leftOutline,
} from './../initialize/outline';

export const moveOutline = () => {
  topOutline.position.z = sphere.position.z;
  bottomOutline.position.z = sphere.position.z;
  rightOutline.position.z = sphere.position.z;
  leftOutline.position.z = sphere.position.z;
};