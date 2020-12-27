window.ondevicemotion = function (event) {
    var ax = event.accelerationIncludingGravity.x
    var ay = event.accelerationIncludingGravity.y
    var az = event.accelerationIncludingGravity.z

    var alpha = event.rotationRate.alpha;
    var beta = event.rotationRate.beta;
    var gamma = event.rotationRate.gamma;

    if (alpha > 360) {
        $("#score").text = "alpha rotation"
    }

    document.querySelector("#acc").innerHTML = "X = " + ax + "<br>" + "Y = " + ay + "<br>" + "Z = " + az;
    document.querySelector("#acc").innerHTML += "<br>" + "alpha = " + alpha + "<br>" + "beta = " + beta + "<br>" + "gamma = " + gamma;
}
