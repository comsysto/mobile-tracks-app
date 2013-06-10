'use strict';
angular.module('csTracksApp', []);

angular.module('csTracksApp', []).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/home', {templateUrl: 'partials/home.html',   controller: HomeCtrl}).
            when('/tracks', {templateUrl: 'partials/tracks.html',   controller: TracksCtrl}).
            when('/track/:trackId', {templateUrl: 'partials/track.html',   controller: TrackCtrl}).
            otherwise({redirectTo: '/home'});
    }]);

function HomeCtrl($scope, $routeParams, $http) {
    $scope.foo = 'bar';
}
//HomeCtrl.$inject = ['$scope', '$routeParams', '$http'];

function TracksCtrl($scope, $routeParams, $http) {
    $http.get('../services/track/foruser').success(function(data) {
        $scope.tracks = data;
    });
}
//TracksCtrl.$inject = ['$scope', '$routeParams', '$http'];

function TrackCtrl($scope, $routeParams, $http) {
    $http.get('../services/track/foruser').success(function(data) {
        $scope.trackId = $routeParams.trackId;
    });
}
//TrackCtrl.$inject = ['$scope', '$routeParams', '$http'];

