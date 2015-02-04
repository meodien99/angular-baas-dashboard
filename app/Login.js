angular.module('LoginModule',['ui.router'])
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $stateProvider.state('login', {

            url : '/login',
            templateUrl : './views/login.html',
            controller : 'LoginController'
        });
        $urlRouterProvider.otherwise('login');
    }])
    .factory('LoginFactory',['$http',function($http){
     var test = {};

     test.login = function(data){
      return $http.post('http://localhost:3000/login', data).success(function(data){
          console.log(data);
      });
     };

     return test;
    }])
    .controller('LoginController',['$scope','LoginFactory', function($scope, LoginFactory){
        $scope.login = function(){
         var email = $scope.email;
         var password = $scope.password;

          if( (!email || email === '') && (!password || password === '') )
           return;

           var loginData = {email:email, password:password};
           LoginFactory.login(loginData);

        }
    }])
;
