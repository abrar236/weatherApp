// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })

    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })


    
});

// Service
weatherApp.service('cityService',function(){

	this.city= "New York,NY";
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope','cityService', function($scope,cityService) {

$scope.city=cityService.city;


$scope.$watch('city',function(){

	cityService.city=$scope.city;
});
    
}]);

weatherApp.controller('forecastController', ['$scope','cityService','$resource','$routeParams' ,function($scope,cityService,$resource,$routeParams) {

	

	$scope.days=$routeParams.days || '2';

	$scope.city=cityService.city;

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
                                  { APPID: '2de143494c0b295cca9337e1e96b00e0',
                                   callback: "JSON_CALLBACK"
                                   
                                  }, 


                                  { get: { method: "JSONP" }});

	

	
	$scope.weatherResult=$scope.weatherAPI.get({q:$scope.city,cnt:$scope.days});

	$scope.convertToFarhenheit = function(degK) {


		return Math.round((1.8 * (degK -273)) + 32);
	}

	
    
}]);