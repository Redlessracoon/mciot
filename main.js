// On pgae load
$(function () {
    // global vars
    var alpha = 0;
    var beta = 0;
    var gamma = 0;

    var canvas = document.querySelector("#paddle");
    setCanvas(canvas);
    setupHandlers();
    var ctx = canvas.getContext("2d");
    var startX = canvas.width / 2;
    var startY = canvas.height / 2;
    var maxX = canvas.width;
    var maxY = canvas.height;

    ball = new Ball(10, "#ff0000", 20, startX, startY, ctx)

    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall(ball);

        var x = gamma;  // In degree in the range [-180,180)
        var y = beta; // In degree in the range [-90,90)

        // Because we don't want to have the device upside down
        // We constrain the x value to the range [-90,90]
        if (x > 90) { x = 90 };
        if (x < -90) { x = -90 };

        // To make computation easier we shift the range of
        // x and y to [0,180]
        // x += 90;
        // y += 90;
        acc = document.querySelector("#acc")
        acc.innerHTML = "alpha = " + alpha + "<br>" + "beta = " + beta + "<br>" + "gamma = " + gamma;
        acc.innerHTML += "<br>" + "x = " + x + "<br>" + "y = " + y;

        updateBall(ball, maxX * x / 180 - ball.radius, maxY * y / 180 - ball.radius, 0);
    }

    function Ball(radius, color, weight, x, y, ctx) {
        this.baseRadius = radius;
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

    function updateBall(ball, dx, dy, dz) {
        newX = lerp(ball.x, ball.x + dx, 0.01);
        newY = lerp(ball.y, ball.y + dy, 0.01);

        if (newX > maxX - ball.radius) { newX = maxX - ball.radius }
        if (newX < ball.radius) { newX = ball.radius }
        if (newY > maxY - ball.radius) { newY = maxY - ball.radius }
        if (newY < ball.radius) { newY = ball.radius }

        ball.x = newX;
        ball.y = newY;
    }

    function setupHandlers() {
        // Check if device has motion sensors
        // if (window.DeviceMotionEvent) {
        //     window.addEventListener('devicemotion', deviceMotionHandler, false);
        //     document.querySelector("#support").innerHTML = "Supported!";
        // } else {
        //     document.querySelector("#support").innerHTML = "Not supported!";
        // }

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleOrientation, true);
        }
    }

    function handleOrientation(event) {
        alpha = event.alpha;
        beta = event.beta;
        gamma = event.gamma;

        requestAnimationFrame(draw)
    }

    function setCanvas(canvasObject) {
        canvasObject.width = window.innerWidth;
        canvasObject.height = window.innerHeight;
    }

    // Lerp interpolation to smoothen the animation
    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }
});