(function () {
    'use strict';

    angular.module('yuyanApp').service('yuyanAPISvc', ['$resource', 'endpoint', function ($resource, endpoint) {
        
        // endpoint.localAPI: http://localhost:5613/
        var userAPI = endpoint.localAPI + 'users';
        var surveyAPI = endpoint.localAPI + 'surveys';
        
        var service = {
            userCheckSvc: userCheckSvc,
            userLoginSvc: userLoginSvc,
            userRegisterSvc: userRegisterSvc,
            surveyGetByIdSvc: surveyGetByIdSvc
        };

        return service;

        function userCheckSvc() {
            return $resource(userAPI + '/check');
        }

        function userLoginSvc() {
            return $resource(userAPI + '/login');
        }

        function userRegisterSvc() {
            return $resource(userAPI + '/register');
        }

        function surveyGetByIdSvc() {
            return $resource(surveyAPI + '/:surveyId', { surveyId: '@id' });
        }

    }]);

})();