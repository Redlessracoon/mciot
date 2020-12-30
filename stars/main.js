$(function () {


    /******************************************************/
    /****************** Kamera **************************/
    // Reference to video element.
    var video = document.querySelector("#video");

    // Ensure cross-browser functionality.
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: true })
        .then(stream => video.srcObject = stream)
        .catch(e => document.querySelector('#camera').innerHTML = "<p>Kamera nicht benutzbar!</p>");

});
