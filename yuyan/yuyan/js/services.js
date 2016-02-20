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
                surveyCrudSvc: surveyCrudSvc,
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

            // survey
            function surveyGetBySession() {
                return $resource(surveyAPI + '/all');
            }

            function surveyCrudSvc() {
                return $resource(surveyAPI + '/:surveyId',
                    { surveyId: '@sid' },
                    { update: { method: 'PUT' } });
            }

            // queston 
            function questionCrubSvc() {
                return $resource(surveyAPI + '/:surveyId/questions/:questionId',
                    { surveyId: '@sid', questionId: '@qid' },
                    { update: { method: 'PUT' } })
            }

            // item
            function itemCrubSvc() {
                return $resource(surveyAPI + '/:surveyId/questions/:questionId/items/:itemId',
                    { surveyId: '@sid', questionId: '@qid', itemId: '@iid' },
                    { update: { method: 'PUT' } })
            }
        }]);

})();