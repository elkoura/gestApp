var app = angular.module('gestApp', ['ngRoute', 'ngResource',"ui.bootstrap"]).run(function($rootScope, $http) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
  $rootScope.current_tab = 1;
	$rootScope.setCurrent = function(tab){
    $rootScope.current_tab = tab;
  };
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});

//------------------------------------------------------------------------------------

app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'authController'
		})
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    })

		.when('/ressources', {
			templateUrl: 'ressources.html',
			controller: 'mainController'
		})

    .when('/projets', {
      templateUrl: 'projets.html',
      controller: 'mainController'
    })
		
    .when('/offres', {
      templateUrl: 'offres.html',
      controller: 'mainController'
    })
		//otherwise
		.otherwise({
	        redirectTo: '/'
        });
});

app.factory('infoService', function($resource){
	return $resource('/api/infos/:id');
});

app.factory('collabService', function($resource){
  return $resource('/api/collabs/:id');
});

//---------------------------------------------------------------------------------------

app.controller('mainController', function(infoService, collabService, $scope, $http, $rootScope, $location){
  $scope.searchCriteria="";
	$scope.infos = infoService.query();
  $scope.collabs = collabService.query();
  $scope.searchText = '';
  $scope.error_message = '';
  $scope.selected = '$';


  $scope.user = {username: '', password: ''};
  $scope.listChoix = {
                      ressources: [{ name:'Nom', value: 'Name'},
                                   { name:'Grade', value: 'Grade'},
                                   { name:'Dispo', value: 'Disponibility'}],
                      projets:    [{ name:'Collaborateur', value: 'Employee_name'},
                                   { name:'Projet', value: 'Project_name'},
                                   { name:'Client', value: 'Customer_name'}],
                      offres:     [{ name:'Nom', value: 'Customer_name'},
                                   { name:'Projet', value: 'Project_name'}]            
                      };

  $scope.urls = [ 'caroline.couillard0.jpg',
                    'Cyril.marcant.jpg', 
                    'Hsiao.li.lung.jpg', 
                    'Julien Said.png', 
                    'Laura.el.bouzaidi.cheikhi.JPG', 
                    'sylvain.tailleur.jpg', 
                    'Thierry Rousseau.png'];
 $scope.image = "./images/Photos/"+$scope.urls[6];
  $scope.imgUrl = function() {
    var index = Math.floor((Math.random()*6));
    return $scope.image = "./images/Photos/"+$scope.urls[index];
  }
 
   $scope.vider = function(){
    $scope.searchText = '';
  };
 
  $scope.findGrade = function(id_Collab){
    for(var i = 0 ;i< $scope.infos.length; i++)
      if ($scope.infos[i].Employee_number == id_Collab) 
        return $scope.Grade = $scope.infos[i].Grade ;
     return "NC";
  }; 
	 // $scope.fprojet = findPro($scope.numb);
});

//---------------------------------------------------------------------------------------

app.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user = {username: '', password: ''};
  $scope.new_user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/ressources');
        
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.new_user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/ressources');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

});
































// $scope.Filtrer = function(){
// alert("totoo")
// };


// var updateClock = function() {
// $scope.clock = new Date();
// };
// setInterval(function() {
// $scope.$apply(updateClock);
// }, 1000);
// updateClock();



// $scope.random = function() {
//     var value = Math.floor((Math.random() * 100) + 1);
//     var type;

//     if (value < 25) {
//       type = 'success';
//     } else if (value < 50) {
//       type = 'info';
//     } else if (value < 75) {
//       type = 'warning';
//     } else {
//       type = 'danger';
//     }

//     $scope.showWarning = (type === 'danger' || type === 'warning');

//     $scope.dynamic = value;
//     $scope.type = type;
//   };
//   $scope.random();

//   $scope.randomStacked = function() {
//     $scope.stacked = [];
//     var types = ['success', 'info', 'warning', 'danger'];

//     for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
//         var index = Math.floor((Math.random() * 4));
//         $scope.stacked.push({
//           value: Math.floor((Math.random() * 30) + 1),
//           type: types[index]
//         });
//     }
//   };
//   $scope.randomStacked();