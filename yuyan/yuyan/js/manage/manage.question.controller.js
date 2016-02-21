(function () {
    'use strict';

    angular.module('yuyanApp').controller('manageQuestionCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$uibModal', 'yuyanAPISvc',
        function ($scope, $rootScope, $stateParams, $state, $uibModal, yuyanAPISvc) {

            $scope.APIMini = 1;
            $scope.APIResolved = 1;

            $scope.survey = $stateParams.survey;

            // functions
            $scope.goHome = goHome;
            $scope.goSurvey = goSurvey;
            $scope.deleteQuestion = deleteQuestion;
            $scope.addEditQuestion = addEditQuestion;

            function goHome() {
                $state.go('survey');
            }

            function goSurvey() {
                $state.go('manage');
            }

            function deleteQuestion(question) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/manage/modal/deleteQuestion.html',
                    controller: 'deleteQuestionCtrl',
                    size: 'md',
                    resolve: {
                        question: angular.copy(question)
                    }
                });

                modalInstance.result.then(function (data) {

                }, function () {
                    // dismissed log
                });
            }

            function addEditQuestion(question) {
                if (!question)
                {
                    question = {
                        QuestionType: 1,
                        Question: '',
                        dtoItems: []
                    };
                }

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'components/manage/modal/addEditQuestion.html',
                    controller: 'addEditQuestionCtrl',
                    size: 'md',
                    resolve: {
                        question: angular.copy(question)
                    }
                });

                modalInstance.result.then(function (data) {
                
                }, function () {
                    // dismissed log
                });
            }

        }]);
})();