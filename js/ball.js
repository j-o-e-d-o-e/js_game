class Ball {
    constructor(x, y, radius, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = Ball.getRandColor();
    }

    static getRandColor() {
        // a value between 0 and color.length-1
        // Math.round = rounded value
        // Math.random() a value between 0 and 1
        let colorIndex = Math.round((Ball.colors.length - 1) * Math.random());
        return Ball.colors[colorIndex];
    }

    move() {
        this.x += (this.speedX * Ball.speedFactor);
        this.y += (this.speedY * Ball.speedFactor);
    }

    draw() {
        // GOOD practice: save the context, use 2D transformations
        ctx.save();

        // translate the coordinate system, draw relative to it
        ctx.translate(this.x, this.y);

        ctx.fillStyle = this.color;
        // (0, 0) is the top left corner of the monster.
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        // GOOD practice: restore the context
        ctx.restore();
    }
}

Ball.colors = ['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
Ball.speedFactor = 1;