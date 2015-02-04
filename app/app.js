angular.module('myApp',['ui.router.state'])
    .config(['$stateProvider', function($stateProvider){
        var home = {
            name: 'home',
            url : '/',
            template: 'Hello {{name}}',
            controller: ['$scope', function($scope){
                $scope.name = "World";
            }]
        };



        $stateProvider.state(home);
    }]);

angular.module('accountSettings',['ui.router.state'])
    .config(['$stateProvider', function($stateProvider){
        var settings = {
            name : 'settings',
            abstract : true,
            url :'/settings',
            templateUrl: 'settings.html',
            controller : 'SettingsController'
        };

        var details = {
            name : 'settings.details',
            parent: settings,
            url :'',
            templateUrl : 'settings.details.html'
        };

        var quotes = {
            name : 'settings.quotes',
            parent : settings,
            url : '/quotes',
            templateUrl : 'settings.quotes.html'
        };

        $stateProvider.state(settings).state(details).state(quotes);
    }])
    .controller('SettingsController', ['$scope', function($scope){
        $scope.user = {
            name : 'Bob Loblaw',
            email : 'boblolbalh@gmail.com',
            password : '123456',
            quotes : 'Lorem ipsum dolor sit amet'
        }
    }]);