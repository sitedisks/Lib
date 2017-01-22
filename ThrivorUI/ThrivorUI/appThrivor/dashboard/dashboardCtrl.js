(function () {
    'use strict';

    ctrlThrivor.controller('dashboardCtrl', ['$scope', '$state', '$stateParams', 'moment', 'storageService', 'USER_TYPE',
        function ($scope, $state, $stateParams, moment, storageService, USER_TYPE) {

            var currentUser = $stateParams.userName != null ? $stateParams.userName : storageService.get('userName');
            var isDeviceKnowUser = storageService.get('userName') ? true : false;

            var userType = storageService.get('userType');

            if (!isDeviceKnowUser) {
                $state.go('main');
            }

            $scope.isSupport = userType? userType.toUpperCase() === USER_TYPE.CREW.toUpperCase(): false;

        }]);
})();