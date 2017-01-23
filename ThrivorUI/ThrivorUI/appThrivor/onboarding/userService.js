(function () {
    'use strict';

    appThrivor.factory("userService", ['$http', 'storageService', function ($http, storageService) {

        var userService = {
            getUserDetails: getUserDetails,
            getCrewListByUniqueCode: getCrewListByUniqueCode,
            storeCurrentUser: storeCurrentUser,
            getCurrentUser: getCurrentUser,
            getPatientDetails: getPatientDetails
        };

        return userService;

        function getUserDetails(userName) {
            console.log("userService.getUserDetails called for userName-" + userName);

            return $http({
                type: 'GET',
                url: thrivorBaseAPIUrl + UserDetails.GET.UserDetailsByUsername + 'username=' + userName,
                data: '',
                datatype: 'json',
                contentType: 'application/json;charset=utf-8'
            });
        }

        function getPatientDetails(uniqueCode) {
            console.log("userService.getPatientDetails called for uniqueCode- " +uniqueCode);

            return $http({
                type: 'GET',
                url: thrivorBaseAPIUrl + UserDetails.GET.PatientDetailsByUniquecode + 'uniquecode=' + uniqueCode,
                data: '',
                datatype: 'json',
                contentType: 'application/json;charset=utf-8',
                headers: {
                    'Authorization': "Token " + storageService.get('tokenValue')
                }
            });
        }

        function getCrewListByUniqueCode(uniqueCode) {
            console.log("userService.getCrewListByUniqueCode called" + uniqueCode);

            return $http({
                type: 'GET',
                url: thrivorBaseAPIUrl + UserDetails.GET.SupportCrewListByUniqueCode + 'uniquecode=' + uniqueCode,
                data: '',
                datatype: 'json',
                contentType: 'application/json;charset=utf-8',
                headers: {
                    'Authorization': "Token " + storageService.get('tokenValue')
                }
            });
        }

        function storeCurrentUser(user) {
            storageService.set('userDetails', user);
        }

        function getCurrentUser() {
            return JSON.parse(storageService.get('userDetails'));
        }

    }]);

})();