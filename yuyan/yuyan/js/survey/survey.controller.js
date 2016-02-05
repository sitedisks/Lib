(function () {
    'use strict';
    angular.module('yuyanApp').controller('surveyCtrl',
    ['$scope', '$uibModal', function ($scope, $uibModal) {

        $scope.placeholder = 'Your First Question';
        $scope.IntQuestion = 'Question:';
        $scope.dtoQuestions = [];
        $scope.DefaultQuestionType = 1;
        $scope.QID = 0;
        $scope.showAddItem = false;
        $scope.disableNext = true;
        //$scope.showControllbtn = false;

        $scope.addQuestion = addQuestion;
        $scope.addItem = addItem;
        $scope.nextQuestion = nextQuestion;
        $scope.previewSurvey = previewSurvey;
        $scope.userLogin = userLogin;
        $scope.userRegister = userRegister;

        function addQuestion() {
            $scope.QID++;
            var question = {
                QuestionId: $scope.QID,
                Question: $scope.question,
                QuestionType: $scope.DefaultQuestionType,
                dtoItems: []
            };

            $scope.dtoQuestions.push(question);
            $scope.question = "";
            $scope.item = "";
            $scope.showAddItem = true;
            $scope.placeholder = 'Your Next Question';
            $scope.IntQuestion = 'Next Question:';
        }

        function addItem(QID) {

            var item = {
                QuestionId: QID,
                ItemDescription: $scope.item
            };

            angular.forEach($scope.dtoQuestions, function (question) {
                if (question.QuestionId == QID) {
                    question.dtoItems.push(item);
                    if (question.dtoItems.length >= 6) {
                        $scope.showAddItem = false;
                    }
                    if (question.dtoItems.length >= 2) {
                        $scope.disableNext = false;
                    }
                }
            });

            $scope.item = "";
        }

        function nextQuestion() {
            $scope.showAddItem = false;
            $scope.disableNext = true;
        }

        function previewSurvey() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/previewModal.html',
                controller: 'previewModalCtrl',
                size: 'md',
                resolve: {
                    surveyQuestions: function () {
                        return $scope.dtoQuestions;
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {
                // dismissed log
            });
        }

        function userLogin() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/userModal.html',
                controller: 'userModalCtrl',
                size: 'md',
                resolve: {
                    mode: function () {
                        return 'login';
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {
                // dismissed log
            });
        }

        function userRegister() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/userModal.html',
                controller: 'userModalCtrl',
                size: 'md',
                resolve: {
                    mode: function () {
                        return 'register';
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {
                // dismissed log
            });
        }

    }]);

})();
