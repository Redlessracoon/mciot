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

    ball = new Ball(10, "#ff0000", 10, startX, startY, 0, 0, ctx)

    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall(ball);
    }

    setInterval(() => {
        requestAnimationFrame(draw)
    }, 10);

    function Ball(radius, color, weight, x, y, ax, ay, ctx) {
        this.baseRadius = radius;
        this.radius = radius;
        this.color = color;
        this.weight = weight;
        this.x = x;
        this.y = y;
        this.ax = ax;
        this.ay = ay;
        this.ctx = ctx;
    }

    function drawBall(ball) {
        ball.ctx.beginPath();
        ball.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ball.ctx.fillStyle = ball.color;
        ball.ctx.fill();
        ball.ctx.closePath();
        updateBall(ball);
    }

    function updateBall(ball) {
        newX = lerp(ball.x, ball.x + (maxX * ball.ax / ball.weight), 0.1);
        newY = lerp(ball.y, ball.y + (maxY * ball.ay / ball.weight), 0.1);

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
        var originalAlpha = 0,
            originalBeta = 0,
            originalGamma = 0,
            tolerance = 2;

        if (Math.abs(event.alpha - originalAlpha) > tolerance) {
            alpha = event.alpha;
            originalAlpha = alpha;
        }
        if (Math.abs(event.beta - originalBeta) > tolerance) {
            beta = event.beta;
            originalBeta = beta;

            var y = beta; // In degree in the range [-90,90)
            y /= 180;
            ball.ay = y;
        } else {
            ball.ay /= 10;
        }
        if (Math.abs(event.gamma - originalGamma) > tolerance) {
            gamma = event.gamma;
            originalGamma = gamma;

            var x = gamma;  // In degree in the range [-180,180)

            // Because we don't want to have the device upside down
            // We constrain the x value to the range [-90,90]
            if (x > 90) { x = 90 };
            if (x < -90) { x = -90 };
            x /= 180;
            ball.ax = x;
        } else {
            ball.ax /= 10;
        }

        acc = document.querySelector("#acc")
        acc.innerHTML = "alpha = " + alpha + "<br>" + "beta = " + beta + "<br>" + "gamma = " + gamma;
        acc.innerHTML += "<br>" + "x = " + x + "<br>" + "y = " + y;
        acc.innerHTML += "<br>" + "ballX = " + ball.ax + "<br>" + "ballY = " + ball.ay;
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