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

app.controller('HomeCtrl', ['$scope', '$resource', '$http',
    function($scope, $resource, $http){

        //Get Rivers from local storage
        var Rivers = $resource('/rivers');
        Rivers.query(function(rivers) {
            $scope.rivers = rivers;
        });

        //usgs data collection 
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

app.controller('ViewRiverCtrl', ['$scope', '$resource', '$location', '$routeParams', '$http',
    function($scope, $resource, $location, $routeParams, $http){
        var River = $resource('/rivers/:id');
        $scope.title = $routeParams.name;
        var d = document.getElementById('data');
        var nuggets = [];
        var graphs = [];
        var urls = [];
        var gotCode = false;

        River.get({ id: $routeParams.id }, function(river){
            $scope.riverCode = river.code;
            
            getData();
        });
        
        function getData() {
            console.log($scope.riverCode);
            $http({
                method: 'GET',
                url: 'http://waterdata.usgs.gov/al/nwis/uv/?site_no='+$scope.riverCode
            }).then(function success(response){
                console.log(200);
                var dataToFilter = response.data;
                var filterStart = dataToFilter.search('<div class="stationContainer">');
                var filterEnd = dataToFilter.search('/nwisweb/local/state/al/text/02377560web.jpg');
                var filteredData = dataToFilter.slice(filterStart, filterEnd);
                
                d.innerHTML = filteredData;
                freshData();

            }, function error (err){
                console.error(err);
            });
        }
            
        function freshData() {
                var ready = false;
                var graphs = d.getElementsByClassName('iv_graph_float1');
                var headers = d.getElementsByClassName('stationContainer');
                var graphSrc = undefined;
                var graphNodes = [];
                getGraphs();
                function getHeaders() {
                      for (var i =1; i < headers.length; i++) {
                        var containers = headers[i].textContent;
                        var startSlice = containers.search('Most');
                        var endSlice = containers.search('CDT') + 3;
                        var nugget = containers.slice(startSlice, endSlice);
                        nuggets.push(nugget);
                        console.log('first');
                       }
                       $scope.src1 = graphNodes[0].src;
                       if (graphNodes.length > 1) {
                            $scope.src2 = graphNodes[1].src;
                       }
                       console.log('last');
                       setData();
                }

                function getGraphs() {
                    for (var i =0; i < graphs.length; i++) {
                        var graph = graphs[i].childNodes;
                        console.log(graph);
                        graphNodes.push(graph[1]);
                        // console.log(graphSrc);
                        // urls.push(graphSrc);
                    }                    
                    console.log(graphNodes);
                    getHeaders();
                }
        }

            //     function getGraphs() {
            //         for (var i =0; i < graphs.length; i++) {
            //             var graph = graphs[i].childNodes;
            //             var graphSrc = graph[1].currentSrc;
            //             console.log(graphSrc);
            //             urls.push(graphSrc);
            //             if (i === graphs.length) {
            //                 console.log(i);
            //             }
            //         }
            //         // console.log(urls);
                    // $scope.heightGraphSrc = urls[0];
                    // $scope.cfsGraphSrc = urls[1];
            //         // console.log('hi');

            //     }
            //     getGraphs();

            // }

            function setData(){
                $scope.height = nuggets[0];
                $scope.cfs = nuggets[1];

             
                // $scope.image1 = document.createElement('img');
                // $scope.image2 = document.createElement('img');
                
                // console.log($scope.heightGraphSrc);
                
                // $scope.image1.src = $scope.src1;
                
                // $scope.image2.setAttribute('src', $scope.src2); 

                // addImages();
                
            }

            function addImages() {
                var graph1Span = document.getElementById('graph1');
                var graph2Span = document.getElementById('graph2');
                graph1Span.appendChild($scope.image1);
                graph2Span.appendChild($scope.image2);
                console.log('boo');
            }
        }

    ]);
    
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
    