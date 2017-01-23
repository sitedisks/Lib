(function () {

    'use strict';

    appThrivor.factory('interceptorSvc', ['$location', '$q', '$rootScope', 
        function ($location, $q, $rootScope) {
            var authInterceptorService = {
                request: _request,
                requestError: _requestError,
                response: _response,
                responseError: _responseError
            };

            return authInterceptorService;

            function _request(config) {
                return config;
            }

            function _requestError(rejection) {
                return $q.reject(rejection);
            }

            function _response(response) {
                return response;
            }

            function _responseError(rejection) {
                if (rejection.status === 401) {
                    $rootScope.$emit('unauthorized');
                }
                else if (rejection.status === 404) {
                    //$rootScope.$emit('unfound'); Todo: add the page not found generic page
                }

                return $q.reject(rejection);

            }

        }]);

})();