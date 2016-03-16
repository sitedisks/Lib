(function () {
    'use strict';
    angular.module('choriceApp').service('choriceAPISvc', ['$resource', 'endpoint',
        function ($resource, endpoint) {
            var clientAPI = endpoint.LiveAPI + 'client';

            var service = {
                surveyRetreiveSvc: surveyRetreiveSvc,
                surveySaveSvc: surveySaveSvc
            };

            return service;

            function surveyRetreiveSvc() {
                return $resource(clientAPI + '/:urltoken', { urltoken: '@url' });
            }

            function surveySaveSvc() {
                return $resource(clientAPI);
            }
        }]);
})();