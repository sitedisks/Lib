(function () {
    'use strict';

    appThrivor.factory("signInService", ['$http', function ($http) {

        var signInService = {
            signIn: signIn,
            signUpSleevesUpUser: signUpSleevesUpUser,
            signUpThrivorUser: signUpThrivorUser,
            registerDevice: registerDevice,
            doesUsernameExist: doesUsernameExist
        };

        return signInService;

        function signIn(credentials) {
            console.log("signInService:signIn called with credentails-" + JSON.stringify(credentials));

            return $http({
                method: 'POST',
                url: sleevesupBaseAPIUrl + 'userauthentication/authenticate',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                headers: {
                    'Authorization': "Basic " + btoa(credentials.email + ':' + credentials.password),
                    'AppName': 'Thrivor',
                    'IsPasscode': 'true'
                }

            });
        }


        function registerDevice(registerDevicePayload) {
            console.log("signInService:registerDevice called with registerDevicePayload-" + JSON.stringify(registerDevicePayload));

            return $http({
                method: 'POST',
                url: sleevesupBaseAPIUrl + RegisterUserDevice.POST,
                data: JSON.stringify(registerDevicePayload),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8'
            });
        }

        function signUpSleevesUpUser(sleevesupUser) {

            return $http({
                method: 'POST',
                url: sleevesupBaseAPIUrl + 'user/registeruser',
                data: JSON.stringify(sleevesupUser),
                datatype: 'json',
                contentType: 'application/json;charset=utf-8'
            });
        }

        function signUpThrivorUser(thrivorUser) {

            return $http({
                method: 'POST',
                url: thrivorBaseAPIUrl + UserDetails.POST,
                data: JSON.stringify(thrivorUser),
                datatype: 'json',
                contentType: 'application/json;charset=utf-8'
            });
        }

        function doesUsernameExist(applicationName, userName) {

            return $http({
                method: 'GET',
                url: sleevesupBaseAPIUrl + UserDetails.GET.isUsernameValid + 'applicationName=' + applicationName + '&' + 'userName=' + userName,
                datatype: 'json',
                contentType: 'application/json;charset=utf-8'
            });
        }
    }]);

})();





