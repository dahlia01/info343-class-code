
angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chat.firebaseio.com/messages')
    .controller('ChatController', function($scope, $firebaseArray,firebaseUrl) {
        //create reference to the Firebase
        var ref = new Firebase(firebaseUrl);
        ref.limitToLast(1000);
        $scope.messages = $firebaseArray(ref);

        // initialize form fields
        $scope.name = null;
        $scope.body = null;

        $scope.sendMessages = function() {
            //adds a new object ot the array and synchronizes
            // with the server
            $scope.messages.$add({
                name: $scope.name,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP
            });

            $scope.body = null;
        }; //sendMessage()
    });
