(function () {
    'use strict';

    angular.module('hostedApp').controller('homeController', ['$scope',
        function ($scope) {

            $scope.contactList = [];
            $scope.title = 'Angular Home nice';
  
            $scope.btnVibrate = btnVibrate;
            $scope.btnGetContact = btnGetContact;

            function btnVibrate() {
                navigator.vibrate(500);
            }

            function btnGetContact() {
                alert('contact function called');
                navigator.vibrate(300);

                navigator.contacts.find(
                [navigator.contacts.fieldType.displayName,
                    navigator.contacts.fieldType.phoneNumbers,
                    navigator.contacts.fieldType.emails],
                function (contacts) {
                    alert('Get the list');
                    $scope.contactList = contacts;
                },
                function (err) {
                    alert('error: ' + err)
                });

            }

        }]);
})();