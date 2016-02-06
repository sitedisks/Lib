(function () {
    'use strict';

    angular.module('yuyanApp')
        .controller('userModalCtrl', ['$scope', '$uibModalInstance', 'mode', function ($scope, $uibModalInstance, mode) {

            $scope.mode = mode;

            $scope.userObj = {
                Email: '',
                Password: '',
                PasswordConfirm: ''
            };

            $scope.ok = function () {
                $uibModalInstance.close($scope.userObj);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
})();