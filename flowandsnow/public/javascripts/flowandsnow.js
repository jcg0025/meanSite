var app = angular.module('flowandsnow', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-river', {
            templateUrl: 'partials/addRiver.html',
            controller: 'AddRiverCtrl'
        })
        .when('/river/:name/:id', {
            templateUrl: 'partials/addRiver.html',
            controller: 'EditRiverCtrl'
        })
        .when('/remove-river/:name/:id', {
            templateUrl: 'partials/deleteRiver.html',
            controller: 'RemoveRiverCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', '$http',
    function($scope, $resource, $http){

        //Get Rivers
        var Rivers = $resource('/rivers');
        Rivers.query(function(rivers) {
            $scope.rivers = rivers;
        });

        //usgs data collection 
        $http({
            method: 'GET',
            url: 'http://waterdata.usgs.gov/al/nwis/current/?type=flow'
        }).then(function success(response){
            console.log(200);
            console.log(response.data);
        }, function error (err){
            console.error(err);
        });
    }]);
    
app.controller('AddRiverCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.verb = 'Add';
        $scope.save = function(){
            var Rivers = $resource('/rivers');
            Rivers.save($scope.river, function(){
                $location.path('/');
            });
        };
    }]);
    
app.controller('EditRiverCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        $scope.verb = 'Edit';	
        var Rivers = $resource('/rivers/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Rivers.get({ id: $routeParams.id }, function(river){
            $scope.river = river;
        });

        $scope.save = function(){
            Rivers.update($scope.river, function(){
                $location.path('/');
            });
        }
    }]);
    
app.controller('RemoveRiverCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Rivers = $resource('/rivers/:id');
        $scope.name = $routeParams.name;
        $scope.delete = function() {
            Rivers.delete({ id: $routeParams.id }, function(){
               $location.path('/'); 
            });
        }
    }]);
    