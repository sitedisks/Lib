﻿(function () {
    'use strict';
    angular.module('choriceApp').service('choriceAPISvc', ['$resource', 'endpoint',
        function ($resource, endpoint) {
            var clientAPI = endpoint.localAPI + 'client';

            var service = {
                surveyRetreiveSvc: surveyRetreiveSvc
            };

            return service;

            function surveyRetreiveSvc() {
                return $resource(clientAPI + '/:urltoken', { urltoken: '@url' });
            }
        }]);
})();