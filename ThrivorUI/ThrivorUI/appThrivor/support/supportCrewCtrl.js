(function () {
    'use strict';

    appThrivor.controller("supportCrewCtrl", ['$scope', '$rootScope', '$location', '$http', '$timeout', '$state', 'userService', 'storageService', 'genericService', 'supportCrewService',
        function ($scope, $rootScope, $location, $http, $timeout, $state, userService, storageService, genericService, supportCrewService) {
            var message;

            // functions
            $scope.initCrew = initCrew;
            $scope.isInvited = isInvited; // init ui
            $scope.getCrewLink = getCrewLink; // init ui

            function initCrew() {
                genericService.showLoading('Fetching Contacts');
                $scope.contactList = [];
                
                // just for testing !!! Remove it for live!!!!
                //$scope.contactList = [
                //    { name: 'John', contactPhoto: 'img/profile-sample.jpg' },
                //    { name: 'Samantha', contactPhoto: 'img/profile-sample.jpg' },
                //    { name: 'John', contactPhoto: 'img/profile-sample.jpg' },
                //    { name: 'Samantha', contactPhoto: 'img/profile-sample.jpg' }
                //];

                $scope.currentUser = userService.getCurrentUser();
                getContacts();
            }

            function isInvited(contact) {
                return contact.isRegistered; // this will never works
            }

            function getCrewLink(contact) {
                $rootScope.currentContact = contact;
                if ($scope.isInvited(contact)) {
                    //$location.path('/support/view');
                } else {
                    $state.go('dashboard.support.crew.invite');
                }
            }

            // cordova contacts start
            function getContacts() {
                if (window.cordova) {
                    var fields = [
                        navigator.contacts.fieldType.displayName,
                        navigator.contacts.fieldType.phoneNumbers,
                        navigator.contacts.fieldType.emails,
                        navigator.contacts.fieldType.photos
                    ];
                    navigator.contacts.find(fields, contactFetchSuccess, contactFetchFail);
                } else {
                    genericService.hideLoading();
                }
            }

            var counter = 0;
            function contactFetchSuccess(contacts) {
                $scope.contactList = contacts;
                matchThrivorContacts();
                //$scope.photo = window.resolveLocalFileSystemURL(contacts[18].photos[0].value);
                //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
                //window.resolveLocalFileSystemURL(contacts[18].photos[0].value, onResolveSuccess, fail);
                //window.FilePath.resolveNativePath(contacts[18].photos[0].value, successNative, failNative);

                //angular.forEach(contacts, function (contact) {
                //    getFileContentAsBase64(contact);


                //    // getFileContentAsBase64(contact, function (base64Image) {
                //    // contact.contactPhoto = base64Image;
                //    // $scope.contactList.push(contact);
                //    // });
                //    $scope.$apply(function () {

                //        if (counter >= contacts.length) {
                //            $scope.contactList = contacts;

                //        }
                //    });

                //    matchThrivorContacts();
                //});

                genericService.hideLoading();
            }

            function getFileContentAsBase64(path) {


                if (path.photos != null) {
                    window.resolveLocalFileSystemURL(path.photos[0].value, gotFile, fail);

                    function fail(e) {
                        console.log(e);
                    }

                    function gotFile(fileEntry) {

                        fileEntry.file(function (file) {
                            var reader = new FileReader();
                            reader.onloadend = function (e) {
                                var content = this.result;
                                counter++;
                                path.contactPhoto = content;
                                //$scope.photoList.push({addresses: path.addresses, birthday: path.birthday, displayName: path.displayName, emails: path.emails, id: path.id, name: path.name, phoneNumbers: path.phoneNumbers, contactPhoto: content});
                                // callback(content);
                            };
                            // The most important point, use the readAsDatURL Method from the file plugin
                            reader.readAsDataURL(file);
                        });
                    }

                }
                else
                    counter++;
                //console.log($scope.photoList);
            }

            function contactFetchFail() {
                genericService.hideLoading();
                genericService.showAlert('Error', 'Failed to load from your phone book', function() {
                    
                });
            }
            // cordova contacts end

            function matchThrivorContacts() {
                supportCrewService.getUserContacts($scope.currentUser.Id).then(
                    function (result) {
                        angular.forEach($scope.contactList, function (contact) {
                            angular.forEach(result.data, function (crewMember) {
                                if (contact.phoneNumbers) {
                                    if (contact.phoneNumbers[0].value == crewMember.Phone) {
                                        contact.isRegistered = true;
                                    }
                                }
                            });
                        });

                    }, function (error) {
                        genericService.showAlert('Error', 'Failed to get support crew, please reload.', function () { });
                    });
            }

        }]);
})();