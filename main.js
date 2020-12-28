// global vars
var alpha = 0;
var beta = 0;
var gamma = 0;
var ax = 0;
var ay = 0;
var az = 0;
var agx = 0;
var agy = 0;
var agz = 0;

// On pgae load
$(function () {
    var canvas = document.querySelector("#paddle");
    setCanvas(canvas);
    setupHandlers();
    var ctx = canvas.getContext("2d");
    var startX = canvas.width / 2;
    var startY = canvas.height / 2;

    ball = new Ball(10, "#ff0000", 20, startX, startY, ctx)

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall(ball);
        updateBall(ball, -agx, agy);
    }

    setInterval(draw, 10);
});

function Ball(radius, color, weight, x, y, ctx) {
    this.radius = radius;
    this.color = color;
    this.weight = weight;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
}

function drawBall(ball) {
    ball.ctx.beginPath();
    ball.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ball.ctx.fillStyle = ball.color;
    ball.ctx.fill();
    ball.ctx.closePath();
}

function updateBall(ball, dx, dy) {
    ball.x += dx;
    ball.y += dy;
}

function setupHandlers() {
    // Check if device has motion sensors
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
        document.querySelector("#support").innerHTML = "Supported!";
    } else {
        document.querySelector("#support").innerHTML = "Not supported!";
    }
}

function deviceMotionHandler(event) {
    agx = event.accelerationIncludingGravity.x;
    agy = event.accelerationIncludingGravity.y;
    agz = event.accelerationIncludingGravity.z;

    ax = event.acceleration.x;
    ay = event.acceleration.y;
    az = event.acceleration.z;

    alpha = event.rotationRate.alpha;
    beta = event.rotationRate.beta;
    gamma = event.rotationRate.gamma;

    // updateBall(ball, beta, gamma)

    document.querySelector("#acc").innerHTML = "GX = " + Math.round(agx) + "<br>" + "GY = " + Math.round(agy) + "<br>" + "GZ = " + Math.round(agz);
    document.querySelector("#acc").innerHTML += "<br>" + "X = " + Math.round(ax) + "<br>" + "Y = " + Math.round(ay) + "<br>" + "Z = " + Math.round(az);
    document.querySelector("#acc").innerHTML += "<br>" + "alpha = " + Math.round(alpha) + "<br>" + "beta = " + Math.round(beta) + "<br>" + "gamma = " + Math.round(gamma);
}

function setCanvas(canvasObject) {
    canvasObject.width = window.innerWidth;
    canvasObject.height = window.innerHeight;
}