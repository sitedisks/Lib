﻿(function () {
    'use strict';

    angular.module('yuyanApp')
        .controller('userModalCtrl', ['$scope', '$timeout', '$uibModalInstance', 'yuyanAPISvc', 'mode',
            function ($scope, $timeout, $uibModalInstance, yuyanAPISvc, mode) {

                $scope.mode = mode;

                $scope.checking = false;
                $scope.userAvailable = true;

                $scope.ok = ok;
                $scope.cancel = cancel;
                $scope.checkUser = checkUser;
                $scope.dupPassword = dupPassword;

                $scope.userObj = userObjInit();

                $scope.switchToLogin = switchToLogin;
                $scope.switchToRegister = switchToRegister;

                function ok() {
                    $uibModalInstance.close($scope.userObj);
                };

                function cancel() {
                    $uibModalInstance.dismiss('cancel');
                };

                function checkUser() {
                    $scope.userAvailable = true;
                    if ($scope.mode == 'register' && $scope.userForm.userEmail.$valid) {
                        if ($scope.userObj.Email.length > 4) {
                            $scope.checking = true;
                            $timeout(function () {
                                yuyanAPISvc.userCheckSvc().save($scope.userObj, function (data) {
                                    $scope.checking = false;
                                    var userId = data.UserId;
                                    if (userId != undefined) {
                                        //unavailable!
                                        $scope.userAvailable = false;
                                        $scope.userForm.userEmail.$valid = true;
                                    } else {
                                        $scope.userAvailable = true;
                                    }
                                });
                            });
                        }
                    }

                }

                function dupPassword() {
                    if ($scope.mode == 'login') {
                        $scope.userObj.PasswordConfirm = $scope.userObj.Password;
                    }
                }

                function switchToLogin() {
                    $scope.mode = 'login';

                    $scope.userObj = userObjInit();
                }

                function switchToRegister() {
                    $scope.mode = 'register';

                    $scope.userObj = userObjInit();
                }

                function userObjInit() {
                    return {
                        Email: '',
                        Password: '',
                        PasswordConfirm: '',
                        Mode: $scope.mode
                    }
                }

            }]);
})();