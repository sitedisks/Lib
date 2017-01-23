(function () {
    'use strict';

    appThrivor.controller("supportCrewInviteCtrl", ['$scope', '$rootScope', '$location', '$http', '$timeout', '$state', 'userService', 'storageService', 'supportCrewService', 'genericService',
        function ($scope, $rootScope, $location, $http, $timeout, $state, userService, storageService, supportCrewService, genericService) {
            var message;

            // functions
            $scope.initCrewInvite = initCrewInvite;
            $scope.sendInvite = sendInvite;  // invite ui

            function initCrewInvite() {
                //getContacts();
                $scope.currentUser = userService.getCurrentUser();
                $scope.inviteeName = $rootScope.currentContact.name.formatted;
                $scope.inviteMsg = $scope.currentUser.Name + " has an invitation for you:\n" +
                    "Hello " + $scope.inviteeName + ",\n" +
                    "I've joined Thrivor. It's a mobile app I'm using to build a support network of friends and family. \n" +
                    "Visit thrivor.com/supporter for more." + " Once you have the app enter my invite code: [" + $scope.currentUser.UniqueCode + "]. \n\n" +
                    "Thanks in advance, " + $scope.currentUser.Name;
            }

            function sendInvite() {
                // sending email
                var recipients = [];
                var emailList = $rootScope.currentContact.emails;
                var phoneList = $rootScope.currentContact.phoneNumbers;
                if (phoneList) {

                    var primaryEmail = '';
                    if (emailList) {
                        primaryEmail = emailList[0].value;
                    }
                    var primaryPhone = phoneList[0].value;

                    if (primaryPhone) {
                        var phn = {
                            "Number": primaryPhone, "Name": $scope.inviteeName
                        }
                        recipients.push(phn);
                        var phone = {
                            'Category': 'Crew Invite',
                            'Status': 'New',

                            'SMSText': $scope.inviteMsg,
                            'Recipients': recipients,
                            'ApplicationName': 'Thrivor'
                        };
                        supportCrewService.sendSMS(phone).then(
                            function (result) {

                                var contactFirstName = '';
                                var contactLastName = '';

                                if ($rootScope.currentContact.displayName.length > 0) {
                                    var splittedName = $rootScope.currentContact.displayName.split(" ");
                                    contactFirstName = splittedName[0];

                                    if (splittedName.length > 1) {
                                        for (var i = 1; i < splittedName.length ; i++) {
                                            contactLastName = splittedName[i] + ' ';
                                        }
                                    }
                                    else {
                                        contactLastName = '';
                                    }

                                }

                                var contactDetails = {
                                    FirstName: contactFirstName,
                                    LastName: contactLastName,
                                    Email: primaryEmail,
                                    Phone: primaryPhone,
                                    UserId: $scope.currentUser.Id,
                                    PhotoPath: ''
                                }

                                supportCrewService.saveUserContact(contactDetails).then(
                                    function (result) {
                                        genericService.showAlert('Success', 'Invitation has been sent', function () {
                                        });
                                        $state.go('dashboard.support.crew');
                                    }, function (failure) {
                                        genericService.showAlert('Error occurred', 'Please try again', function () {
                                        });
                                        $state.go('dashboard.support.crew');
                                    });

                                //goBack();
                            }, function (failure) {
                                genericService.showAlert('Error occurred', 'Please try again', function () {
                                });
                                $state.go('dashboard.support.crew');
                            });
                    }
                    else {
                        genericService.showAlert('No phone number', $rootScope.currentContact.displayName + " does not have a phone number", function () {
                        });
                    }
                } else {
                    $state.go('dashboard.support.crew');
                }
            }

        }]);
})();