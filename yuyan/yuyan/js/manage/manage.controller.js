(function () {
    'use strict';

    angular.module('yuyanApp').controller('manageCtrl', ['$scope', '$rootScope', '$state', '$uibModal', 'yuyanAPISvc',
        function ($scope, $rootScope, $state, $uibModal, yuyanAPISvc) {

            $scope.APIMini = 1;
            $scope.APIResolved = 0;

            $scope.goHome = goHome;

            function goHome() {
                $state.go('survey');
            }

            yuyanAPISvc.surveyGetBySession().query({},
                function (data) {
                    $scope.APIResolved++;
                    $scope.surveys = data;
                }, function (data) {
                    toastr.error('Failed to retreive survey. Please refresh.');
                });

        }]);

})();