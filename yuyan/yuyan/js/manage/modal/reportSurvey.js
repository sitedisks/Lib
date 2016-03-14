(function () {
    'use strick';

    angular.module('yuyanApp')
        .controller('reportSurveyCtrl', ['$scope', '$uibModalInstance', 'survey', 'localStorageService', 'yuyanAPISvc',
            function ($scope, $uibModalInstance, survey, localStorageService, yuyanAPISvc) {

                $scope.survey = survey;
                $scope.checkedHashtb = {};

                yuyanAPISvc.surveyClientReportSvc().query({ surveyId: survey.SurveyId },
                    function (data) {
                        $scope.surveyClient = data;

                        yuyanAPISvc.surveyClientAnswerDicSvc().get({ surveyId: survey.SurveyId },
                           function (data) {
                               $scope.checkedHashtb = data;
                           }, function () {
                               toastr.error("Error please refresh the page.");
                           });

                    }, function (error) {
                        toastr.error("Error please refresh the page.");
                    });

               
                              
                $scope.ok = function () {
                    $uibModalInstance.close(surveyClient);
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            }]);
})();