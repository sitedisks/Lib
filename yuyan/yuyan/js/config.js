(function () {
    'use strict';

    angular.module('yuyanApp').config(['$httpProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider', 'cfpLoadingBarProvider',
        function ($httpProvider, $urlRouterProvider, $stateProvider, $locationProvider, cfpLoadingBarProvider) {
            $httpProvider.interceptors.push('authInterceptorSvc'); // Set the global $http interceptor - http header
            cfpLoadingBarProvider.includeSpinner = false;  // angular loading bar no spinner
            
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state("survey", {
                    url: "/",
                    templateUrl: "/components/survey/survey.html",
                    controller: "surveyCtrl"
                })

                .state("manage", {
                    url: "/manage",
                    templateUrl: "/components/manage/manage.html",
                    controller: "manageCtrl"
                })

                .state("question", {
                    url: "/question",
                    templateUrl: "/components/manage/manage.question.html",
                    controller: "manageQuestionCtrl",
                    params: {
                        survey: null
                    }
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