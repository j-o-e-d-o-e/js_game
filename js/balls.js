let ballSpeed = 1;

function drawBalls() {
    balls.forEach(function (b) {
        drawFilledCircle(b);
    });
}

function drawFilledCircle(c) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    // translate the coordinate system, draw relative to it
    ctx.translate(c.x, c.y);

    ctx.fillStyle = c.color;
    // (0, 0) is the top left corner of the monster.
    ctx.beginPath();
    ctx.arc(0, 0, c.radius, 0, 2 * Math.PI);
    ctx.fill();

    // GOOD practice: restore the context
    ctx.restore();
}

function moveBalls() {
    // iterate on all balls in array
    balls.forEach(function (b, index) {
        // b is the current ball in the array
        b.x += (b.speedX * ballSpeed);
        b.y += (b.speedY * ballSpeed);

        collides(b, index);
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

function createBalls(n) {
    // empty array
    var ballArray = [];

    // create n balls
    for (var i = 0; i < n; i++) {
        var b = {
            x: width / 2,
            y: height / 2,
            radius: 5 + 30 * Math.random(), // between 5 and 35
            speedX: -5 + 10 * Math.random(), // between -5 and + 5
            speedY: -5 + 10 * Math.random(), // between -5 and + 5
            color: getARandomColor(),
        }
        // add ball b to the array
        ballArray.push(b);
    }
    // returns the array full of randomly created balls
    return ballArray;
}

function getARandomColor() {
    var colors = ['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
    // a value between 0 and color.length-1
    // Math.round = rounded value
    // Math.random() a value between 0 and 1
    var colorIndex = Math.round((colors.length - 1) * Math.random());
    var c = colors[colorIndex];

    // return the random color
    return c;
}