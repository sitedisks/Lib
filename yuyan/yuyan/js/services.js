(function () {
    'use strict';

    angular.module('yuyanApp').service('yuyanAPISvc', ['$resource', 'endpoint',
        function ($resource, endpoint) {

            // endpoint.localAPI: http://localhost:5613/
            var userAPI = endpoint.localAPI + 'users';
            var surveyAPI = endpoint.localAPI + 'surveys';

            var service = {
                sessionCheckSvc: sessionCheckSvc,
                userCheckSvc: userCheckSvc,
                userLoginSvc: userLoginSvc,
                userLogoutSvc: userLogoutSvc,
                userRegisterSvc: userRegisterSvc,
                surveySaveSvc: surveySaveSvc,
                surveyGetByIdSvc: surveyGetByIdSvc,
                surveyGetBySession: surveyGetBySession
            };

            return service;

            function sessionCheckSvc() {
                return $resource(userAPI + '/status');
            }

            function userCheckSvc() {
                return $resource(userAPI + '/check');
            }

            function userLoginSvc() {
                return $resource(userAPI + '/login');
            }

            function userLogoutSvc() {
                return $resource(userAPI + '/logout');
            }

            function userRegisterSvc() {
                return $resource(userAPI + '/register');
            }

            function surveySaveSvc() {
                return $resource(surveyAPI);
            }

            function surveyGetByIdSvc() {
                return $resource(surveyAPI + '/:surveyId', { surveyId: '@id' });
            }

            function surveyGetBySession() {
                return $resource(surveyAPI + '/all');
            }
        }]);

})();