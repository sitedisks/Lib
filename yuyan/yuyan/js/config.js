(function () {
    'use strict';

    angular.module('yuyanApp').config(['$httpProvider', '$urlRouterProvider', '$stateProvider',
        function ($httpProvider, $urlRouterProvider, $stateProvider) {
            $httpProvider.interceptors.push('authInterceptorSvc'); // Set the global $http interceptor - http header

            //$locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state("survey", {
                    url: "/",
                    templateUrl: "/components/survey/survey.html",
                    controller: "surveyCtrl"
                })
                .state("map", {
                    url: "/map",
                    templateUrl: "/components/map/map.html",
                    controller: "mapCtrl"
                });

            

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