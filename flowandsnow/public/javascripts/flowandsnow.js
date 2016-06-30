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
            templateUrl: 'partials/viewRiver.html',
            controller: 'ViewRiverCtrl'
        })
        .when('/remove-river/:name/:id', {
            templateUrl: 'partials/deleteRiver.html',
            controller: 'RemoveRiverCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

//HOMEPAGE
app.controller('HomeCtrl', ['$scope', '$resource', '$http',
    function($scope, $resource, $http){

        //Get Rivers from local storage
        var Rivers = $resource('/rivers');
        Rivers.query(function(rivers) {
            $scope.rivers = rivers;
        });

        //usgs alabama rivers 
        // $http({
        //     method: 'GET',
        //     url: 'http://waterdata.usgs.gov/al/nwis/current/?type=flow'
        // }).then(function success(response){
        //     console.log(200);
        //     console.log(response.data);
        // }, function error (err){
        //     console.error(err);
        // });
}]);

//ADD RIVER PAGE  
app.controller('AddRiverCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.title = 'Add a River';
        $scope.save = function(){
            var Rivers = $resource('/rivers');
            Rivers.save($scope.river, function(){
                $location.path('/');
            });
        };
}]);

//ViEW RIVER PAGE
app.controller('ViewRiverCtrl', ['$scope', '$resource', '$location', '$routeParams', '$http',
    function($scope, $resource, $location, $routeParams, $http){
        
        $scope.title = $routeParams.name;       //river name as title

        //initalize variables
        var River = $resource('/rivers/:id');
        var d = document.getElementById('data');
        var nuggets = [];
        var graphs = [];
        var urls = [];

        //Get river code to access unigue data from usgs site
        River.get({ id: $routeParams.id }, function(river){
            $scope.riverCode = river.code;
            getData();
        });
        
        //Gather and refine HTML from live page
        function getData() {
            $http({
                method: 'GET',
                url: 'http://waterdata.usgs.gov/al/nwis/uv/?site_no='+$scope.riverCode
            }).then(function success(response){
                console.log(200);
                var dataToFilter = response.data;
                var filterStart = dataToFilter.search('<div class="stationContainer">');
                var filteredData = dataToFilter.slice(filterStart);
                d.innerHTML = filteredData;     //Add filtered HTML to hidden DOM
                freshData();                    //Begin data injection
            }, function error (err){
                console.error(err);
            });
        }
            
        function freshData() {
                //initalize variables
                var graphs = d.getElementsByClassName('iv_graph_float1');      //retrieves all graphs from hidden DOM
                var headers = d.getElementsByClassName('stationContainer');    //retrieves all headers from hidden DOM
                var graphSrc = undefined;
                $scope.graphNodes = [];

                getGraphs();    //Must get graphs first or function will not finish in time

                //refine header content and setData()
                function getHeaders() {
                    for (var i =1; i < headers.length; i++) {
                        var containers = headers[i].textContent;
                        var startSlice = containers.search('Most');
                        var endSlice = containers.search('CDT') + 3;
                        var nugget = containers.slice(startSlice, endSlice); //pretty data nugget
                        nuggets.push(nugget);
                    }
                    setData();      
                }

                //acquire image nodes for url extraction and getHeaders();
                function getGraphs() {
                    for (var i =0; i < graphs.length; i++) {
                        var graph = graphs[i].childNodes;
                        $scope.graphNodes.push(graph[1]);
                    }                    
                    getHeaders();
                }

        }

        //After freshData() is collected setData()
        function setData(){
            $scope.src1 = $scope.graphNodes[0].src;
            if ($scope.graphNodes.length > 1) {         //Some pages only have one graph
                $scope.src2 = $scope.graphNodes[1].src;
            }
            $scope.height = nuggets[0];
            $scope.cfs = nuggets[1];
        }

}]);
    
// app.controller('EditRiverCtrl', ['$scope', '$resource', '$location', '$routeParams',
//     function($scope, $resource, $location, $routeParams){
//         $scope.verb = 'Edit';	
//         var Rivers = $resource('/rivers/:id', { id: '@_id' }, {
//             update: { method: 'PUT' }
//         });

//         Rivers.get({ id: $routeParams.id }, function(river){
//             $scope.river = river;
//         });

//         $scope.save = function(){
//             Rivers.update($scope.river, function(){
//                 $location.path('/');
//             });
//         }
//     }]);


//DELETE RIVER PAGE    
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
    