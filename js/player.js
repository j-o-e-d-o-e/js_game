const player = {
    x: 10,
    y: 10,
    width: 20,
    height: 20,
    color: 'red'
};

function getMousePos(canvas, evt) {
    // necessary work in the canvas coordinate system
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function movePlayer() {
    if (mousePos !== undefined) {
        player.x = mousePos.x;
        player.y = mousePos.y;
    }
}

function drawPlayer() {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    // translate the coordinate system, draw relative to it
    ctx.translate(player.x, player.y);

    ctx.fillStyle = player.color;
    // (0, 0) is the top left corner of the monster.
    ctx.fillRect(0, 0, player.width, player.height);

    // GOOD practice: restore the context
    ctx.restore();
}