$(function () {
    var canvas = document.querySelector("#sand");
    setCanvas(canvas);
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var r = 0,
        g = 0,
        b = 0,
        a = 255,
        x = 50,
        y = 50

    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
    ctx.fillRect(x, y, 1, 1);

});

function setCanvas(canvasObject) {
    canvasObject.width = window.innerWidth;
    canvasObject.height = window.innerHeight;
}

function Ball(radius, color, weight, x, y, ctx) {
    this.baseRadius = radius;
    this.radius = radius;
    this.color = color;
    this.weight = weight; // (0, 1) !
    if (weight > 1) { this.weight = 0.999 }
    if (weight < 0) { this.weight = 0.001 }
    this.x = x;
    this.y = y;
    this.ctx = ctx;
}