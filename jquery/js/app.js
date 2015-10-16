/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/

/*Jquery version of DOMContentLoaded is $(function(){});

$(function() {
    'use strict';
    $('a').attr('target', '_blank')
    $('article').hide().fadeIn(1000); // method chaining: every jquery function returns the object that the function was called on
    $('#toggle-article').click(function() {
        $('article').fadeToggle();
    });

    // returns object called promise
    // this is an asynchronous call, our code will continue to run while the data is being received from server
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f';
    $.getJSON(url)
        .then(function(data) { //.then waits for the getJSON to get all data from server
            console.log(data);
            var temperature = data.main.temp;
            $('#temp').text(Math.round(temperature));
    });

    console.log('test'); // Note test is printed to console before the data because the data hasn't been recieved yet (getJSON is asynchronous)
});
