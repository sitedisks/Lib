(function () {
    'use strict';

    appThrivor.controller("tokenCtrl", ['$scope', '$state', '$stateParams', 'storageService',
        function ($scope, $state, $stateParams, storageService) {
            var uberCode = $stateParams.code;

            if (uberCode) {
                storageService.set('uberCode', uberCode);
                $state.go('dashboard.transport.uber');
            }
            else {
                $state.go('main');
            }

        }]);
})();