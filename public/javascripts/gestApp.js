var app = angular.module('gestApp', ['ngRoute', 'ngResource']).run(function($rootScope, $http) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})

		// .when('/infos', {
		// 	templateUrl: 'infos.html',
		// 	controller: 'mainController'
		// })
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		})
		//otherwise
		.otherwise({
	        redirectTo: '/'
        });
});

app.factory('infoService', function($resource){
	return $resource('/api/infos/:id');
});

app.controller('mainController', function(infoService, $scope, $http, $rootScope, $location){$scope.searchCriteria="";
	$scope.infos = infoService.query();
// $scope.Filtrer = function(){
// alert("totoo")
// };
$scope.searchText = '';

$scope.vider = function(){
$scope.searchText = '';
};

	$scope.user = {username: '', password: ''};
  	$scope.error_message = '';
    $scope.listChoix = ['Collaborateur', 'Projet', 'Client', '...'];
	$scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
        
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
	
});

app.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});