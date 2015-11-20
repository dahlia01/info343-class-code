
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia;

    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var videoStream;
    var mouseIsDown = false;

    navigator.getUserMedia({video: true}, function(stream) {
        //dynamic object that returns constant stream of video images
        videoStream = stream;
        video.src = window.URL.createObjectURL(stream);

    }, function(err) {
        console.error(err);
    });

    video.addEventListener('click', function() {
        if(videoStream) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            ctx.drawImage(video, 0, 0);
        }
    });

    canvas.addEventListener('mousedown', function(evt) {
        console.log('mousedown');
        var x = evt.clientX - canvas.offsetLeft;
        var y = evt.clientY - canvas.offsetTop + window.scrollY;
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth= 5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        mouseIsDown = true;
    });

    canvas.addEventListener('mousemove', function(evt) {
        var x = evt.clientX - canvas.offsetLeft;
        var y = evt.clientY - canvas.offsetTop + window.scrollY;

        if (mouseIsDown) {
            ctx.lineTo(x, y);
            ctx.stroke();
            console.log(mouseIsDown);
        }
    });

    canvas.addEventListener('mouseup', function(evt) {
        mouseIsDown = false;
    });

    document.querySelector('#btnSnapShot').addEventListener('click', function() {
        console.log('snapshot');
        document.querySelector('img').src = canvas.toDataURL();
    });

});

