let canvas, ctx, width, height;
let balls = [];
let nBalls = 10, nGoodBalls;
let wrongBallsEaten = 0;
let goodBallsEaten = 0;
let colorToEat = 'red';
let looping = false;

window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");

    // often useful
    width = canvas.width;
    height = canvas.height;

    // important, we will draw with this object
    ctx = canvas.getContext('2d');

    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', function (evt) {
        mousePos = getMousePos(canvas, evt);
    });
};

// continuously on-going loop
function mainLoop() {
    // clear canvas
    ctx.clearRect(0, 0, width, height);

    drawPlayer();
    drawBalls();

    movePlayer();
    moveBalls();

    updateStatus();

    console.log("Looping? " + looping);
    if (looping) {
        // ask for a new animation frame
        requestAnimationFrame(mainLoop);
    }
}

function updateStatus() {
    ctx.save();
    ctx.font = "20px Arial";

    if (balls.length === 0 || wrongBallsEaten > 3) {
        ctx.fillText("Game Over!", 20, 30);
        looping = false;
    } else if (goodBallsEaten === nGoodBalls) {
        ctx.fillText("You Win! Final score : " + (nBalls - wrongBallsEaten), 20, 30);
        looping = false;
    } else {
        ctx.fillText("Balls still alive: " + balls.length, 210, 30);
        ctx.fillText("Good Balls eaten: " + goodBallsEaten, 210, 50);
        ctx.fillText("Wrong Balls eaten: " + wrongBallsEaten, 210, 70);
    }
    ctx.restore();
}

function changeNBalls(num) {
    nBalls = num;
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

function newGame() {
    balls = createBalls(nBalls);
    nGoodBalls = countNGoodBalls(balls, colorToEat);
    wrongBallsEaten = goodBallsEaten = 0;
    if (!looping) {
        looping = true;
        console.log("Looping (new Game)? " + looping);
        mainLoop();
    }
}