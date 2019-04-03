let canvas, ctx, width, height;
let mousePos;
let player;
let balls = [];
let nBalls = 10, nGoodBalls;
let wrongBallsEaten = 0;
let goodBallsEaten = 0;
let colorToEat = 'red';
let looping = false;
let collisionSound, winSound, looseSound;

window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");

    // often useful
    width = canvas.width;
    height = canvas.height;

    player = new Player(10, 10, 20, 20, 'red');

    // important, we will draw with this object
    ctx = canvas.getContext('2d');

    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', function (evt) {
        // necessary work in the canvas coordinate system
        let rect = canvas.getBoundingClientRect();
        mousePos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    });
    // Load sounds
    collisionSound = new Howl({
        urls: ['https://raw.githubusercontent.com/j-o-e-d-o-e/the_assassin/master/core/assets/sounds/shot.wav'],
    });
    winSound = new Howl({
        urls: ['https://raw.githubusercontent.com/j-o-e-d-o-e/the_assassin/master/core/assets/sounds/win.wav'],
    });
    looseSound = new Howl({
        urls: ['https://raw.githubusercontent.com/j-o-e-d-o-e/the_assassin/master/core/assets/sounds/gameOver.wav'],
    });
};

// continuously on-going loop
function mainLoop() {
    // clear canvas
    ctx.clearRect(0, 0, width, height);

    player.draw();
    balls.forEach(function (ball) {
        ball.draw();

    });
    player.move();
    balls.forEach(function (ball, index) {
        ball.move();
        collides(ball, index);
    });
    updateStatus();

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
        looseSound.play();
        looping = false;
    } else if (goodBallsEaten === nGoodBalls) {
        ctx.fillText("You Win! Final score : " + (nBalls - wrongBallsEaten), 20, 30);
        winSound.play();
        looping = false;
    } else {
        ctx.fillText("Balls still alive: " + balls.length, 210, 30);
        ctx.fillText("Good Balls eaten: " + goodBallsEaten, 210, 50);
        ctx.fillText("Wrong Balls eaten: " + wrongBallsEaten, 210, 70);
    }
    ctx.restore();
}

function newGame() {

    createBalls();
    nGoodBalls = countNGoodBalls();
    wrongBallsEaten = goodBallsEaten = 0;
    if (!looping) {
        looping = true;
        console.log("Looping (new Game)? " + looping);
        mainLoop();
    }
}

function createBalls() {
    balls = [];
    for (let i = 0; i < nBalls; i++) {
        let x = width / 2;
        let y = height / 2;
        let radius = 5 + 30 * Math.random();// between 5 and 35
        let speedX = -5 + 10 * Math.random(); // between -5 and + 5
        let speedY = -5 + 10 * Math.random(); // between -5 and + 5
        balls.push(new Ball(x, y, radius, speedX, speedY));
    }
}

function countNGoodBalls() {
    let nBalls = 0;
    balls.forEach(function (b) {
        if (b.color === colorToEat)
            nBalls++;
    });
    return nBalls;
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
    Ball.speedFactor = speed;
}