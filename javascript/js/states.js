/**
 * application script for the states.html
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function addStates(states, listElem) {
        listElem.innerHTML = '';
        states.forEach(function(state) {
            //console.log(state);

            var li = document.createElement('li');
            li.textContent = state.name; // sets the internal content, not attached to document yet
            listElem.appendChild(li); // append li element to ul
        });
    }

    var statesFilter = document.getElementById('state-filter-field');
    statesFilter.addEventListener('keyup', function() {
       var filter = this.value.toLowerCase();
       //console.log(filter);
        var filteredStates = usaStates.filter(function(state) {
           return state.name.toLowerCase().indexOf(filter) >= 0;
        });
        addStates(filteredStates, statesUl);
    });

    var statesUl = document.getElementById('states-list');
    addStates(usaStates, statesUl); // get the ul element with states-list id

});