
# Brick Breaker Game Assignment

## Game Overview

In this assignment, you will create a classic Brick Breaker game using HTML, CSS, and JavaScript. The game consists of a ball, a movable slate (paddle), and a set of bricks. The objective is to break all the bricks using the ball while preventing it from falling below the slate.

## Game Rules and How to Play

1. The game starts when the player presses the Enter key or Space bar.
2. Move the mouse to control the slate and keep the ball in play.
3. The ball bounces off the walls, slate, and bricks.
4. Each brick destroyed adds 10 points to the score.
5. The game ends if the ball falls below the slate.
6. The player wins when all bricks are destroyed.
7. A power-up activates every 5 turns, enlarging the ball and allowing it to break adjacent bricks.

## Notes

1. Initial global variables in the beginning.
2. If there are too many variables split them in blocks by adding a new line, ie, group them by similarity.
3. Use const for constants, no let.
4. Always initialize variables to zero value if a value can't be given yet, for example:
    - let score = 0
    - let isGameOver = false
Don't do this:
    - let score
    - let isGameOver

## Steps

### Step 1: Basic HTML Setup

1. Create a new file named `index.html`.
2. Set up a basic HTML structure with `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>` tags.
3. In the `<head>`:
    - Add a meta tag for charset UTF-8.
    - Add a meta tag for viewport settings.
    - Add a title tag with the text "Brick Breaker Game".
    - Create a `<style>` tag for CSS (leave it empty for now).
4. In the `<body>`:
    - Create a `<div>` with id "scoreDisplay" and text content "Score: 0".
    - Create another `<div>` with id "game".
    - Add a `<script>` tag at the end (leave it empty for now).

**Check Point 1:** Open this file in a browser. You should see "Score: 0" at the top of an otherwise blank page.

### Step 2: Adding Basic Styles

In the `<style>` tag:

1. Set the body's margin to 0, hide overflow, and set background color to white.
2. Style the #game div to be positioned absolutely and have 100% width.
3. Style the #scoreDisplay div to have centered text, font size 24px, and height 30px.

**Check Point 2:** Refresh the browser. The score should now be centered and larger.

### Step 3: Initial JavaScript Setup

In the `<script>` tag:

1. Use `document.getElementById()` to store respective div elements in the global variables 'game' and 'scoreDisplay' respectively.
2. Declare global variables for score, isGameOver, and isGameStarted. Initialize them appropriately.
3. Declare global variables for gameWidth, gameHeight, and gameUnit. Initialize them to 0.
4. Create an `initState()` function that:
    - Use `window.innerHeight` and `window.innerWidth` to get thw window height and width in pixels respectively.
    - Sets gameWidth to `window.innerWidth - 30` and gameHeight to `window.innerHeight`.
    - Calculates gameUnit as a 1000th fraction of gameWidth. `gameUnit = Math.ceil(gameWidth / 1000)`
    - Resets score and game state variables.
5. Create an `initGame()` function that:
    - Calls `initState()`.
    - Sets the game div's width and height using the calculated dimensions.
    - Updates the score display text.
6. Call `initGame()` at the end of your script.

**Check Point 3:** Refresh the browser. The game area should now fill the entire window minus the score display.

### Step 4: Adding the Slate

1. Declare global variables for slate, slateWidth, slateHeight, and slateX.
2. In `initState()`, add code to initialize slateWidth, slateHeight, and slateX based on gameUnit and gameWidth.
    - Set slateWidth to 80 game units.
    - Set slateHeight to 3 game units.
    - Set slateX such that the slate is centered in the game area.
3. Create a `createDivElement(id, styles)` function that:
    - Creates a new div element.
    - Sets its id.
    - Applies the provided styles using `Object.assign()`.
    - Appends it to the game div.
    - Returns the created element.
4. Create a `createGameElements()` function that:
    - Clears the game div's innerHTML.
    - Creates the slate using `createDivElement()` with styles:
        - color blue
        - position absolute
        - 5px from bottom
        - set left to slateX
5. Create an `updateSlatePosition()` function that updates the slate's left style property.
6. Update `initGame()` to call `createGameElements()` and `updateSlatePosition()`.

**Check Point 4:** Refresh the browser. You should see a blue rectangle (slate) centered horzontally and 5px from the bottom of the screen.

### Step 5: Moving the Slate

1. Create a `moveSlate(event)` function that:
    - Calculates the new slate position based on the mouse's x-coordinate.
    - Ensures the slate stays within the game boundaries.
    - Updates the slateX variable.
    - Calls `updateSlatePosition()`.

2. Add an event listener to the document for the 'mousemove' event:
    - Use `document.addEventListener()`.
    - The second argument should be the `moveSlate` function.

**Check Point 5:** Refresh the browser. The slate should now follow your mouse movement horizontally.

### Step 6: Adding the Ball

1. Declare global variables for ball, ballX, ballY, ballSpeedX, ballSpeedY, ballRadius, and originalBallRadius.

2. In `initState()`, add code to initialize these ball variables based on gameUnit, gameWidth, and gameHeight.
    - Set originalRadius to 8 game units.
    - ballX, ballY such that it's at the center.
    - Set ballSpeedX to 3 game units.
    - Set ballSpeedY to -3 game units. (so that it moves upward)

3. Update `createGameElements()` to create the ball:
    - Use `createDivElement()` with appropriate styles for a circular shape and color black.
    - Store the created element in a 'ball' variable.

4. Create an `updateBallPosition()` function that updates the ball's left and top style properties.

5. Update `initGame()` to call `updateBallPosition()`.

**Check Point 6:** Refresh the browser. You should now see a black circle (the ball) in the center of the game.

### Step 7: Basic Ball Movement

1. Create a `moveBall()` function that:
    - Updates ballX and ballY based on ballSpeedX and ballSpeedY.
    - Handles basic wall collisions by reversing speed when hitting left, right, or top walls.
    - Calls `updateBallPosition()`.

2. Create a `gameLoop()` function that:
    - Calls `moveBall()`.
    - Uses `requestAnimationFrame()` to call itself, creating a loop.

3. Update the `startGame()` function to:
    - Set `isGameStarted` to true.
    - Call `gameLoop()`.

4. Add a `keydown` event listener to the document:
    - Listen for the 'Enter' or 'Space' key.
    - When pressed, if the game is over or not started, call `initGame()` and `startGame()`.

**Check Point 7:** Refresh the browser. Press Enter or Space. The ball should now move and bounce off the walls.

### Step 8: Slate Collision

1. Create a `checkSlateCollision()` function that:
    - Checks if the ball's position overlaps with the slate's position.
    - Returns true if there's a collision, false otherwise.

2. Update `moveBall()` to:
    - Call `checkSlateCollision()`.
    - If there's a collision, reverse the ball's vertical direction.
    - Adjust the ball's horizontal speed based on where it hit the slate.

3. Add game over condition to `moveBall()`:
    - If the ball goes below the game area, call an `endGame()` function.

4. Create an `endGame()` function that:
    - Sets `isGameOver` to true.
    - Removes the mousemove event listener.
    - Updates the score display with a game over message.

**Check Point 8:** Play the game. The ball should now bounce off the slate, and the game should end if the ball touches the bottom of the screen.

### Step 9: Adding Bricks

1. Declare global variables for brickWidth, brickHeight, and brickGutter.

2. Create an empty array called 'bricks' to store brick elements.

3. In `initState()`, add code to initialize the brick dimension variables based on gameUnit.
    - Brick width and height is 12 and 8 game units respectively.
    - Brick gutter (distance between bricks) is 2 game units.

4. Create a `resetBricks()` function that:
    - Clears the 'bricks' array.
    - Calculates how many columns of bricks can fit in the game width.
    - Creates 10 rows of bricks:
        - Use a loop to create each brick.
        - Use `createDivElement()` to create each brick with appropriate styles.
        - Position each brick using absolute positioning.
        - Store each brick's position as data attributes (example brick.dataset.x = left).
        - Add each brick to the 'bricks' array.
    - Create a left offset variable after the columns variable to center the bricks, and add the offset to left position of each brick.
    

5. Update `createGameElements()` to call `resetBricks()`.

**Check Point 9:** Refresh the browser. You should now see a row of bricks at the top of the game area.

### Step 10: Brick Collision

1. Create a `checkBrickCollision()` function that:
    - Loops through the 'bricks' array (in reverse order).
    - For each brick, check if the ball's position overlaps with the brick's position.
    - If there's a collision:
        - Check which side of the brick the ball has hit, and update the speed of the ball accordingly.
        ```js
        // Determine which side of the brick was hit
                const overlapLeft = ballX + ballRadius * 2 - brickX;
                const overlapRight = brickX + brickWidth - ballX;
                const overlapTop = ballY + ballRadius * 2 - brickY;
                const overlapBottom = brickY + brickHeight - ballY;

                // Find the smallest overlap
                const minOverlap = Math.min(
                    overlapLeft, 
                    overlapRight, 
                    overlapTop, 
                    overlapBottom
                );

                // Adjust ball direction based on the side hit
                if (minOverlap === overlapLeft
                 || minOverlap === overlapRight) {
                    ballSpeedX = -ballSpeedX;
                } else {
                    ballSpeedY = -ballSpeedY;
                }
        ```
        - Remove the brick from the DOM.
        - Remove the brick from the 'bricks' array.
        - Increase the score.
        - Update the score display.
        - Reverse the ball's vertical direction.
        - Break the loop (to handle only one collision per frame).

2. Update `moveBall()` to call `checkBrickCollision()` after moving the ball.

**Check Point 10:** Play the game. The ball should now be able to break bricks, and your score should increase for each broken brick.

### Step 11: Winning the Game

1. Create a `winGame()` function that:
    - Sets `isGameOver` to true.
    - Removes the mousemove event listener.
    - Updates the score display with a win message.

2. In `moveBall()`, after `checkBrickCollision()`:
    - Check if the 'bricks' array is empty.
    - If it is, call `winGame()`.

**Check Point 11:** Break all the bricks. The game should end with a win message when all bricks are destroyed.

### Step 12: Power-up System

1. Declare variables for turnCount and isPowerUp.

2. In `initState()`, initialize these new variables.

3. Create an `activatePowerUp()` function that:
    - Sets isPowerUp to true.
    - Increases the ball's size.
    - Changes the ball's color.

4. Create a `deactivatePowerUp()` function that reverses the changes made in `activatePowerUp()`.

5. In `checkSlateCollision()`, after handling the collision:
    - Increment turnCount.
    - If turnCount is divisible by 5, call `activatePowerUp()`.
    - Otherwise, call `deactivatePowerUp()`.

6. Update `checkBrickCollision()` to break adjacent bricks if isPowerUp is true.

**Check Point 12:** Play the game. Every 5 times the ball hits the slate, it should become larger and able to break multiple bricks at once.

## Scoring

- Each step has 9 points, except the last one which has 11 points (extra credits).