/*
    script for the index.html file
*/
Parse.initialize("rIyJWkPEIG5e14WR8Wc8VwjideLsr4ppUA0KwMqZ", "3i2xvpOxTM8mz3QheAyYVnefkw9cShSxtrUNHPpF");

//Parse.initialize("rnPVLff4nz9OW4qu9GnkdD18TV4AzzxfLducfGQh", "x62CpPBIqQwvj2nW1eRSo50VWvUMxFSoyJG8NuVB"); // K

//Parse.initialize("HwGkNK09YRPy3ZajicPwpZMfX9vqCyc4ghFl2eh7", "14BQF3zAPvaOR1sh6aEzXX5Wk1LTnBFQopjr1Rbj"); // michelle

$(function() {
    'use strict';

    /* New Task class for parse */
    var Task = Parse.Object.extend('Task'); /* declaring an object that acts like a class */
    /* new query that will return all tasks order by createdAt */
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');
    tasksQuery.notEqualTo('done', true);

    // reference to the task list element
    var tasksList = $('#tasks-list');

    //referece to our rating element
    var ratingElem = $('#rating');

    // reference to the eroor message alert
    var errorMessage = $('#error-message');

    var tasks = [];

    function displayError(err) {
        errorMessage.text(err.message); // .text does not interpret what you pass as html - it interprets it as a literal string, whereas .html does
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinnner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchTasks() {
        showSpinnner();
        tasksQuery.find().then(onData, displayError)
            .always(hideSpinner); //param1: function to call, param2: function to call on ajax error
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
            var li = $(document.createElement('li'))
                .text(task.get('title'))
                .addClass(task.get('done') ? 'completed-tasks' : '')
                .appendTo(tasksList)
                .click(function() {
                    task.set('done', !task.get('done')) // toggle the done property between true and false
                    task.save().then(renderTasks, displayError); // call render and not fetchTasks because we don't want to get them from the server again
                });

            $(document.createElement('span'))
                .raty({
                    readOnly: true,
                    score: (task.get('rating') || 1), //default rating of 1 star
                    hints: ['crap', 'awful', 'okay', 'nice', 'awesome']
                })  //takes options object
                .appendTo(li);
        });
    }

    function showMessage(message) {
        message = message || 'Hello'; // set message to message if it has a value, and hello if it doesn't
        alert(message);
    }

    /*showMessage();
    showMessage('HI');

    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();*/



        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);

        task.set('rating', ratingElem.raty('score'));


        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val(''); // clears the title input
            ratingElem.raty('set', {});
        });

        return false;
    });

    ratingElem.raty();

    // go and fetch tasks from Parse
    fetchTasks();

    window.setInterval(fetchTasks, 10000); //repeatedly call function every 3 seconds
});