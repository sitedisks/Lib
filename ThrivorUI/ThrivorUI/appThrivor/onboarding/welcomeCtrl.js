(function () {
    'use strict';

    ctrlThrivor.controller('welcomeCtrl', ['$scope', '$state', '$stateParams', 'storageService', 'USER_TYPE',
        function ($scope, $state, $stateParams, storageService, USER_TYPE) {

            var userType = storageService.get('userType');

            if (storageService.get('userPhoto'))
                $scope.userPhoto = storageService.get('userPhoto');
            if (storageService.get('firstName'))
                $scope.firstName = storageService.get('firstName');
            $scope.inviteKey = $stateParams.inviteKey;
            
            $scope.isSupport = userType.toUpperCase() === USER_TYPE.CREW.toUpperCase();

            $scope.copyInviteKey = copyInviteKey;

            function copyInviteKey() {
                // https://codepen.io/shaikmaqsood/pen/XmydxJ/
            }

        }]);

})();