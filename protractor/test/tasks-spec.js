/* Test script for the Tasks List app */

//lang that protractor uses is same lang that jasmine defines
//bdd
//sounds like requirements for application....i.e. "The tasks app must allow us to add a task" or "must allow us to mark a task as done"
// so the console log is pretty much in plain english and we can easily see what is failing

describe('the tasks app', function() {
    var taskTitleInp = element(by.model('newTask.title')); // get reference to input that has ng-model attribute set to 'newTask.title'
    var addTaskBtn = element(by.buttonText('Add Task'));
    var tasksList = element.all(by.repeater('task in tasks'));
    var requiredMsg = $('.title-required-error');


    function addTask(title) {
        taskTitleInp.sendKeys(title);
        addTaskBtn.click();
    }

    function addMultipleTasks(num) {
        var idx;
        for (idx = 0; idx < num; ++idx) {
            addTask('Task ' + idx);
        }
    }

    // can also have an afterEach function
    beforeEach(function() {//so you don't have to type browser.getTitle() into every it test
        // + browser page refreshes before each it test
        // so you don't have to worry about the tests being dependent on each other
        // ex) you can test that the count of tasksList = 1 in multiple tests
        browser.get('http://localhost:8000');
    });


    it('must have the proper page title', function() {
        expect(browser.getTitle()).toEqual('My Tasks'); //test a condition, toEqual() is a jasmine checker
    });

    it('must add a task', function() {
        var title = 'Learn Protractor';
        addTask(title);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('it must add a task hitting enter', function() {
        var title = 'Learn Protractor';
        taskTitleInp.sendKeys(title);
        taskTitleInp.sendKeys(protractor.Key.ENTER);
        expect(tasksList.count()).toEqual(1); // note beforeEeach
        expect(tasksList.get(0).getText()).toEqual(title);
    });

    it('must clear the title after adding', function() {
        addTask('box should get cleared');
        expect(taskTitleInp.getAttribute('value')).toEqual('');
        // for some reason getText doesn't work for inputs, so use the value attribute instead
    });

    it('must add multiple tasks', function() {
        addMultipleTasks(20);
        expect(tasksList.count()).toEqual(20);
    });

    it('must show required validation error', function() {
        expect(requiredMsg.isPresent()).toEqual(false);
        taskTitleInp.sendKeys('abc');
        taskTitleInp.clear();
        expect(requiredMsg.isPresent()).toEqual(true);
        taskTitleInp.sendKeys('abc');
        expect(requiredMsg.isPresent()).toEqual(false);
    });

    it('must disable add task button with blank title', function() {
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
        taskTitleInp.sendKeys('abc');
        expect(addTaskBtn.getAttribute('disabled')).toEqual(null);
        taskTitleInp.clear();
        taskTitleInp.sendKeys('     ');
        expect(addTaskBtn.getAttribute('disabled')).toEqual('true');
    });

    it('must toggle done with click', function() {
        addTask('test style class');
        addTask('not marked as done');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        expect(tasksList.get(0).getAttribute('class'))
            .toContain('completed-task');
        expect(tasksList.get(1).getAttribute('class'))
            .not.toContain('completed-task');
    });

    it('must purge completed tasks', function() {
        addTask('Task 1');
        addTask('Task 2');
        expect(tasksList.count()).toEqual(2);
        tasksList.get(0).click();
        element(by.buttonText('Purge Completed Tasks')).click();
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual('Task 2');
    });

});