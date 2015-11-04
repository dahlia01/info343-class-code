/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    .factory('contacts', function(uuid, localStorageService, storageKey) { //factory only gets executed once, gets injected into any controller that asks for it
        return [{
            id: 'default-delete-me',
            fname: 'Fred',
            lname: 'Flintstone',
            phone: '206-555-1211',
            dob: '1/1/1900'
        }];
    })
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('list', {
                url: '/contacts', //local url
                templateUrl: 'views/contacts-list.html',
                controller: 'ContactsController'
            })
            .state('detail', {
                url: '/contacts/:id',
                templateUrl: 'views/contact-detail.html',
                controller: 'ContactDetailController'
            })
            .state('edit', {
                url: '/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'
            });
        $urlRouterProvider.otherwise('/contacts'); // url will always reset to end with /contacts unless it fits one of the paths defined above

    })
    .controller('ContactsController', function($scope, contacts) { // anuglar will set parameter contacts to whatever the factory 'contacts' returns
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, $state, contacts) {
        $scope.contact = contacts.find(function(contact) {
           return contact.id === $stateParams.id; //capture the property after : in the local url
        });
    })
    .controller('EditContactController', function($scope, $stateParams, $state, contacts) {
        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id; //capture the property after : in the local url
            // return the contact for which the above expression evaluates to true
        });

        $scope.contact = angular.copy(existingContact); //so that we don't edit the actual contact - this allows cancel to work

        $scope.save = function() {
            angular.copy($scope.contact, existingContact);
            $state.go('list');
        }
    });


