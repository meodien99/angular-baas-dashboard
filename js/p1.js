myApp.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/state1');

    //set up state
    $stateProvider
        .state('state1', {
            url: '/state1',
            templateUrl : 'partials/state1.html'
        })
        .state('state1.list', {
            url :'/list',
            templateUrl : 'partials/state1.list.html',
            controller :  ['$scope', function($scope){
                $scope.items = ["A","LIST","OF","ITEM"];
            }]
        })
        .state('state2', {
            url :'/state2',
            templateUrl : 'partials/state2.html'
        })
        .state('state2.list', {
            url: '/state2.list',
            templateUrl : 'partials/state2.list.html',
            controller : ['$scope', function($scope){
                $scope.things = ["A","SET","OF","THINGS"]
            }]
        });
}]);