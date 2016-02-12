(function () {
    'use strict';
    angular.module('choriceApp').controller('choriceCtrl', ['$scope', '$stateParams', 'choriceAPISvc',
        function ($scope, $stateParams, choriceAPISvc) {

            var tokenUrl = $stateParams.tokenUrl;

            $scope.loading = true;

            choriceAPISvc.surveyRetreiveSvc().get({ urltoken: tokenUrl },
                function (data) {
                    $scope.survey = data;
                    $scope.loading = false;
                    //toastr.success('You don!');
                },
                function (data) {
                    toastr.error('Error load Survey');
                    $scope.loading = false;
                });

        }]);

})();