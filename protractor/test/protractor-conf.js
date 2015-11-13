exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*-spec.js'], // the tests you want to run, use * to select any files that end in -spec.js
    rootElement: 'body' //should be the element that has ng-app attribute - could be a css selector
};
