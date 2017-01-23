(function () {
    'use strict';

    appThrivor.controller("transportController", ['$scope', '$state',
        function ($scope, $state) {

            $scope.createTransportJob = createTransportJob;

            function createTransportJob() {
                $state.go('dashboard.jobs', { type: 'Transport' });
            }

        }]);
})();