(function () {
    'use strict';

    angular.module('yuyanApp')
        .controller('surveyModalCtrl', ['$scope', '$uibModalInstance', 'loggedIn',
            function ($scope, $uibModalInstance, loggedIn) {

                $scope.loggedIn = loggedIn;

                $scope.survey = {
                    Title: '',
                    ShortDesc: ''
                };

                $scope.ok = function () {
                    $uibModalInstance.close($scope.survey);
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);
})();