(function () {
    'use strick';

    angular.module('yuyanApp')
        .controller('addEditQuestionCtrl', ['$scope', '$uibModalInstance', 'question', 'localStorageService', 'yuyanAPISvc',
            function ($scope, $uibModalInstance, question, localStorageService, yuyanAPISvc) {

                $scope.saving = false;

                $scope.quesiton = question;

                $scope.ok = function () {
                    $scope.saving = true;

                    
                }


                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);
})();