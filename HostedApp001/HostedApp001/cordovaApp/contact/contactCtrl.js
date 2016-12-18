(function () {
    'use strict';

    angular.module('hostedApp').controller('contactController', ['$scope',
        function ($scope) {
            $scope.title = 'Contact List native';

            $scope.vibration = vibration;
            $scope.getAllContacts = getAllContacts;
            $scope.contacts = [];

            function vibration() {
                alert('$cordovaVibration called');
                //$cordovaVibration.vibrate(200);
            }

            function getAllContacts() {
                var fields = [
                    navigator.contacts.fieldType.displayName,
                    navigator.contacts.fieldType.phoneNumbers,
                    navigator.contacts.fieldType.emails,
                    navigator.contacts.fieldType.photos
                ];
                navigator.contacts.find(fields, contactFetchSuccess, contactFetchFail);

            }

            function contactFetchSuccess(contacts) {
                $scope.contacts = contacts;

            }

            function contactFetchFail() {
                //TODO modal service fail
            }

        }]);
})();