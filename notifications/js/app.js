/* script for the notifications demo page */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function askPermission() {
        Notification.requestPermission(function(result) {
            if ('granted' === result) {
                showNotification('Thanks!', 'You will now see my notifications')
            }
        });
    }

    function showNotification(title, body) {
        var note = new Notification(title, {
            body: body,
            icon: 'img/notification.png'
        });

        function dismissAlert() {
            note.close();
        }

        window.setTimeout(note.close.bind(note), 3000);
        // a function is an object, one of the methods is {} which is to call the function itself,
        // bind is another function on the function object,
        // it binds the current note object to the close function
        // this tells it which note to close (in the case that you have multiple notifications open at one time)

    }

    var triggerBtn = document.getElementById('trigger');
    triggerBtn.addEventListener('click', function() {
        switch (Notification.permission) {
            case 'granted':
                showNotification('Hello', 'triggered at ' + new Date().toLocaleTimeString());
                break;
            case 'denied':
                alert('Please enable notifications!');
                break;
            default:
                askPermission();
        }
    });
});


