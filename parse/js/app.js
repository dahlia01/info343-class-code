/*
    script for the index.html file
*/
<<<<<<< HEAD
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
=======


//OK to call this before the DOM is ready
Parse.initialize("u8fq2u4IqxKXBa9PuPjHB40HA39gqnxMq8lKJYkG", "R9zpakOjl4dXU3quSQ9tvTwwe0uQA2IJj3GdNKTt");

//when the document is ready...
$(function() {
    'use strict';

    //define a new Task object class with Parse
    var Task = Parse.Object.extend('Task');

    //define a query for querying Task objects
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //varible to hold the current list of tasks
    var tasks = [];

    //reference to our error message alert
    var errorMessage = $('#error-message');

    //reference to the tasks list element
    var tasksList = $('#tasks-list');

    function displayError(err) {
        errorMessage.text(err.message);
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

<<<<<<< HEAD
    function showSpinnner() {
=======
    function showSpinner() {
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

<<<<<<< HEAD
    function fetchTasks() {
        showSpinnner();
        tasksQuery.find().then(onData, displayError)
            .always(hideSpinner); //param1: function to call, param2: function to call on ajax error
    }

=======
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
<<<<<<< HEAD
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
=======
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    $('#new-task-form').submit(function(evt) {
        //tell the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form 
        //with a name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');
        
        //get the current value
        var title = titleInput.val();

        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
        //so the user can enter the next new task
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
            });

        //some browsers also require that we return false to
        //prevent the default behavior
        return false;
    }); //on new task form submit

    //fetch the tasks to kick everything off...
    fetchTasks();

    //refetch the tasks every so often
    //to get new tasks created by others
    window.setInterval(fetchTasks, 10000);
}); //on doc ready
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
