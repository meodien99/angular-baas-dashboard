angular.module('flapperNews', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider,$urlRouterProvider) {
            $stateProvider
                .state('home',{
                    resolve: {
                        postPromise: ['postsFactory', function(posts){
                            return posts.getAll();
                        }]
                    },
                    url:'/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                })
                .state('posts', {
                    resolve:{
                        post : ['$stateParams', 'postsFactory', function($stateParams, posts){
                            return posts.get($stateParams.id);
                        }]
                    },
                    url:'/posts/{id}',
                    templateUrl:'/posts.html',
                    controller: 'PostsCtrl'
                })
            ;

            $urlRouterProvider.otherwise('home');
        }])
    .factory('postsFactory', ['$http',function($http){
        var o = {
            posts:[]
        };
        o.getAll = function(){
            return $http.get('/posts').success(function(data){
                angular.copy(data, o.posts);
            });
        };
        o.create = function(post){
            return $http.post('/posts', post).success(function(data){
                o.posts.push(data);
            });
        };
        o.upvote = function(post){
            return $http.put('/posts/'+ post._id + '/upvote').success(function(data){
                post.upvotes += 1;
            });
        };
        o.get = function(id){
            return $http.get('/posts/'+id).then(function(res){
                return res.data
            });
        };
        o.addComment = function(id, comment){
            return $http.post('/posts/' + id + '/comments', comment);
        };
        o.upvoteComment = function(post, comment){
            return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote').success(function(data){
                comment.upvotes += 1;
            });
        };
        return o;
    }])
    .controller('MainCtrl', ['$scope','postsFactory', function($scope, posts){
        $scope.test = "Hello World !";
        $scope.posts = posts.posts;

        /*$scope.posts.push({
         title: $scope.title,
         link: $scope.link,
         upvotes:0,
         comments: [
         {author:'A1', body:'Cool !', upvotes:0},
         {author:'A2', body:'Cool hm Great!', upvotes:0},
         {author:'A2', body:'Cool hmm Smt wrong!', upvotes:0}
         ]
         });*/
        $scope.addPost = function(){
            if(!$scope.title || $scope.title === '') { return; }
            posts.create({
                title:$scope.title,
                link:$scope.link
            });
            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvote = function(post){
            posts.upvote(post);
        };

    }])
    .controller('PostsCtrl',['$scope','postsFactory','post', function($scope, posts, post){
        $scope.post = post;

        $scope.addComment = function(){
            if($scope.body === ''){
                return;
            }
            posts.addComment(post._id, {
                body: $scope.body,
                author : 'user'
            }).success(function(comment){
                $scope.post.comments.push(comment);
            });
            $scope.body = '';
        };
        $scope.incrementUpvote = function(comment){
            posts.upvoteComment(post, comment);
        };
        $scope.downVote = function(comment){
            comment.upvotes -=1;
        }
    }])
;

/*
 angular.module('LoginModule',['ui.router'])
 .config(['$httpProvider',function($httpProvider){
 var interceptor = ['$rootScope', '$q', function(scope, $q){
 function success( response ) {
 return response;
 }

 function error ( response ) {
 if( response.status == 401 ) {
 var deffered = $q.defer();
 scope.$broadcast('event:unauthorized');
 return deffered.promise;
 }
 return $q.reject(response);
 }

 return function( promise ) {
 return promise.then(success, error);
 }
 }];
 $httpProvider.responseInterceptors.push( interceptor );
 }])
 .directive('login', function(){
 return {
 restrict : 'E',
 templateUrl : 'partials/login.html',
 link : function(scope, element, attrs){
 scope.$on('event:unauthorized', function(event){
 scope.show = true;
 });

 scope.$on('event:authenticated', function(event){
 scope.show = false;
 });

 var button = angular.element(element.find('button'));
 button.bind('click', function(){
 scope.$emit('event:authenticated', scope.username, scope.password)
 });
 }
 };
 })
 .run(['$rootScope', '$http', 'TokenHandler', function(scope, $http, tokenHandler){
 scope.$on( 'event:authenticate', function(event, username, password){
 var payload = {
 username : username,
 password : password,
 grant_type : 'password',
 client_id : 'your-client-id',
 client_secret : 'client-secret'
 };

 $http.post('http://localhost:3001/oauth2/token', payload).success(function(data){
 tokenHandler.set(data.access_token);
 scope.$broadcast('event:authenticated')
 })
 })
 }])
 .controller('LoginController',[]);*/