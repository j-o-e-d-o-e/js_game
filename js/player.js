const player = {
    x: 10,
    y: 10,
    width: 20,
    height: 20,
    color: 'red',
    move: function(){
        if (mousePos !== undefined) {
            this.x = mousePos.x;
            this.y = mousePos.y;
        }
    },
    draw: function(){
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
};