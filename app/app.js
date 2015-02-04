angular.module('myApp',['ui.router.state','accountSettings'])
    .config(['$stateProvider', function($stateProvider){
        var home = {
            name: 'home',
            url : '/',
            views : {
                '':{
                    template: 'Hello {{name}}',
                    controller: ['$scope', function($scope){
                        $scope.name = "World";
                    }]
                },
                'foo' : {
                    template : 'YOLO'
                }
            }
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
            views : {
                '' : {
                    templateUrl : 'settings.details.html'
                },
                hint : {
                    template : 'edit your details !'
                }
            }
        };

        var quotes = {
            name : 'settings.quotes',
            parent : settings,
            url : '/quotes',
            views : {
                '' : {
                    templateUrl : 'settings.quotes.html'
                },
                hint : {
                    template : 'edit your quotes !'
                }
            }
        };

        $stateProvider.state(settings).state(details).state(quotes);
    }])
    .controller('SettingsController', ['$scope','$state', function($scope,$state){
        $scope.$state = $state;
        $scope.user = {
            name : 'Bob Loblaw',
            email : 'boblolbalh@gmail.com',
            password : '123456',
            quotes : 'Lorem ipsum dolor sit amet'
        }
    }]);