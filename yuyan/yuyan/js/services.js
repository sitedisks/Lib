(function () {
    'use strict';

    angular.module('yuyanApp').service('yuyanAPISvc', ['$resource', 'endpoint',
        function ($resource, endpoint) {

            var userAPI = endpoint.localAPI + 'users';
            var surveyAPI = endpoint.localAPI + 'surveys';

            var service = {
                sessionCheckSvc: sessionCheckSvc,
                isAuthenticated: isAuthenticated,
                userCheckSvc: userCheckSvc,
                userLoginSvc: userLoginSvc,
                userLogoutSvc: userLogoutSvc,
                userRegisterSvc: userRegisterSvc,
                surveyCrudSvc: surveyCrudSvc,
                surveyGetBySession: surveyGetBySession,
                surveyCountBySession: surveyCountBySession,
                questionCrudSvc: questionCrudSvc
            };

            return service;

            function sessionCheckSvc() {
                return $resource(userAPI + '/status');
            }

            function isAuthenticated() {

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

            function surveyCountBySession() {
                return $resource(surveyAPI + '/count');
            }

            function surveyCrudSvc() {
                return $resource(surveyAPI + '/:surveyId',
                    { surveyId: '@sid' },
                    { update: { method: 'PUT' } });
            }

            // queston 
            function questionCrudSvc() {
                return $resource(surveyAPI + '/:surveyId/questions/:questionId',
                    { surveyId: '@sid', questionId: '@qid' },
                    { update: { method: 'PUT' } })
            }

            // item
            function itemCrudSvc() {
                return $resource(surveyAPI + '/:surveyId/questions/:questionId/items/:itemId',
                    { surveyId: '@sid', questionId: '@qid', itemId: '@iid' },
                    { update: { method: 'PUT' } })
            }
        }]);

})();