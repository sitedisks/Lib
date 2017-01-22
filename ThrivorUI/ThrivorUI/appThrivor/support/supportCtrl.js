(function () {
    'use strict';

    appThrivor.controller("supportController", ['$scope', 'storageService', 'USER_TYPE',
        function ($scope, storageService, USER_TYPE) {
            $scope.message = 'Support';

            var userType = storageService.get('userType');

            $scope.isSupport = userType ? userType.toUpperCase() === USER_TYPE.CREW.toUpperCase() : false;


        }]);
})();