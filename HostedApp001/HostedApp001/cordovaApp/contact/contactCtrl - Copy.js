(function () {
    'use strict';

    angular.module('hostedApp').controller('contactController', ['$scope', '$cordovaContacts', '$cordovaVibration',
        function ($scope, $cordovaContacts, $cordovaVibration) {
            $scope.title = 'Contact List native';

            $scope.vibration = vibration;
            $scope.getAllContacts = getAllContacts;

            function vibration() {
                alert('$cordovaVibration called');
                $cordovaVibration.vibrate(200);
            }

            function getAllContacts() {
                alert('$cordovaContacts called');
                $scope.contacts = [];
                var options = {};
                //if ($ionicPlatform.isAndroid()) {
                //    options.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
                //};
                options.hasPhoneNumber = true;
                options.fields = ['displayName', 'name.formatted', 'phoneNumbers', 'email'];

                $cordovaContacts.find(options).then(function (results) { //omitting parameter to .find() causes all contacts to be returned
                    for (var i = 0; i < results.length; i++) {
                        var contact = results[i];
                        if (contact.phoneNumbers != null)
                            $scope.contacts.push(contact);
                    }

                }, function (error) {
                    alert('Error get the contacts.');
                });
            }

        }]);
})();