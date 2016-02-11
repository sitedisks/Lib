(function () {
	'use strict';

	angular.module('choriceApp').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function ($urlRouterProvider, $stateProvider, $locationProvider) {

        	$urlRouterProvider.otherwise("/");
        	$stateProvider
             
                .state("chorice", {
                	url: "/:tokenUrl",
                	templateUrl: "/client/components/chorice.html",
                	controller: "choriceCtrl"
                });

        	//$locationProvider.html5Mode({
        	//    enabled: true,
        	//    requireBase: false
        	//});

        }]);

})();