(function () {
    'use strict';

    appThrivor.factory("transportService", ['$http', '$httpParamSerializer', 'uberApi',
        function ($http, $httpParamSerializer, uberApi) {

            var uberClientId = uberApi.clientId;
            var uberServerToken = uberApi.serverToken;
            var uberClientSecret = uberApi.clientSecret;
            var uberReturnUrl = uberApi.returnUrl;
            var uberRequestUrl = uberApi.endPointSandbox + 'requests';
            var uberAccessToken = uberApi.accessToken;
            var uberFareId = uberApi.fareId;

            var transportService = {
                uberOAuth: uberOAuth,
                uberGetAccessToken: uberGetAccessToken,
                uberRefreshToken: uberRefreshToken,
                apiGetAccessToken: apiGetAccessToken,
                apiRefreshToken: apiRefreshToken, 
                uberGetProducts: uberGetProducts,
                uberGetEstimatedTime: uberGetEstimatedTime,
                uberGetEstimatedPrice: uberGetEstimatedPrice,
                uberRequestEstimate: uberRequestEstimate,
                uberMakeRequest: uberMakeRequest,
                uberRequestDetails: uberRequestDetails,
            };

            return transportService;

            function uberOAuth() {
                //scope: 'profile history_lite places request'
                return uberApi.endPointOAuth + 'authorize?client_id=' + uberApi.clientId + '&response_type=code&scope=profile%20history%20request%20places';
            }

            function uberGetAccessToken(code) {
                var params = {
                    client_secret: uberClientSecret,
                    client_id: uberClientId,
                    grant_type: 'authorization_code',
                    redirect_uri: uberReturnUrl,
                    code: code
                };
                var req = {
                    method: 'POST',
                    url: uberApi.endPointOAuth + 'token',
                    data: $httpParamSerializer(params),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                };

                return $http(req);
            }

            function uberRefreshToken(refreshCode) {
                var params = {
                    client_secret: uberClientSecret,
                    client_id: uberClientId,
                    grant_type: 'refresh_token',
                    redirect_uri: uberReturnUrl,
                    refresh_token: refreshCode
                };
                var req = {
                    method: 'POST',
                    url: uberApi.endPointOAuth + 'token',
                    data: $httpParamSerializer(params),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                };

                return $http(req);
            }

            function apiGetAccessToken(code) {
                var req = {
                    method: 'GET',
                    url: thrivorBaseAPIUrl + 'uber/getaccesstoken/' + code
                };
                return $http(req);
            }

            function apiRefreshToken(refreshCode) {
                var req = {
                    method: 'GET',
                    url: thrivorBaseAPIUrl + 'uber/refreshaccesstoken/' + refreshCode
                };
                return $http(req);
            }

            function uberGetProducts(start) {
                if (start.lat) {
                    var params = {
                        latitude: start.lat,
                        longitude: start.lng
                    };
                } else {
                    var params = {
                        latitude: start.lat(),
                        longitude: start.lng()
                    };
                }

                var req = {
                    method: 'GET',
                    dataType: 'json',
                    url: uberApi.endPointSandbox + 'products?' + $.param(params),
                    headers: { 'Authorization': 'Token ' + uberServerToken }
                };
                return $http(req);
            }

            function uberGetEstimatedTime(start, end) {
                var params = {
                    start_latitude: start.lat(),
                    start_longitude: start.lng(),
                    end_latitude: end.lat(),
                    end_longitude: end.lng()
                };
                var req = {
                    method: 'GET',
                    dataType: 'json',
                    url: uberApi.endPointSandbox + 'estimates/time?' + $.param(params),
                    headers: { 'Authorization': 'Token ' + uberServerToken }
                };
                return $http(req);
            }

            function uberGetEstimatedPrice(start, end) {
                var params = {
                    start_latitude: start.lat(),
                    start_longitude: start.lng(),
                    end_latitude: end.lat(),
                    end_longitude: end.lng()
                };
                var req = {
                    method: 'GET',
                    dataType: 'json',
                    url: uberApi.endPointSandbox + 'estimates/price?' + $.param(params),
                    headers: { 'Authorization': 'Token ' + uberServerToken }
                };
                return $http(req);
            }

            function uberRequestEstimate(productId, start, end, accessToken) {
                if (accessToken)
                    uberAccessToken = accessToken;
                var data = {
                    "product_id": productId,
                    "start_latitude": start.lat,
                    "start_longitude": start.lng,
                    "end_latitude": end.lat,
                    "end_longitude": end.lng
                };
                var req = {
                    method: 'POST',
                    url: uberRequestUrl + '/estimate',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Language': 'en_US',
                        'Authorization': 'Bearer ' + uberAccessToken
                    },
                    data: data
                };
                return $http(req);
            }

            function uberMakeRequest(productId, start, end, accessToken) {
                if (accessToken)
                    uberAccessToken = accessToken;
                var data = {
                    "product_id": productId,
                    "start_latitude": start.lat,
                    "start_longitude": start.lng,
                    "end_latitude": end.lat,
                    "end_longitude": end.lng
                };
                var req = {
                    method: 'POST',
                    url: uberRequestUrl,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Language': 'en_US',
                        'Authorization': 'Bearer ' + uberAccessToken
                    },
                    data: data
                };
                return $http(req);
            }

            function uberRequestDetails(accessToken, requestId) {
                var req = {
                    method: 'GET',
                    url: uberRequestUrl + '/' + requestId,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Language': 'en_US',
                        'Authorization': 'Bearer ' + uberAccessToken
                    }
                };
                return $http(req);
            }

        }]);

})();