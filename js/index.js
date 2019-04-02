// useful to have them as global variables
let canvas, ctx, w, h;
let mousePos;

// an empty array!
let balls = [];
let nBalls;
let colorToEat = 'red';
let wrongBallsEaten = goodBallsEaten = 0;
let nGoodBalls;

window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");

    // often useful
    w = canvas.width;
    h = canvas.height;

    // important, we will draw with this object
    ctx = canvas.getContext('2d');

    // start game with 10 balls, balls to eat = red balls
    startGame(10);

    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', function (evt) {
        mousePos = getMousePos(canvas, evt);
    });

    // ready to go !
    mainLoop();
};

function startGame(numBalls) {
    do {
        balls = createBalls(numBalls);
        nBalls = numBalls;
        nGoodBalls = countNGoodBalls(balls, colorToEat);
    } while (nGoodBalls === 0);

    // noinspection JSUndeclaredVariable
    wrongBallsEaten = goodBallsEaten = 0;
}


function mainLoop() {
    // 1 - clear the canvas
    ctx.clearRect(0, 0, w, h);

    // draw the player and the balls
    drawPlayer();
    drawAllBalls(balls);
    drawNumBalls(balls);

    // animate the ball that is bouncing all over the walls
    moveBalls(balls);
    movePlayer();

    // ask for a new animation frame
    requestAnimationFrame(mainLoop);
}

// Collisions between rectangle and circle
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
    var testX = cx;
    var testY = cy;
    if (testX < x0) testX = x0;
    if (testX > (x0 + w0)) testX = (x0 + w0);
    if (testY < y0) testY = y0;
    if (testY > (y0 + h0)) testY = (y0 + h0);
    return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
}

function drawNumBalls() {
    ctx.save();
    ctx.font = "20px Arial";

    if (balls.length === 0) {
        ctx.fillText("Game Over!", 20, 30);
    } else if (goodBallsEaten === nGoodBalls) {
        ctx.fillText("You Win! Final score : " + (nBalls - wrongBallsEaten),
            20, 30);
    } else {
        ctx.fillText("Balls still alive: " + balls.length, 210, 30);
        ctx.fillText("Good Balls eaten: " + goodBallsEaten, 210, 50);
        ctx.fillText("Wrong Balls eaten: " + wrongBallsEaten, 210, 70);
    }
    ctx.restore();
}

function testCollisionWithPlayer(b, index) {
    if (circRectsOverlap(player.x, player.y,
        player.width, player.height,
        b.x, b.y, b.radius)) {
        // we remove the element located at index
        // from the balls array
        // splice: first parameter = starting index
        //         second parameter = number of elements to remove
        if (b.color === colorToEat) {
            // Yes, we remove it and increment the score
            goodBallsEaten += 1;
        } else {
            wrongBallsEaten += 1;
        }

        balls.splice(index, 1);

    }
}

function changeNBalls(nBalls) {
    startGame(nBalls);
}

function changePlayerColor(color) {
    player.color = color;
}

function changeColorToEat(color) {
    colorToEat = color;
}

function changeBallSpeed(speed) {
    ballSpeed = speed;
}