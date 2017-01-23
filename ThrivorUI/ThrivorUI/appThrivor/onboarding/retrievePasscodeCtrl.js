(function () {
    'use strict';

    ctrlThrivor.controller('retrievePasscodeCtrl', ['$scope', '$state', '$stateParams', 'genericService', 'storageService',
        function ($scope, $state, $stateParams, genericService, storageService) {

            var currentUser = $stateParams.userName != null ? $stateParams.userName : storageService.get('userName');

            $scope.data = {
                email: currentUser
            }

            $scope.retrievePasscode = retrievePasscode;

            function retrievePasscode() {
                genericService.showAlert('Email Sent', 'Please find your passcode from your email inbox.', function () {
                    $state.go('signIn', { userName: $scope.data.email });
                });

            }

        }]);
})();