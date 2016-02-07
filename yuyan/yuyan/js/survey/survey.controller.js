(function () {
    'use strict';
    angular.module('yuyanApp').controller('surveyCtrl',
    ['$scope', '$uibModal', 'localStorageService', 'yuyanAPISvc', function ($scope, $uibModal,localStorageService, yuyanAPISvc) {

        $scope.placeholder;
        $scope.IntQuestion;
        $scope.dtoQuestions;
        $scope.DefaultQuestionType;
        $scope.QID;
        $scope.showAddItem;
        $scope.disableNext;
        $scope.showFooter = false;
        $scope.isLogin = false;
     

        $scope.addQuestion = addQuestion;
        $scope.addItem = addItem;
        $scope.nextQuestion = nextQuestion;
        $scope.previewSurvey = previewSurvey;
        $scope.userLogin = userLogin;
        $scope.userLogout = userLogout;
        $scope.userRegister = userRegister;
        $scope.reset = reset;

        reset();
        checkSession();

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

            modalInstance.result.then(function (userObj) {
                yuyanAPISvc.userLoginSvc().save(userObj,
                    function (data) {
                        localStorageService.set('authorizationData', { token: data.CurrentSession.SessionId });
                        toastr.success('Welcome back!', data.Email);
                        $scope.isLogin = true;
                    }, function (data) {
                        // failed to login
                        toastr.error(data.data, data.statusText);
                    });

            }, function () {
                // dismissed log
            });
        }

        function userLogout() {
            var localSessionToken = localStorageService.get('authorizationData');
            if (localSessionToken) {
                yuyanAPISvc.userLogoutSvc().remove({sessionId:localSessionToken.token},
                    function (data) {
                        toastr.success('See ya later!');
                        $scope.isLogin = false;
                    }, function (data) {
                        toastr.error('Failed logout.', data.statusText);
                    });
            }
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

            modalInstance.result.then(function (userObj) {
                yuyanAPISvc.userRegisterSvc().save(userObj,
                    function (data) {
                        var newUser = data;
                    });

            }, function () {
                // dismissed log
            });
        }

        function reset() {
            $scope.placeholder = 'Your First Question';
            $scope.IntQuestion = 'Question:';
            $scope.dtoQuestions = [];
            $scope.DefaultQuestionType = 1;
            $scope.QID = 0;
            $scope.showAddItem = false;
            $scope.disableNext = true;
        }

        function checkSession() {
            var localSessionToken = localStorageService.get('authorizationData');
            if (localSessionToken) {
                yuyanAPISvc.sessionCheckSvc().get({ sessionId: localSessionToken.token },
                    function (data) {
                        $scope.showFooter = true;
                        if (data.SessionId) {
                            $scope.isLogin = true;
                        }
                    }, function (data) {
                        $scope.showFooter = true;
                    });
            }
        }

    }]);

})();
