const colors = ['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
let ballSpeed = 1;

function moveBalls() {
    balls.forEach(function (ball, index) {
        ball.x += (ball.speedX * ballSpeed);
        ball.y += (ball.speedY * ballSpeed);
        collides(ball, index);
    });
}

function drawBalls() {
    balls.forEach(function (ball) {
        // GOOD practice: save the context, use 2D transformations
        ctx.save();

        // translate the coordinate system, draw relative to it
        ctx.translate(ball.x, ball.y);

        ctx.fillStyle = ball.color;
        // (0, 0) is the top left corner of the monster.
        ctx.beginPath();
        ctx.arc(0, 0, ball.radius, 0, 2 * Math.PI);
        ctx.fill();

        // GOOD practice: restore the context
        ctx.restore();
    });
}

function countNGoodBalls(balls, colorToEat) {
    let nBalls = 0;
    balls.forEach(function (b) {
        if (b.color === colorToEat)
            nBalls++;
    });
    return nBalls;
}

// returns array full of randomly created balls
function createBalls(numBalls) {
    let ballArray = [];
    for (let i = 0; i < numBalls; i++) {
        let b = {
            x: width / 2,
            y: height / 2,
            radius: 5 + 30 * Math.random(), // between 5 and 35
            speedX: -5 + 10 * Math.random(), // between -5 and + 5
            speedY: -5 + 10 * Math.random(), // between -5 and + 5
            color: getRandColor(),
        };
        // add ball b to the array
        ballArray.push(b);
    }
    return ballArray;
}

function getRandColor() {
    // a value between 0 and color.length-1
    // Math.round = rounded value
    // Math.random() a value between 0 and 1
    let colorIndex = Math.round((colors.length - 1) * Math.random());
    return colors[colorIndex];
}