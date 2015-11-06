/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    .factory('contacts', function(uuid, localStorageService, storageKey) { //factory only gets executed once, gets injected into any controller that asks for it
        return localStorageService.get(storageKey) || [];
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
    .directive('inThePast', function() { // method on the module that allows you to declare a new directive
        return {
            require : 'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.inThePast = function(modelValue) {
                    var today = new Date();
                    return (new Date(modelValue) <= today);
                }
            }
        };
    })
    .controller('ContactsController', function($scope, contacts) { // anuglar will set parameter contacts to whatever the factory 'contacts' returns
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, $state, contacts) {
        $scope.contact = contacts.find(function(contact) {
           return contact.id === $stateParams.id; //capture the property after : in the local url
        });
    })
    .controller('EditContactController', function($scope, $stateParams, $state, contacts, uuid, localStorageService, storageKey, contacts) {
        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id; //capture the property after : in the local url
            // return the contact for which the above expression evaluates to true
        });

        $scope.contact = angular.copy(existingContact); //so that we don't edit the actual contact - this allows cancel to work

        $scope.save = function() {
            if($scope.contact.id) {
                angular.copy($scope.contact, existingContact);
            } else {
                $scope.contact.id = uuid.v4(); //generate a version 4 universal unique id
                contacts.push($scope.contact);
            }

            localStorageService.set(storageKey, contacts);

            $state.go('list');
        }
    });


