(function () {
    'use strict';

    angular.module('yuyanApp')
        .controller('addEditResultCtrl', ['$scope', '$uibModalInstance', 'result', 'localStorageService', 'yuyanAPISvc',
            function ($scope, $uibModalInstance, result, localStorageService, yuyanAPISvc) {

                $scope.saving = false;

                $scope.result = result;

                $scope.ok = function () {
                    $scope.saving = true;

                    if ($scope.result.SurveyResultId) {
                        // update
                        yuyanAPISvc.surveyResultCrudSvc().update({ surveyId: $scope.result.SurveyId, resultId: $scope.result.SurveyResultId }, $scope.result,
                            function (data) {
                                $scope.saving = false;
                                toastr.success("Result Updated!");
                                $uibModalInstance.close(data);
                            }, function (error) {
                                $scope.saving = false;
                                toastr.error("Save Result Error, please try again.");
                            });
                    }
                    else {
                        // save
                        yuyanAPISvc.surveyResultCrudSvc().save({ surveyId: $scope.result.SurveyId }, $scope.result,
                            function (data) {
                                $scope.saving = false;
                                toastr.success("Result Added!");
                                $uibModalInstance.close(data);
                            }, function (error) {
                                $scope.saving = false;
                                toastr.error("Save Result Error, please try again.");
                            });
                    }
                }

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                }

            }]);
})();