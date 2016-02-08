(function(){
	'use strict';
	
	angular.module('yuyanApp').config(['$httpProvider', function ($httpProvider) {
	    $httpProvider.interceptors.push('authInterceptorSvc'); // Set the global $http interceptor - http header
	}]);

	/*
	angular.module('yuyanApp')
		.config(['uiGmapGoogleMapApiProvider', 
			function(uiGmapGoogleMapApiProvider){
				//    key: 'your api key',
				v: '3.20'
			 
			}]);
	*/
	
})();