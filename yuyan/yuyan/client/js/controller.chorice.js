(function () {
    'use strict';
    angular.module('choriceApp').controller('choriceCtrl', ['$scope', '$stateParams', 'choriceAPISvc',
        function ($scope, $stateParams, choriceAPISvc) {

            var tokenUrl = $stateParams.tokenUrl;

            //JfSoWRnSEKKeSWh421wjw

            choriceAPISvc.surveyRetreiveSvc().get({ urltoken: tokenUrl },
                function (data) {
                    $scope.survey = data;
                },
                function (data) { });

        }]);

})();