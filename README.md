## 3D Pong

### Background and Overview
3D Pong is a modern take on the classic arcade video game Pong.

Users will progress through increasing levels of difficulty against a computer opponent. Users will use their mouse to control their paddle to deflect the ball towards their opponents side. Players score points when the ball pasts their opponents paddle and reaches the opposing wall. 

### Functionality and MVP
In 3D Pong, users will be able to:

- [ ] Move their paddle using their mouse
- [ ] Deflect the ball towards their opponent when their paddle makes contact with the ball
- [ ] Score / lose points when the ball reaches their opponents / their side
- [ ] Play against a computer AI that moves to deflect the ball
- [ ] Play on increasingly difficult levels

### Wireframes


### Architecture and Technologies
This project will be implemented with the following technologies:
- Vanilla Javascript for overall structure and game logic
- three.js for 3D object creation and manipulation
- Webpack to bundle and serve up the various scripts

In addition to the webpack entry file, there will be three scripts involved in this project:
`game.js`: This script will handle the start, win/lose conditions, and levels of difficutly in the game
`round.js`: This script will handle playing a single round or life
`physics.js`: This script contain the logic and physics of the ball, walls, paddles and mouse event listeners


### Implementation Timeline
**Over The Weekend**:
- [x] Created the game container
- [x] Adding ball bouncing in 1D, 2D and 3D

**Day 1**:
- [ ] Add paddle and mouse event listener to make the paddle follow the cursor
- [ ] On 'loss' (ball gets past your paddle) ball is reset to center and point is scored

**Day 2**:
- [ ] Add computer player that attempts to deflect the ball with its paddle

**Day 3**:
- [ ] Add game start button and lives (3 lives before the game ends)

**Day 4**:
- [ ] Increment level and increase difficulty after beating the computer 3 times

### Bonus Features
- [ ] Websockets for multiplayer
- [ ] Add single player 'zen' mode (player controls both paddles. No lives)