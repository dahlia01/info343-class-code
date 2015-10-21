/*
    script for the index.html file
*/
Parse.initialize("rIyJWkPEIG5e14WR8Wc8VwjideLsr4ppUA0KwMqZ", "3i2xvpOxTM8mz3QheAyYVnefkw9cShSxtrUNHPpF");
//Parse.initialize("HwGkNK09YRPy3ZajicPwpZMfX9vqCyc4ghFl2eh7", "14BQF3zAPvaOR1sh6aEzXX5Wk1LTnBFQopjr1Rbj");

$(function() {
    'use strict';

    /* New Task class for parse */
    var Task = Parse.Object.extend('Task'); /* declaring an object that acts like a class */
    /* new query that will return all tasks order by createdAt */
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    // reference to the task list element
    var tasksList = $('#tasks-list');

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
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val(''); // clears the title input
        });

        return false;
    });

    // go and fetch tasks from Parse
    fetchTasks();

    window.setInterval(fetchTasks, 3000); //repeatedly call function every 3 seconds
});