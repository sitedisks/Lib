﻿(function () {
    'use strict';

    angular.module('yuyanApp').controller('manageCtrl', ['$scope', '$rootScope', '$state', '$uibModal', 'yuyanAPISvc',
        function ($scope, $rootScope, $state, $uibModal, yuyanAPISvc) {

            $scope.APIMini = 1;
            $scope.APIResolved = 0;

            // functions
            $scope.goHome = goHome;
            $scope.goQuestion = goQuestion;
            $scope.previewSurvey = previewSurvey;
            $scope.deleteSurvey = deleteSurvey;
            $scope.addEditSurvey = addEditSurvey;

            suveryListInit();

            function suveryListInit() {
                yuyanAPISvc.surveyGetBySession().query({},
                  function (data) {
                      $scope.APIResolved++;
                      $scope.surveys = data;
                  }, function (data) {
                      toastr.error('Failed to retreive survey. Please refresh.');
                  });
            }

            function goHome() {
                $state.go('survey');
            }

            function goQuestion(survey) {
                $state.go('question', { survey: survey }, { location: false });
            }

            function previewSurvey(survey) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'templates/previewModal.html',
                    controller: 'previewModalCtrl',
                    size: 'md',
                    resolve: {
                        survey: survey
                    }
                });

                modalInstance.result.then(function () {

                }, function () {
                    // dismissed log
                });
            }

            function deleteSurvey(survey) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/manage/modal/deleteSurvey.html',
                    controller: 'deleteSurveyCtrl',
                    size: 'md',
                    resolve: {
                        survey: survey
                    }
                });

                modalInstance.result.then(function (survey) {
                    yuyanAPISvc.surveyCrudSvc().remove({ surveyId: survey.SurveyId },
                        function (data) {
                            toastr.success("Survey Deleted!");
                            $scope.APIResolved--;
                            suveryListInit();
                        }, function (data) {
                            toastr.error("Remove Survey Error, please try again.");
                        });
                }, function () {
                    // dismissed log
                });
            }

            function addEditSurvey(survey) {

                if (!survey) {
                    // empty survey then
                    survey = {
                        Title: '',
                        ShortDesc: '',
                        LongDesc: ''
                    };
                }

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/manage/modal/addEditSurvey.html',
                    controller: 'addEditSurveyCtrl',
                    size: 'md',
                    resolve: {
                        survey: angular.copy(survey)
                    }
                });

                modalInstance.result.then(function (data) {
                    $scope.APIResolved--;
                    suveryListInit();
                }, function () {
                    // dismissed log
                });
            }

        }]);

})();