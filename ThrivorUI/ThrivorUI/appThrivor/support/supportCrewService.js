(function () {
    'use strict';

    appThrivor.factory("supportCrewService", ['$http', 'storageService', function ($http, storageService) {

        function getUserContacts(id) {
            return $http({
                method: 'GET',
                url: thrivorBaseAPIUrl + UserContacts.GET.ListByUserId + '/' + id,
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                headers: {
                    'Authorization': "Token " + storageService.get('tokenValue'),
                    'IP': ''
                }
            })
        }

        function sendSMS(phone) {
            return $http({
                method: 'POST',
                url: sleevesupBaseAPIUrl + 'SMS/sendSMS',
                data: JSON.stringify(phone),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                headers: {
                    'Authorization': "Token " + storageService.get('tokenValue'),
                    'IP': ''
                }
            })
        }

        function saveUserContact(contactDetails) {
            return $http({
                method: 'POST',
                url: thrivorBaseAPIUrl + UserContacts.POST,
                data: JSON.stringify(contactDetails),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                headers: {
                    'Authorization': "Token " + storageService.get('tokenValue'),
                    'IP': ''
                }
            })
        }

        var supportCrewService = {
            getUserContacts: getUserContacts,
            sendSMS: sendSMS,
            saveUserContact: saveUserContact
        };

        return supportCrewService;

    }]);

})();