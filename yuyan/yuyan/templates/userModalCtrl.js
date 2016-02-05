(function () {
    'use strict';

    angular.module('yuyanApp')
        .controller('userModalCtrl', ['$scope', '$uibModalInstance', 'mode', function ($scope, $uibModalInstance, mode) {

            $scope.mode = mode;

            $scope.userObj = {};

            $scope.ok = function () {
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
})();