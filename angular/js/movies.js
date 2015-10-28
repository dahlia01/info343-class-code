angular.module('Movies', [])
    .controller('MoviesController', function($scope, $http) { //$http used to do ajax requests
        $http.get('data/movies-2014.min.json')
            .then(function(results) {
               $scope.movies = results.data;
            });
    });