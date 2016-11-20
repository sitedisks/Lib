(function () {
    'use strict';

    angular.module('hostedApp').controller('homeController', ['$scope',
        function ($scope) {

            alert('enter home controller');
            $scope.title = 'Angular Home nice';
            $scope.btnTest = btnTest;

            function btnTest() {
                alert('Angular test button called');
            }

            // below are native cordova functions
            document.addEventListener('deviceready', onDeviceReady, false);

            function onDeviceReady() {
               
                //alert('device ready');
                $scope.contactList = [];
                $scope.btnGetContact = btnGetContact;
              
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

            }

        }]);
})();