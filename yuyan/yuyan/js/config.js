(function () {
    'use strict';

    angular.module('yuyanApp').config(['$httpProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider',
        function ($httpProvider, $urlRouterProvider, $stateProvider, $locationProvider) {
            $httpProvider.interceptors.push('authInterceptorSvc'); // Set the global $http interceptor - http header

            
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state("survey", {
                    url: "/",
                    templateUrl: "/components/survey/survey.html",
                    controller: "surveyCtrl"
                })

                .state("clientsurvey", {
                    url: "/q/:tokenUrl",
                    templateUrl: "/components/client/client.html",
                    controller: "clientCtrl"
                })

                .state("map", {
                    url: "/map/google",
                    templateUrl: "/components/map/map.html",
                    controller: "mapCtrl"
                });

            //$locationProvider.html5Mode({
            //    enabled: true,
            //    requireBase: false
            //});

        }]);



})();