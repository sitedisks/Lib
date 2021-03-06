angular.module('yuyanApp', [
    'ui.bootstrap',
    'ui.router',
    'LocalStorageModule',
    'angular-loading-bar',
    'uiGmapgoogle-maps',
    'pascalprecht.translate',
    'ngResource',
    'ngMessages',
    'rzModule'
]);

angular.module('yuyanApp').run(['$rootScope', 'localStorageService', 'yuyanAPISvc', 'yuyanAuthSvc',
    function ($rootScope, localStorageService, yuyanAPISvc, yuyanAuthSvc) {

        var localSessionToken = localStorageService.get('authorizationData');

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });

    }]);