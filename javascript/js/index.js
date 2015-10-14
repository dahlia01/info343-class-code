/**
 * application script for index.html
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function forEachElement(collection, fn) {
        var idx;
        for (idx = 0; idx < collection.length; idx++) {
            fn(collection[idx]);
        }
    }

    var clickMeButton = document.getElementById('click-me');
    clickMeButton.addEventListener('click', function() {
        var alerts = document.querySelectorAll('.alert');
        forEachElement(alerts, function(a) {
            a.style.display = 'block';

        });
    });

    var closeButtons = document.querySelectorAll('.alert .close');  //get array (or array like structure, a 'node list') of objects that match the selector
    forEachElement(closeButtons, function(button) {
        button.addEventListener('click', function() {
            button.parentElement.style.display = 'none';
        });
    });
});


