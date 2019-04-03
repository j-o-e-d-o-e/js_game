function collides(ball, index) {
    if (collidesWithPlayer(player.x, player.y, player.width, player.height, ball.x, ball.y, ball.radius)) {
        // we remove the element located at index
        // from the balls array
        // splice: first parameter = starting index
        //         second parameter = number of elements to remove
        if (ball.color === colorToEat) {
            // Yes, we remove it and increment the score
            goodBallsEaten += 1;
        } else {
            wrongBallsEaten += 1;
        }
        balls.splice(index, 1);
    }
    collidesWithWall(ball);
}

// Collisions between player and balls
function collidesWithPlayer(playerX, playerY, playerWidth, playerHeight, ballX, ballY, radius) {
    let testX = ballX;
    let testY = ballY;
    if (testX < playerX) testX = playerX;
    if (testX > (playerX + playerWidth)) testX = (playerX + playerWidth);
    if (testY < playerY) testY = playerY;
    if (testY > (playerY + playerHeight)) testY = (playerY + playerHeight);
    return (((ballX - testX) * (ballX - testX) + (ballY - testY) * (ballY - testY)) < radius * radius);
}

function collidesWithWall(ball) {
    // COLLISION WITH VERTICAL WALLS ?
    if ((ball.x + ball.radius) > width) {
        // the ball hit the right wall
        // change horizontal direction
        ball.speedX = -ball.speedX;

        // put the ball at the collision point
        ball.x = width - ball.radius;
    } else if ((ball.x - ball.radius) < 0) {
        // the ball hit the left wall
        // change horizontal direction
        ball.speedX = -ball.speedX;

        // put the ball at the collision point
        ball.x = ball.radius;
    }

    // COLLISIONS WTH HORIZONTAL WALLS ?
    // Not in the else as the ball can touch both
    // vertical and horizontal walls in corners
    if ((ball.y + ball.radius) > height) {
        // the ball hit the right wall
        // change horizontal direction
        ball.speedY = -ball.speedY;

        // put the ball at the collision point
        ball.y = height - ball.radius;
    } else if ((ball.y - ball.radius) < 0) {
        // the ball hit the left wall
        // change horizontal direction
        ball.speedY = -ball.speedY;

        // put the ball at the collision point
        ball.Y = ball.radius;
    }
}