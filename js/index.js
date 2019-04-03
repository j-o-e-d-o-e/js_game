let canvas, ctx, width, height;
let mousePos;
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

    // important, we will draw with this object
    ctx = canvas.getContext('2d');

    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', function (evt) {
        // necessary work in the canvas coordinate system
        let rect = canvas.getBoundingClientRect();
        mousePos =  {
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
    drawBalls();

    player.move();
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