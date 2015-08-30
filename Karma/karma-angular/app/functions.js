//http://blog.jobbole.com/
	'use strict';

	var app = angular.module('siteApp',[]); // declare the angular module
	
	app.controller('mainCtrl', function($scope){
		$scope.text = 'Hello World!';
		
	});
	
	function reverse(name){
		return name.split("").reverse().join("");
	}

	function sayHello(name){
		return "Hello " + name;
		
	}

