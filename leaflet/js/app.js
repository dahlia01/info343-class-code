/*
    script file for index.html
    dependencies: leaflet, jquery

    Open Street Maps tile layer URL template:
    http://{s}.tile.osm.org/{z}/{x}/{y}.png

    attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
*/

$(function() {
    'use strict';

    function createMap(loc, zoom) {
        var map = L.map('map').setView(loc, zoom); // L.map() takes the id of element that you want to contain the map.


        //Note: google maps returns longetude west. To make this work with mapping software, it needs a negative sign in front.
        // tilelayer sits on top of map object, map provides zooming effects
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { //template url to fetch tiles from - leaflet library will replace {z}/{x}/{y}
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // mapping software returns small tiles so that when you pan and scroll they can get the tiles for that region (vs grabbing a gigantic image)

        L.circleMarker(loc).addTo(map).bindPopup('<h2>Hello</h2>');

    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            createMap([pos.coords.latitude, pos.coords.longitude], 15);
        });
    } else {
        createMap([47.6097, -122.3331], 12)
    }


    // make sure you handle the error code (success & error)  - error is when user hits 'block' instead of 'allow'
});



