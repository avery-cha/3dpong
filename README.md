## 3D Pong
[Live Link](https://trwong.github.io/3dpong/)

## Background and Overview
3D Pong is a modern take on the classic arcade video game, Pong.

Users will progress through increasing levels of difficulty against a computer opponent. Users use their mouse to control their paddle to deflect the ball towards their opponents side. Players score points when the ball pasts their opponents paddle and reaches the opposing wall. 

## Functionality and MVP
In 3D Pong, users are able to:

* Control their paddle using their mouse
* Deflect the ball towards their opponent when their paddle makes contact with the ball
* Score / lose points when the ball reaches their opponents / their side
* Play against a computer AI that moves to deflect the ball
* Play on increasingly difficult levels

### Demo Mode

![3D Pong Demo Mode Gif](https://github.com/trwong/3dpong/blob/master/assets/3d_pong_demo_gif_orig_size.gif)

Demo mode pits two bots against each other with a rotating camera to showcase gameplay and the app's 3d capabilities.

### Velocity Change on Paddle Hit

![3D Pong Screen Shot](https://github.com/trwong/3dpong/blob/master/assets/Screen%20Shot%202017-12-08%20at%2010.34.46%20AM.png)

To stay true to the original, where the ball makes contact with the paddle determines the velocity of the ball. I used the position of the ball and paddle at the time of collision as a ratio to control the balls velocity. This introduces an interesting 'high risk, high reward' game mechanic. Balls off the corner of the paddle have maximum x and y velocity but are easier to miss.

## Project Design
3D Pong was designed with a set of core functionality and user experience as its primary goal. Using several iterations of playtesting, I learned from player interactions and utilized CSS effects to guide users through the game.


## Technologies
JavaScript was used for overall structure and game logic. I intentionally did not use jQuery to practice pure, Vanilla JavaScript.

Three.js is a lightweight 3D Javascript Library run on WebGL. Three.js was chosen to create and manipuate 3D objects within the browser.

Finally, I utilized Webpack to bundle and serve up the various scripts.

## Possible Future Features
In the future I would like to add:
* Websockets for multiplayer
* Ball curve that is controlled by player's cursor speed and direction during collision.
