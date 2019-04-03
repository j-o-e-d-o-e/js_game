let canvas, ctx, width, height;
let balls = [];
let nBalls, nGoodBalls;
let wrongBallsEaten = 0;
let goodBallsEaten = 0;
let colorToEat = 'red';

window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");

    // often useful
    width = canvas.width;
    height = canvas.height;

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

    wrongBallsEaten = goodBallsEaten = 0;
}

function mainLoop() {
    // clear canvas
    ctx.clearRect(0, 0, width, height);

    drawPlayer();
    drawBalls();
    drawNumBalls();

    movePlayer();
    moveBalls();

    // ask for a new animation frame
    requestAnimationFrame(mainLoop);
}

function drawNumBalls() {
    ctx.save();
    ctx.font = "20px Arial";

    if (balls.length === 0) {
        ctx.fillText("Game Over!", 20, 30);
    } else if (goodBallsEaten === nGoodBalls) {
        ctx.fillText("You Win! Final score : " + (nBalls - wrongBallsEaten), 20, 30);
    } else {
        ctx.fillText("Balls still alive: " + balls.length, 210, 30);
        ctx.fillText("Good Balls eaten: " + goodBallsEaten, 210, 50);
        ctx.fillText("Wrong Balls eaten: " + wrongBallsEaten, 210, 70);
    }
    ctx.restore();
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