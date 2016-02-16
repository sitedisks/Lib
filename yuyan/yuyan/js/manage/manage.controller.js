(function () {
    'use strict';

    angular.module('yuyanApp').controller('manageCtrl', ['$scope', '$rootScope', '$state', '$uibModal',
        function ($scope, $rootScope, $state, $uibModal) {

            $scope.goHome = goHome;

            function goHome() {
                $state.go('survey');
            }

        }]);

})();