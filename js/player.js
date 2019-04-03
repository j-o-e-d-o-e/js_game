class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    move() {
        if (mousePos !== undefined) {
            this.x = mousePos.x;
            this.y = mousePos.y;
        }
    }

    draw() {
        // GOOD practice: save the context, use 2D transformations
        ctx.save();

        // translate the coordinate system, draw relative to it
        ctx.translate(this.x, this.y);

        ctx.fillStyle = this.color;
        // (0, 0) is the top left corner of the monster.
        ctx.fillRect(0, 0, this.width, this.height);

        // GOOD practice: restore the context
        ctx.restore();
    }
}